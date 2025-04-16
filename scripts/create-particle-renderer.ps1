# Create ParticleRenderer Component Script
# This script creates a detailed implementation of the ParticleRenderer component

# Project root directory (current directory)
$rootDir = Get-Location

# Function to create directory if it doesn't exist
function EnsureDirectory {
    param([string]$path)
    if (-not (Test-Path $path)) {
        New-Item -ItemType Directory -Path $path -Force | Out-Null
        Write-Host "Created directory: $path" -ForegroundColor Green
    }
}

# Create ParticleRenderer directory
$componentDir = "$rootDir\src\components\ParticleRenderer"
EnsureDirectory $componentDir

# Create ParticleRenderer component file
$componentFile = "$componentDir\ParticleRenderer.tsx"
$componentContent = @"
/**
 * ParticleRenderer Component
 * 
 * Renders particles using Three.js with instanced rendering.
 * This component is responsible for the efficient 3D rendering
 * of particles using instanced meshes and custom shaders.
 */

import React, { useRef, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useRender } from '../../hooks/useRender';
import { getInstancedRenderer } from '../../services/rendering';
import { Role, Vector3 } from '../../types/core';
import { VisualTrait } from '../../types/visual';
import { getVisualService } from '../../services/visuals';

/**
 * ParticleRenderer Props
 */
interface ParticleRendererProps {
  particles: Array<{
    id: string;
    position: Vector3;
    role: Role;
    groupId: string;
    visualTrait?: VisualTrait;
  }>;
  width?: number;
  height?: number;
  backgroundColor?: string;
  zoom?: number;
  autoRotate?: boolean;
}

/**
 * ParticleRenderer component
 */
const ParticleRenderer: React.FC<ParticleRendererProps> = ({
  particles,
  width = 800,
  height = 600,
  backgroundColor = '#000000',
  zoom = 1,
  autoRotate = false
}) => {
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const frameIdRef = useRef<number>(0);
  
  // State
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  
  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);
    sceneRef.current = scene;
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 20;
    cameraRef.current = camera;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Create controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = autoRotate;
    controlsRef.current = controls;
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Initialize instanced renderer
    const instancedRenderer = getInstancedRenderer();
    instancedRenderer.initialize(scene);
    
    setIsInitialized(true);
    
    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(frameIdRef.current);
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      
      // Dispose of all geometries and materials
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            if (object.geometry) {
              object.geometry.dispose();
            }
            
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach((material) => material.dispose());
              } else {
                object.material.dispose();
              }
            }
          }
        });
      }
    };
  }, [backgroundColor, width, height, autoRotate]);
  
  // Update camera aspect ratio when dimensions change
  useEffect(() => {
    if (cameraRef.current && rendererRef.current) {
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    }
  }, [width, height]);
  
  // Update camera zoom
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.zoom = zoom;
      cameraRef.current.updateProjectionMatrix();
    }
  }, [zoom]);
  
  // Update auto-rotate setting
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);
  
  // Render particles
  useEffect(() => {
    if (!isInitialized || !sceneRef.current) return;
    
    // Get instanced renderer
    const instancedRenderer = getInstancedRenderer();
    
    // Group particles by role for efficient instanced rendering
    const particlesByRole = particles.reduce((acc, particle) => {
      if (!acc[particle.role]) {
        acc[particle.role] = [];
      }
      acc[particle.role].push(particle);
      return acc;
    }, {} as Record<Role, typeof particles>);
    
    // Clear previous particles
    instancedRenderer.clearInstances();
    
    // Render particles by role
    Object.entries(particlesByRole).forEach(([role, roleParticles]) => {
      instancedRenderer.renderParticleGroup(roleParticles, role as Role);
    });
    
  }, [particles, isInitialized]);
  
  return (
    <RendererContainer ref={containerRef} style={{ width, height }} />
  );
};

// Styled components
const RendererContainer = styled('div')({
  position: 'relative',
  overflow: 'hidden',
});

export default ParticleRenderer;
"@
Set-Content -Path $componentFile -Value $componentContent
Write-Host "Created ParticleRenderer component file: $componentFile" -ForegroundColor Yellow

# Create index.ts file
$indexFile = "$componentDir\index.ts"
$indexContent = @"
/**
 * ParticleRenderer Component Exports
 */

