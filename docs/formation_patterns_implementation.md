# Bitcoin Protozoa - Formation Patterns Implementation

## Overview
This document provides detailed information about the implementation of formation patterns in the Bitcoin Protozoa project. Each formation pattern is responsible for generating particle positions based on specific geometric or organic patterns.

## Formation Pattern Structure

Each formation pattern follows a consistent structure:

1. **Pattern Interface**: Extends the base `FormationPattern` interface with pattern-specific parameters
2. **Pattern Creation Function**: Creates a formation pattern with default parameters based on role and tier
3. **Position Generation Function**: Generates particle positions based on the pattern parameters and a random seed

## Implemented Formation Patterns

### 1. Circle Formation
- **File**: `src/services/formations/patterns/circle/circleGenerator.ts`
- **Description**: Arranges particles in a circular pattern around a central point
- **Parameters**:
  - `radius`: Radius of the circle
  - `count`: Number of particles
  - `offset`: Center point offset
  - `rotation`: Rotation angle
  - `jitter`: Random variation
  - `layers`: Number of concentric circles (optional)
  - `layerSpacing`: Spacing between layers (optional)
- **Variants**:
  - `generateMultiLayerCircleFormation`: Creates multiple concentric circles

### 2. Grid Formation
- **File**: `src/services/formations/patterns/grid/gridGenerator.ts`
- **Description**: Arranges particles in a 2D or 3D grid pattern
- **Parameters**:
  - `spacing`: Distance between particles
  - `dimensions`: Grid dimensions (x, y, z)
  - `offset`: Center point offset
  - `rotation`: Rotation angles (x, y, z)
  - `jitter`: Random variation

### 3. Spiral Formation
- **File**: `src/services/formations/patterns/spiral/spiralGenerator.ts`
- **Description**: Arranges particles in a spiral pattern
- **Parameters**:
  - `radius`: Starting radius
  - `growth`: Growth rate of the spiral
  - `turns`: Number of turns
  - `particles`: Number of particles
  - `offset`: Center point offset
  - `rotation`: Rotation angle
  - `jitter`: Random variation

### 4. Sphere Formation
- **File**: `src/services/formations/patterns/sphere/sphereGenerator.ts`
- **Description**: Arranges particles on the surface of a sphere
- **Parameters**:
  - `radius`: Radius of the sphere
  - `count`: Number of particles
  - `offset`: Center point offset
  - `jitter`: Random variation
  - `layers`: Number of layers (optional)
  - `layerSpacing`: Spacing between layers (optional)
- **Variants**:
  - `generateMultiLayerSphereFormation`: Creates multiple concentric spheres

### 5. Helix Formation
- **File**: `src/services/formations/patterns/helix/helixGenerator.ts`
- **Description**: Arranges particles in a helix (3D spiral) pattern
- **Parameters**:
  - `radius`: Radius of the helix
  - `height`: Height of the helix
  - `turns`: Number of turns
  - `particles`: Number of particles
  - `offset`: Center point offset
  - `rotation`: Rotation angle
  - `jitter`: Random variation
  - `strands`: Number of strands (optional)
- **Variants**:
  - `generateTripleHelixFormation`: Creates a triple helix pattern

### 6. Cluster Formation
- **File**: `src/services/formations/patterns/cluster/clusterGenerator.ts`
- **Description**: Arranges particles in organic-looking clusters
- **Parameters**:
  - `density`: Particle density
  - `radius`: Overall cluster radius
  - `clusters`: Number of sub-clusters
  - `clusterSize`: Size of each sub-cluster
  - `offset`: Center point offset
  - `seed`: Random seed
  - `jitter`: Random variation
- **Variants**:
  - `generateHierarchicalClusterFormation`: Creates a hierarchical cluster structure

### 7. Swarm Formation
- **File**: `src/services/formations/patterns/swarm/swarmGenerator.ts`
- **Description**: Arranges particles in a dynamic swarm-like pattern
- **Parameters**:
  - `volume`: Volume of the swarm
  - `density`: Particle density
  - `cohesion`: How strongly particles stick together
  - `separation`: Minimum distance between particles
  - `alignment`: How strongly particles align with neighbors
  - `offset`: Center point offset
  - `jitter`: Random variation
  - `iterations`: Number of simulation iterations
