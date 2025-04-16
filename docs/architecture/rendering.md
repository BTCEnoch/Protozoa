# Bitcoin Protozoa - Rendering Architecture

## Overview
This document outlines the rendering architecture for the Bitcoin Protozoa project, focusing on optimized rendering of particle-based creatures using Three.js.

## Rendering Challenges
The Bitcoin Protozoa project faces several rendering challenges:
- Rendering 500 particles per creature efficiently
- Supporting dynamic visual traits that change with mutations
- Maintaining smooth performance across different devices
- Providing visually appealing effects without sacrificing performance

## Optimization Strategies

### Instanced Rendering
Instanced rendering is the primary optimization technique used to efficiently render large numbers of particles.

#### Implementation
- Use `THREE.InstancedMesh` to render multiple instances of the same geometry in a single draw call
- Group particles by role to minimize the number of instanced meshes
- Update instance matrices and attributes in batches

```typescript
// Example implementation
class InstancedRenderer {
  private instancedMeshes: Map<Role, THREE.InstancedMesh>;
  
  public initialize(scene: THREE.Scene): void {
    // Create instanced meshes for each role
    for (const role of Object.values(Role)) {
      const geometry = this.getGeometryForRole(role);
      const material = this.getMaterialForRole(role);
      const count = this.getParticleCountForRole(role);
      
      const instancedMesh = new THREE.InstancedMesh(geometry, material, count);
      instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      
      this.instancedMeshes.set(role, instancedMesh);
      scene.add(instancedMesh);
    }
  }
  
  public updateParticles(particles: Particle[]): void {
    // Group particles by role
    const particlesByRole = this.groupParticlesByRole(particles);
    
    // Update each instanced mesh
    for (const [role, roleParticles] of particlesByRole.entries()) {
      const instancedMesh = this.instancedMeshes.get(role);
      if (!instancedMesh) continue;
      
      // Update instance matrices
      for (let i = 0; i < roleParticles.length; i++) {
        const particle = roleParticles[i];
        const matrix = new THREE.Matrix4().setPosition(
          particle.position.x,
          particle.position.y,
          particle.position.z
        );
        instancedMesh.setMatrixAt(i, matrix);
      }
      
      instancedMesh.instanceMatrix.needsUpdate = true;
    }
  }
}
```

### Buffer Geometry
Buffer geometry is used to efficiently manage particle data for unique shapes or frequently changing properties.

#### Implementation
- Store particle data in typed arrays
- Update buffer attributes directly when changes occur
- Use `THREE.BufferGeometry` with custom attributes for particle properties

```typescript
// Example implementation
class ParticleRenderer {
  private geometry: THREE.BufferGeometry;
  private positions: Float32Array;
  private colors: Float32Array;
  private sizes: Float32Array;
  
  public initialize(particleCount: number): void {
    // Create buffer geometry with attributes
    this.positions = new Float32Array(particleCount * 3);
    this.colors = new Float32Array(particleCount * 3);
    this.sizes = new Float32Array(particleCount);
    
    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3));
    this.geometry.setAttribute('size', new THREE.BufferAttribute(this.sizes, 1));
    
    const material = new THREE.PointsMaterial({
      vertexColors: true,
      sizeAttenuation: true
    });
    
    const points = new THREE.Points(this.geometry, material);
    scene.add(points);
  }
  
  public updateParticles(particles: Particle[]): void {
    // Update buffer attributes
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      const i3 = i * 3;
      
      // Update position
      this.positions[i3] = particle.position.x;
      this.positions[i3 + 1] = particle.position.y;
      this.positions[i3 + 2] = particle.position.z;
      
      // Update color
      this.colors[i3] = particle.color.r;
      this.colors[i3 + 1] = particle.color.g;
      this.colors[i3 + 2] = particle.color.b;
      
      // Update size
      this.sizes[i] = particle.size;
    }
    
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.color.needsUpdate = true;
    this.geometry.attributes.size.needsUpdate = true;
  }
}
```

### Custom Shaders
Custom shaders are used to create visually appealing effects while maintaining performance.

#### Implementation
- Use `THREE.ShaderMaterial` for custom vertex and fragment shaders
- Implement effects like pulsation, glowing, and color gradients in shaders
- Pass mutation and trait data to shaders via uniforms

