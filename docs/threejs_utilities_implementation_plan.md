# Three.js Utilities Implementation Plan for Bitcoin Protozoa

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

### 3. Animation Loops
Animation loops tied to creature behaviors create dynamic and responsive visuals.

```typescript
/**
 * Create an animation loop for a creature
 * @param scene The Three.js scene
 * @param camera The Three.js camera
 * @param renderer The Three.js renderer
 * @param creature The creature to animate
 * @param behaviors Array of behaviors affecting the animation
 * @returns A function to stop the animation
 */
function createAnimationLoop(
  scene: THREE.Scene,
  camera: THREE.Camera,
  renderer: THREE.WebGLRenderer,
  creature: Creature,
  behaviors: BehaviorTrait[]
): () => void {
  let animationFrameId: number;
  let lastTime = 0;
  
  // Extract behavior parameters
  const speeds = behaviors.map(b => b.physicsLogic?.frequency || 1);
  const averageSpeed = speeds.reduce((sum, s) => sum + s, 0) / speeds.length;
  
  // Get all shader materials in the scene
  const shaderMaterials: THREE.ShaderMaterial[] = [];
  scene.traverse(object => {
    if (object instanceof THREE.Mesh && object.material instanceof THREE.ShaderMaterial) {
      shaderMaterials.push(object.material);
    }
  });
  
  // Animation function
  const animate = (time: number) => {
    const deltaTime = (time - lastTime) / 1000;
    lastTime = time;
    
    // Update shader uniforms
    shaderMaterials.forEach(material => {
      if (material.uniforms.time) {
        material.uniforms.time.value = time / 1000;
      }
    });
    
    // Update particle positions based on behaviors
    // This would be handled by the physics/behavior system
    
    // Render the scene
    renderer.render(scene, camera);
    
    // Continue the animation loop
    animationFrameId = requestAnimationFrame(animate);
  };
  
  // Start the animation loop
  animationFrameId = requestAnimationFrame(animate);
  
  // Return a function to stop the animation
  return () => {
    cancelAnimationFrame(animationFrameId);
  };
}
```

### 4. Camera Management
Camera management utilities help create dynamic views of creatures and their environments.

```typescript
/**
 * Create an orbit camera controller
 * @param camera The Three.js camera
 * @param domElement The DOM element for controls
 * @param target The target to orbit around
 * @returns The orbit controls
 */
function createOrbitControls(
  camera: THREE.Camera,
  domElement: HTMLElement,
  target?: THREE.Vector3
): THREE.OrbitControls {
  const controls = new THREE.OrbitControls(camera, domElement);
  
  if (target) {
    controls.target.copy(target);
  }
  
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.enablePan = true;
  
  return controls;
}

/**
 * Focus camera on a creature
 * @param camera The Three.js camera
 * @param controls The orbit controls
 * @param creature The creature to focus on
 * @param duration The duration of the transition in seconds
 */
function focusOnCreature(
  camera: THREE.Camera,
  controls: THREE.OrbitControls,
  creature: Creature,
  duration: number = 1.0
): void {
  // Calculate creature center and bounding sphere
  const center = calculateCreatureCenter(creature);
  const radius = calculateCreatureRadius(creature);
  
  // Calculate ideal camera position
  const idealDistance = radius * 2.5;
  const idealPosition = new THREE.Vector3().copy(center);
  idealPosition.z += idealDistance;
  
  // Animate camera position
  animateCamera(camera, idealPosition, center, duration);
  
  // Update controls target
  controls.target.copy(center);
}
```

### 5. Scene Optimization
Scene optimization utilities help maintain performance with complex creatures.

```typescript
/**
 * Optimize a scene for performance
 * @param scene The Three.js scene
 */
function optimizeScene(scene: THREE.Scene): void {
  // Merge geometries where possible
  mergeGeometries(scene);
  
  // Set up frustum culling
  setupFrustumCulling(scene);
  
  // Use LOD for complex objects
  setupLOD(scene);
}

/**
 * Merge geometries in a scene
 * @param scene The Three.js scene
 */
function mergeGeometries(scene: THREE.Scene): void {
  // Implementation details
}

/**
 * Set up frustum culling for a scene
 * @param scene The Three.js scene
 */
function setupFrustumCulling(scene: THREE.Scene): void {
  // Implementation details
}

/**
 * Set up LOD for complex objects
 * @param scene The Three.js scene
 */
function setupLOD(scene: THREE.Scene): void {
  // Implementation details
}
```