export { default } from './ParticleRenderer';
"@
Set-Content -Path $indexFile -Value $indexContent
Write-Host "Created index file: $indexFile" -ForegroundColor Yellow

# Create styles file
$stylesFile = "$componentDir\ParticleRenderer.styles.ts"
$stylesContent = @"
/**
 * ParticleRenderer Styles
 */

import { styled } from '@mui/material/styles';

export const RendererContainer = styled('div')({
  position: 'relative',
  overflow: 'hidden',
});
"@
Set-Content -Path $stylesFile -Value $stylesContent
Write-Host "Created styles file: $stylesFile" -ForegroundColor Yellow

# Create test file
$testFile = "$componentDir\ParticleRenderer.test.tsx"
$testContent = @"
/**
 * ParticleRenderer Tests
 */

import React from 'react';
import { render } from '@testing-library/react';
import ParticleRenderer from './ParticleRenderer';
import { Role } from '../../types/core';
import { getInstancedRenderer } from '../../services/rendering';

// Mock Three.js
jest.mock('three', () => {
  const actualThree = jest.requireActual('three');
  return {
    ...actualThree,
    WebGLRenderer: jest.fn().mockImplementation(() => ({
      setSize: jest.fn(),
      setPixelRatio: jest.fn(),
      render: jest.fn(),
      domElement: document.createElement('canvas'),
      dispose: jest.fn()
    })),
    PerspectiveCamera: jest.fn().mockImplementation(() => ({
      position: { z: 0 },
      aspect: 1,
      updateProjectionMatrix: jest.fn(),
      zoom: 1
    })),
    Scene: jest.fn().mockImplementation(() => ({
      background: null,
      add: jest.fn(),
      traverse: jest.fn()
    })),
    Color: jest.fn(),
    AmbientLight: jest.fn(),
    DirectionalLight: jest.fn().mockImplementation(() => ({
      position: { set: jest.fn() }
    })),
    Mesh: jest.fn()
  };
});

// Mock OrbitControls
jest.mock('three/examples/jsm/controls/OrbitControls', () => ({
  OrbitControls: jest.fn().mockImplementation(() => ({
    enableDamping: false,
    dampingFactor: 0,
    autoRotate: false,
    update: jest.fn(),
    dispose: jest.fn()
  }))
}));

// Mock rendering service
jest.mock('../../services/rendering', () => ({
  getInstancedRenderer: jest.fn().mockImplementation(() => ({
    initialize: jest.fn(),
    clearInstances: jest.fn(),
    renderParticleGroup: jest.fn()
  }))
}));

describe('ParticleRenderer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders without crashing', () => {
    const particles = [
      {
        id: 'particle-1',
        position: { x: 0, y: 0, z: 0 },
        role: Role.CORE,
        groupId: 'group-1'
      }
    ];
    
    render(<ParticleRenderer particles={particles} />);
    
    // Check if the instanced renderer was initialized
    expect(getInstancedRenderer).toHaveBeenCalled();
    const instancedRenderer = getInstancedRenderer();
    expect(instancedRenderer.initialize).toHaveBeenCalled();
  });
  
  it('updates when particles change', () => {
    const particles = [
      {
        id: 'particle-1',
        position: { x: 0, y: 0, z: 0 },
        role: Role.CORE,
        groupId: 'group-1'
      }
    ];
    
    const { rerender } = render(<ParticleRenderer particles={particles} />);
    
    // Initial render should initialize the renderer
    const instancedRenderer = getInstancedRenderer();
    expect(instancedRenderer.initialize).toHaveBeenCalled();
    
    // Update with new particles
    const newParticles = [
      ...particles,
      {
        id: 'particle-2',
        position: { x: 1, y: 1, z: 1 },
        role: Role.ATTACK,
        groupId: 'group-2'
      }
    ];
    
    rerender(<ParticleRenderer particles={newParticles} />);
    
    // Should clear instances and render new particle groups
    expect(instancedRenderer.clearInstances).toHaveBeenCalled();
    expect(instancedRenderer.renderParticleGroup).toHaveBeenCalled();
  });
});
"@
Set-Content -Path $testFile -Value $testContent
Write-Host "Created test file: $testFile" -ForegroundColor Yellow

Write-Host "`nParticleRenderer component creation completed!" -ForegroundColor Cyan
