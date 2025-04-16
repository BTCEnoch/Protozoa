# Three.js Utilities Implementation Plan for Bitcoin Protozoa (Part 4)

## Integration with Existing Systems (Continued)

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