- **Variants**:
  - `generateDirectedSwarmFormation`: Creates a swarm with directional bias

### 8. Tree Formation
- **File**: `src/services/formations/patterns/tree/treeGenerator.ts`
- **Description**: Arranges particles in a tree-like branching structure
- **Parameters**:
  - `height`: Height of the tree
  - `branchLevels`: Number of branch levels
  - `branchFactor`: Branching factor (how many branches per node)
  - `branchAngle`: Angle between branches
  - `branchLength`: Length of branches
  - `trunkWidth`: Width of the trunk
  - `leafDensity`: Density of leaves
  - `offset`: Center point offset
  - `rotation`: Rotation angle
  - `jitter`: Random variation

### 9. Sierpinski Formation
- **File**: `src/services/formations/patterns/sierpinski/sierpinskiGenerator.ts`
- **Description**: Arranges particles in a Sierpinski triangle/tetrahedron pattern
- **Parameters**:
  - `size`: Size of the Sierpinski structure
  - `iterations`: Number of iterations (detail level)
  - `shape`: Shape type ('triangle', 'tetrahedron', 'carpet')
  - `scale`: Scale factor between iterations
  - `offset`: Center point offset
  - `rotation`: Rotation angle
  - `jitter`: Random variation

### 10. Mandelbrot Formation
- **File**: `src/services/formations/patterns/mandelbrot/mandelbrotGenerator.ts`
- **Description**: Arranges particles based on the Mandelbrot set
- **Parameters**:
  - `centerX`: X-coordinate of the center point
  - `centerY`: Y-coordinate of the center point
  - `scale`: Scale factor
  - `iterations`: Number of iterations
  - `threshold`: Escape threshold
  - `density`: Particle density
  - `offset`: Center point offset
  - `rotation`: Rotation angle
  - `jitter`: Random variation
  - `is3D`: Whether to generate a 3D formation
- **Variants**:
  - `generate2DMandelbrotFormation`: Creates a 2D Mandelbrot pattern
  - `generate3DJuliaFormation`: Creates a 3D Julia set pattern

### 11. Web Formation
- **File**: `src/services/formations/patterns/web/webGenerator.ts`
- **Description**: Arranges particles in a web-like network pattern
- **Parameters**:
  - `radius`: Radius of the web
  - `density`: Density of connections
  - `layers`: Number of concentric layers
  - `spokes`: Number of radial spokes
  - `irregularity`: How irregular the web is (0-1)
  - `offset`: Center point offset
  - `rotation`: Rotation angle
  - `jitter`: Random variation
- **Variants**:
  - `generateComplexWebFormation`: Creates a more complex web with additional layers and spokes

## Integration with Formation Service

All formation patterns are integrated with the Formation Service through the `generatePositions` method, which:

1. Takes a formation pattern and particle count
2. Creates a copy of the pattern and updates parameters based on particle count
3. Uses a switch statement to call the appropriate generator function based on pattern type
4. Returns an array of Vector3 positions

## Role-Specific Variations

Each formation pattern has role-specific variations implemented in its creation function:

- **Core**: More compact, stable formations with less jitter
- **Attack**: More aggressive, outward-facing formations
- **Defense**: Denser, more protective formations
- **Control**: More precise, balanced formations
- **Movement**: More dynamic, fluid formations

## Tier Progression

As the tier increases:
- Formations become more complex
- Parameters are adjusted for more visual interest
- Jitter and randomness may increase or decrease depending on the role
- Additional features may be enabled (e.g., more layers, strands, etc.)

## Implementation Notes

- All formation generators use a seeded random number generator for deterministic results
- The `createSeededRandom` function ensures that the same seed always produces the same formation
- Vector3 utility functions from `mathUtils.ts` are used for vector operations
- Formation patterns follow a consistent naming convention: `generate[Pattern]Formation`