```typescript
// Example implementation
class ShaderManager {
  private shaderMaterials: Map<string, THREE.ShaderMaterial>;
  
  public createParticleShader(role: Role, rarity: Rarity): THREE.ShaderMaterial {
    const vertexShader = this.loadShader(`particle_${role.toLowerCase()}_vertex.glsl`);
    const fragmentShader = this.loadShader(`particle_${role.toLowerCase()}_fragment.glsl`);
    
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        color: { value: this.getColorForRoleAndRarity(role, rarity) },
        pulseSpeed: { value: this.getPulseSpeedForRarity(rarity) },
        glowIntensity: { value: this.getGlowIntensityForRarity(rarity) }
      },
      transparent: true,
      depthWrite: false
    });
    
    this.shaderMaterials.set(`${role}_${rarity}`, material);
    return material;
  }
  
  public updateShaderUniforms(deltaTime: number): void {
    // Update time uniform for all shader materials
    for (const material of this.shaderMaterials.values()) {
      material.uniforms.time.value += deltaTime;
    }
  }
}
```

### Level of Detail (LOD)
Level of Detail (LOD) is used to reduce rendering complexity for distant creatures.

#### Implementation
- Create multiple detail levels for creatures
- Switch between detail levels based on camera distance
- Use `THREE.LOD` to manage level transitions

```typescript
// Example implementation
class LODManager {
  private lodObjects: Map<string, THREE.LOD>;
  
  public createCreatureLOD(creature: Creature): THREE.LOD {
    const lod = new THREE.LOD();
    
    // High detail (close-up)
    const highDetailObject = this.createHighDetailObject(creature);
    lod.addLevel(highDetailObject, 0);
    
    // Medium detail (medium distance)
    const mediumDetailObject = this.createMediumDetailObject(creature);
    lod.addLevel(mediumDetailObject, 50);
    
    // Low detail (far away)
    const lowDetailObject = this.createLowDetailObject(creature);
    lod.addLevel(lowDetailObject, 150);
    
    this.lodObjects.set(creature.id, lod);
    return lod;
  }
  
  public updateLODPositions(creatures: Map<string, Creature>): void {
    // Update LOD object positions
    for (const [id, creature] of creatures.entries()) {
      const lod = this.lodObjects.get(id);
      if (lod) {
        lod.position.copy(creature.position);
      }
    }
  }
}
```

## Rendering Pipeline

### Initialization
1. Create renderer and scene
2. Initialize instanced renderer for each role
3. Initialize shader manager with custom shaders
4. Initialize LOD manager for distance-based rendering

### Per-Frame Rendering
1. Update particle positions from physics/behavior calculations
2. Update instanced mesh matrices
3. Update shader uniforms
4. Update LOD levels based on camera distance
5. Render scene

### Mutation Handling
1. When mutations occur, update visual properties
2. Update shader uniforms to reflect new visual traits
3. Update instanced mesh attributes if necessary
4. Update LOD objects if necessary

## Integration with Domain Model

### Visual Traits
- Visual traits are defined in the domain model
- Rendering system consumes these traits to determine appearance
- Mutations can modify visual traits, which are then reflected in rendering

### Ability Visuals
- Abilities have associated visual effects
- Rendering system visualizes these effects using shaders and particles
- Effects are tied to ability activation and duration

### Formation Visualization
- Formations define particle arrangements
- Rendering system visualizes these arrangements
- Transitions between formations are smoothly animated

## Performance Considerations

### Batching
- Group similar particles to minimize draw calls
- Update attributes in batches to reduce CPU-GPU communication
- Use instanced rendering for similar particles

### Culling
- Implement frustum culling to avoid rendering off-screen particles
- Use occlusion culling for complex scenes
- Implement distance-based culling for very distant creatures

### Memory Management
- Reuse geometries and materials when possible
- Dispose of unused resources
- Use texture atlases for particle textures

## Conclusion
The rendering architecture for Bitcoin Protozoa balances visual fidelity with performance through the use of instanced rendering, buffer geometry, custom shaders, and level of detail techniques. This approach allows for the efficient rendering of 500 particles per creature while supporting dynamic visual traits and effects.
