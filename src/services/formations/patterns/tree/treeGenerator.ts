/**
 * Tree Formation Generator
 *
 * Generates particle positions for tree formations.
 */

import { TreeFormationPattern } from './treeFormation';
import { Vector3 } from '../../../../types/common';
import { createSeededRandom } from '../../../utils/random';

// Branch node structure for tree generation
interface BranchNode {
  position: Vector3;
  direction: Vector3;
  level: number;
  length: number;
}

/**
 * Generate positions for a tree formation
 * @param pattern The tree formation pattern
 * @param seed The random seed
 * @returns An array of Vector3 positions
 */
export function generateTreeFormation(
  pattern: TreeFormationPattern,
  seed: number
): Vector3[] {
  const {
    height,
    branchLevels,
    branchFactor,
    branchAngle,
    branchLength,
    trunkWidth,
    leafDensity,
    offset,
    rotation,
    jitter
  } = pattern.parameters;

  const positions: Vector3[] = [];
  const random = createSeededRandom(seed);

  // Generate trunk
  const trunkSegments = Math.ceil(height / branchLength);
  const trunkDirection = { x: 0, y: 1, z: 0 }; // Trunk grows upward

  // Add trunk particles
  for (let i = 0; i <= trunkSegments; i++) {
    const t = i / trunkSegments;
    const y = t * height;

    // Add trunk particles in a circle around the center
    const trunkParticles = Math.max(3, Math.floor(trunkWidth * 3 * (1 - t * 0.7))); // Thinner at the top
    for (let j = 0; j < trunkParticles; j++) {
      const angle = (j / trunkParticles) * Math.PI * 2 + rotation;
      const radius = trunkWidth * (1 - t * 0.7); // Trunk gets thinner toward the top

      // Add jitter to trunk
      const jitterX = (random() * 2 - 1) * jitter * radius;
      const jitterZ = (random() * 2 - 1) * jitter * radius;
      const jitterY = (random() * 2 - 1) * jitter * branchLength * 0.2;

      positions.push({
        x: Math.cos(angle) * radius + jitterX + offset.x,
        y: y + jitterY + offset.y,
        z: Math.sin(angle) * radius + jitterZ + offset.z
      });
    }
  }

  // Generate branches using a queue-based approach
  const branchQueue: BranchNode[] = [];

  // Add initial branches from the trunk
  const branchStartHeight = height * 0.3; // Start branches from 30% up the trunk
  const branchEndHeight = height * 0.9;   // End branches at 90% up the trunk
  const branchSteps = Math.max(3, branchLevels);

  for (let i = 0; i < branchSteps; i++) {
    const t = i / (branchSteps - 1);
    const y = branchStartHeight + t * (branchEndHeight - branchStartHeight);

    // Add branches around the trunk at this height
    const branchesAtThisLevel = Math.max(2, Math.floor(branchFactor * (1 + t)));
    for (let j = 0; j < branchesAtThisLevel; j++) {
      const angle = (j / branchesAtThisLevel) * Math.PI * 2 + rotation + random() * 0.5;

      // Branch direction (outward and upward)
      const branchDir = {
        x: Math.cos(angle) * Math.sin(branchAngle),
        y: Math.cos(branchAngle),
        z: Math.sin(angle) * Math.sin(branchAngle)
      };

      branchQueue.push({
        position: { x: 0, y, z: 0 },
        direction: branchDir,
        level: 1,
        length: branchLength * (0.8 + t * 0.4) // Longer branches higher up
      });
    }
  }

  // Process branch queue
  while (branchQueue.length > 0) {
    const branch = branchQueue.shift()!;

    // Calculate end position of this branch
    const endPos = {
      x: branch.position.x + branch.direction.x * branch.length,
      y: branch.position.y + branch.direction.y * branch.length,
      z: branch.position.z + branch.direction.z * branch.length
    };

    // Add particles along the branch
    const branchParticles = Math.max(3, Math.floor(branch.length * 2));
    for (let i = 0; i <= branchParticles; i++) {
      const t = i / branchParticles;

      // Interpolate position along branch
      const pos = {
        x: branch.position.x + t * (endPos.x - branch.position.x),
        y: branch.position.y + t * (endPos.y - branch.position.y),
        z: branch.position.z + t * (endPos.z - branch.position.z)
      };

      // Add jitter
      const jitterAmount = jitter * branch.length * 0.1;
      const jitterX = (random() * 2 - 1) * jitterAmount;
      const jitterY = (random() * 2 - 1) * jitterAmount;
      const jitterZ = (random() * 2 - 1) * jitterAmount;

      // Add to positions with offset
      positions.push({
        x: pos.x + jitterX + offset.x,
        y: pos.y + jitterY + offset.y,
        z: pos.z + jitterZ + offset.z
      });
    }

    // Add sub-branches if not at max level
    if (branch.level < branchLevels) {
      const subBranchCount = Math.max(2, branchFactor - branch.level);

      for (let i = 0; i < subBranchCount; i++) {
        // Calculate sub-branch direction with variation
        const angleOffset = (i / subBranchCount) * Math.PI * 2;
        const subBranchAngle = branchAngle * (0.8 + random() * 0.4);

        // Create a perpendicular vector to branch direction
        let perpX, perpY, perpZ;
        if (Math.abs(branch.direction.y) > 0.9) {
          // If branch is mostly vertical, use x-axis as reference
          perpX = 0;
          perpY = -branch.direction.z;
          perpZ = branch.direction.y;
        } else {
          // Otherwise use y-axis as reference
          perpX = branch.direction.z;
          perpY = 0;
          perpZ = -branch.direction.x;
        }

        // Normalize perpendicular vector
        const perpLength = Math.sqrt(perpX * perpX + perpY * perpY + perpZ * perpZ);
        perpX /= perpLength;
        perpY /= perpLength;
        perpZ /= perpLength;

        // Rotate perpendicular vector around branch direction
        const cosAngle = Math.cos(angleOffset);
        const sinAngle = Math.sin(angleOffset);

        // Apply rotation and angle to get sub-branch direction
        const subBranchDir = {
          x: branch.direction.x * Math.cos(subBranchAngle) + perpX * Math.sin(subBranchAngle) * cosAngle,
          y: branch.direction.y * Math.cos(subBranchAngle) + perpY * Math.sin(subBranchAngle) * cosAngle,
          z: branch.direction.z * Math.cos(subBranchAngle) + perpZ * Math.sin(subBranchAngle) * sinAngle
        };

        // Add sub-branch to queue
        branchQueue.push({
          position: endPos,
          direction: subBranchDir,
          level: branch.level + 1,
          length: branch.length * 0.7 // Sub-branches are shorter
        });
      }
    }

    // Add leaves at the end of terminal branches
    if (branch.level === branchLevels) {
      const leafCount = Math.floor(leafDensity * 10);

      for (let i = 0; i < leafCount; i++) {
        // Random position near the end of the branch
        const leafRadius = branch.length * 0.5;
        const angle1 = random() * Math.PI * 2;
        const angle2 = random() * Math.PI;

        const leafX = endPos.x + Math.sin(angle2) * Math.cos(angle1) * leafRadius;
        const leafY = endPos.y + Math.sin(angle2) * Math.sin(angle1) * leafRadius;
        const leafZ = endPos.z + Math.cos(angle2) * leafRadius;

        // Add leaf with offset
        positions.push({
          x: leafX + offset.x,
          y: leafY + offset.y,
          z: leafZ + offset.z
        });
      }
    }
  }

  return positions;
}

/**
 * Generate positions for a fractal tree formation
 * @param pattern The tree formation pattern
 * @param seed The random seed
 * @returns An array of Vector3 positions
 */
export function generateFractalTreeFormation(
  pattern: TreeFormationPattern,
  seed: number
): Vector3[] {
  // Create a modified pattern with more fractal-like properties
  const fractalPattern: TreeFormationPattern = {
    ...pattern,
    parameters: {
      ...pattern.parameters,
      branchLevels: Math.min(pattern.parameters.branchLevels + 1, 6),
      branchFactor: Math.min(pattern.parameters.branchFactor + 1, 4),
      branchAngle: pattern.parameters.branchAngle * 0.9,
      jitter: pattern.parameters.jitter * 0.8 // Less jitter for more geometric look
    }
  };

  return generateTreeFormation(fractalPattern, seed);
}
