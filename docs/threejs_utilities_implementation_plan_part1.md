# Three.js Utilities Implementation Plan for Bitcoin Protozoa (Part 1)

## Overview
This document outlines the implementation plan for adding Three.js utilities to the Bitcoin Protozoa project. These utilities will enhance the visual representation of creatures, optimize rendering performance, and create a more immersive experience.

## Core Three.js Utilities to Implement

### 1. Instanced Mesh Creation
Instanced meshes allow for efficient rendering of many similar objects, which is perfect for particle-based creatures.

```typescript
/**
 * Create an instanced mesh for a particle group
 * @param geometry The geometry to use for each instance
 * @param material The material to use for each instance
 * @param count The number of instances
 * @returns The instanced mesh
 */
function createInstancedMesh(
  geometry: THREE.BufferGeometry,
  material: THREE.Material,
  count: number
): THREE.InstancedMesh {
  const mesh = new THREE.InstancedMesh(geometry, material, count);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  return mesh;
}

/**
 * Update instance matrices for a particle group
 * @param mesh The instanced mesh to update
 * @param positions Array of Vector3 positions
 * @param scales Array of scales (Vector3 or number)
 * @param rotations Optional array of quaternions
 */
function updateInstanceMatrices(
  mesh: THREE.InstancedMesh,
  positions: Vector3[],
  scales: Vector3[] | number[],
  rotations?: { x: number, y: number, z: number, w: number }[]
): void {
  const matrix = new THREE.Matrix4();
  const position = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
  const scale = new THREE.Vector3();
  
  for (let i = 0; i < positions.length; i++) {
    position.set(positions[i].x, positions[i].y, positions[i].z);
    
    if (rotations && rotations[i]) {
      quaternion.set(rotations[i].x, rotations[i].y, rotations[i].z, rotations[i].w);
    } else {
      quaternion.identity();
    }
    
    if (typeof scales[i] === 'number') {
      scale.set(scales[i] as number, scales[i] as number, scales[i] as number);
    } else {
      const vec = scales[i] as Vector3;
      scale.set(vec.x, vec.y, vec.z);
    }
    
    matrix.compose(position, quaternion, scale);
    mesh.setMatrixAt(i, matrix);
  }
  
  mesh.instanceMatrix.needsUpdate = true;
}
```

### 2. Shader Material Generation
Custom shader materials can create unique visual effects for different creature traits.

```typescript
/**
 * Create a shader material based on visual traits
 * @param traits Array of visual traits
 * @returns The shader material
 */
function createShaderMaterial(traits: VisualTrait[]): THREE.ShaderMaterial {
  // Extract visual properties from traits
  const colors = traits.filter(t => t.visualProperties?.color).map(t => t.visualProperties!.color);
  const glowIntensity = traits.reduce((sum, t) => sum + (t.visualProperties?.glow || 0), 0) / traits.length;
  const pulseFrequency = traits.reduce((sum, t) => sum + (t.visualProperties?.pulseFrequency || 0), 0) / traits.length;
  
  // Create shader material
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      primaryColor: { value: new THREE.Color(colors[0] || '#ffffff') },
      secondaryColor: { value: new THREE.Color(colors[1] || colors[0] || '#ffffff') },
      glowIntensity: { value: glowIntensity },
      pulseFrequency: { value: pulseFrequency }
    },
    vertexShader: `
      uniform float time;
      uniform float pulseFrequency;
      
      varying vec3 vNormal;
      varying vec2 vUv;
      
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vUv = uv;
        
        // Apply pulse effect
        float pulse = sin(time * pulseFrequency) * 0.05 + 1.0;
        vec3 newPosition = position * pulse;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 primaryColor;
      uniform vec3 secondaryColor;
      uniform float time;
      uniform float glowIntensity;
      
      varying vec3 vNormal;
      varying vec2 vUv;
      
      void main() {
        // Calculate rim lighting for glow effect
        float rim = 1.0 - max(0.0, dot(vNormal, vec3(0.0, 0.0, 1.0)));
        rim = pow(rim, 2.0) * glowIntensity;
        
        // Mix colors based on time and UV
        float mixFactor = sin(time * 0.5 + vUv.x * 3.14159) * 0.5 + 0.5;
        vec3 color = mix(primaryColor, secondaryColor, mixFactor);
        
        // Apply glow
        color += rim * secondaryColor;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    transparent: true
  });
}
```