## Integration with Existing Systems

### 1. Rendering System Integration
Three.js utilities will be integrated with the rendering system to create efficient and visually appealing creatures.

```typescript
// Example integration with InstancedRenderer
class InstancedRenderer {
  // ...existing code...
  
  /**
   * Create an instanced mesh for a particle group
   * @param group The particle group
   * @returns The instanced mesh
   */
  createInstancedMeshForGroup(group: ParticleGroup): THREE.InstancedMesh {
    const geometry = this.createGeometryForRole(group.role);
    const material = this.createMaterialForGroup(group);
    return createInstancedMesh(geometry, material, group.particles.length);
  }
  
  /**
   * Update an instanced mesh for a particle group
   * @param mesh The instanced mesh
   * @param group The particle group
   */
  updateInstancedMeshForGroup(mesh: THREE.InstancedMesh, group: ParticleGroup): void {
    const positions = group.particles.map(p => p.position);
    const scales = group.particles.map(p => p.scale);
    const rotations = group.particles.map(p => p.rotation);
    updateInstanceMatrices(mesh, positions, scales, rotations);
  }
}
```

### 2. Visual Trait Integration
Three.js utilities will be used to visualize creature traits.

```typescript
// Example integration with VisualTraitRenderer
class VisualTraitRenderer {
  // ...existing code...
  
  /**
   * Create a material for a visual trait
   * @param trait The visual trait
   * @returns The material
   */
  createMaterialForTrait(trait: VisualTrait): THREE.Material {
    if (trait.visualProperties?.shader) {
      return createShaderMaterial([trait]);
    } else {
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color(trait.visualProperties?.color || '#ffffff'),
        emissive: new THREE.Color(trait.visualProperties?.emissiveColor || '#000000'),
        emissiveIntensity: trait.visualProperties?.emissiveIntensity || 0,
        transparent: trait.visualProperties?.transparent || false,
        opacity: trait.visualProperties?.opacity || 1.0
      });
    }
  }
}
```

### 3. Animation Integration
Three.js utilities will be used to animate creatures based on their behaviors.

```typescript
// Example integration with AnimationService
class AnimationService {
  // ...existing code...
  
  /**
   * Create an animation for a creature
   * @param creature The creature
   * @returns A function to stop the animation
   */
  createAnimationForCreature(creature: Creature): () => void {
    const behaviors = this.getBehaviorsForCreature(creature);
    return createAnimationLoop(
      this.scene,
      this.camera,
      this.renderer,
      creature,
      behaviors
    );
  }
}
```

## Implementation Steps

### Phase 1: Core Utilities
1. Create `lib/threeUtils.ts` with basic utility functions
2. Implement instanced mesh creation and update functions
3. Add shader material generation
4. Create animation loop utilities
5. Add camera management functions
6. Implement scene optimization utilities

### Phase 2: Rendering Integration
1. Integrate with `InstancedRenderer`
2. Create geometry generators for each role
3. Implement material generators for visual traits
4. Add particle system generators

### Phase 3: Animation Integration
1. Create animation system for creatures
2. Implement behavior-based animations
3. Add transition effects for mutations
4. Create special effects for abilities

### Phase 4: Performance Optimization
1. Implement LOD system
2. Add frustum culling
3. Create geometry merging utilities
4. Implement shader optimization

## Testing Strategy

### Unit Tests
1. Test instanced mesh creation and update
2. Verify shader material generation
3. Test animation loop utilities
4. Validate camera management functions

### Integration Tests
1. Test rendering of creatures with different traits
2. Verify animations based on behaviors
3. Test performance with many creatures
4. Validate visual effects for mutations and abilities

### Performance Tests
1. Measure FPS with different numbers of creatures
2. Test LOD system with complex scenes
3. Verify frustum culling effectiveness
4. Validate overall rendering performance

## Conclusion
Implementing Three.js utilities will significantly enhance the visual representation of creatures in the Bitcoin Protozoa project, creating a more immersive and performant experience. By following this implementation plan, we can ensure that Three.js is properly integrated with existing systems and provides a solid foundation for future visual development.
