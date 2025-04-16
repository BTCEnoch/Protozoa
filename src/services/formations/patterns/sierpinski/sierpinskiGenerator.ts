/**
 * Sierpinski Formation Generator
 *
 * Generates particle positions for Sierpinski formations.
 */

import { SierpinskiFormationPattern } from './sierpinskiFormation';
import { Vector3 } from '../../../../types/common';
import { createSeededRandom } from '../../../utils/random';

/**
 * Generate positions for a Sierpinski formation
 * @param pattern The Sierpinski formation pattern
 * @param seed The random seed
 * @returns An array of Vector3 positions
 */
export function generateSierpinskiFormation(
  pattern: SierpinskiFormationPattern,
  seed: number
): Vector3[] {
  const {
    size,
    iterations,
    shape,
    scale,
    offset,
    rotation,
    jitter
  } = pattern.parameters;

  const positions: Vector3[] = [];
  const random = createSeededRandom(seed);

  // Choose the appropriate generator based on shape
  switch (shape) {
    case 'triangle':
      generateSierpinskiTriangle(positions, size, iterations, scale, offset, rotation, jitter, random);
      break;
    case 'tetrahedron':
      generateSierpinskiTetrahedron(positions, size, iterations, scale, offset, rotation, jitter, random);
      break;
    case 'carpet':
      generateSierpinskiCarpet(positions, size, iterations, scale, offset, rotation, jitter, random);
      break;
    default:
      generateSierpinskiTriangle(positions, size, iterations, scale, offset, rotation, jitter, random);
  }

  return positions;
}

/**
 * Generate a Sierpinski triangle
 * @param positions Array to store positions
 * @param size Size of the triangle
 * @param iterations Number of iterations
 * @param scale Scale factor between iterations
 * @param offset Center offset
 * @param rotation Rotation angle
 * @param jitter Random variation
 * @param random Random number generator
 */
function generateSierpinskiTriangle(
  positions: Vector3[],
  size: number,
  iterations: number,
  scale: number,
  offset: Vector3,
  rotation: number,
  jitter: number,
  random: () => number
): void {
  // Define the three vertices of the initial triangle
  const height = size * Math.sqrt(3) / 2;
  const vertices = [
    { x: -size / 2, y: -height / 3, z: 0 },  // Bottom left
    { x: size / 2, y: -height / 3, z: 0 },    // Bottom right
    { x: 0, y: height * 2/3, z: 0 }           // Top
  ];

  // Apply rotation to vertices
  const cosRot = Math.cos(rotation);
  const sinRot = Math.sin(rotation);
  for (const vertex of vertices) {
    const x = vertex.x;
    const z = vertex.z;
    vertex.x = x * cosRot - z * sinRot;
    vertex.z = x * sinRot + z * cosRot;
  }

  // Recursive function to generate points
  function generatePoints(p1: Vector3, p2: Vector3, p3: Vector3, depth: number): void {
    if (depth === 0) {
      // Add the three vertices of this triangle
      for (const p of [p1, p2, p3]) {
        // Add jitter
        const jitterX = (random() * 2 - 1) * jitter * size;
        const jitterY = (random() * 2 - 1) * jitter * size;
        const jitterZ = (random() * 2 - 1) * jitter * size;

        // Add to positions with offset
        positions.push({
          x: p.x + jitterX + offset.x,
          y: p.y + jitterY + offset.y,
          z: p.z + jitterZ + offset.z
        });
      }
      return;
    }

    // Calculate midpoints
    const mid1 = {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
      z: (p1.z + p2.z) / 2
    };

    const mid2 = {
      x: (p2.x + p3.x) / 2,
      y: (p2.y + p3.y) / 2,
      z: (p2.z + p3.z) / 2
    };

    const mid3 = {
      x: (p3.x + p1.x) / 2,
      y: (p3.y + p1.y) / 2,
      z: (p3.z + p1.z) / 2
    };

    // Recursive calls for the three sub-triangles
    generatePoints(p1, mid1, mid3, depth - 1);
    generatePoints(mid1, p2, mid2, depth - 1);
    generatePoints(mid3, mid2, p3, depth - 1);
  }

  // Start the recursion
  generatePoints(vertices[0], vertices[1], vertices[2], iterations);
}

/**
 * Generate a Sierpinski tetrahedron
 * @param positions Array to store positions
 * @param size Size of the tetrahedron
 * @param iterations Number of iterations
 * @param scale Scale factor between iterations
 * @param offset Center offset
 * @param rotation Rotation angle
 * @param jitter Random variation
 * @param random Random number generator
 */
function generateSierpinskiTetrahedron(
  positions: Vector3[],
  size: number,
  iterations: number,
  scale: number,
  offset: Vector3,
  rotation: number,
  jitter: number,
  random: () => number
): void {
  // Define the four vertices of the initial tetrahedron
  const vertices = [
    { x: 0, y: 0, z: size * Math.sqrt(2/3) },                      // Top
    { x: -size/2, y: -size/(2*Math.sqrt(3)), z: -size/(2*Math.sqrt(6)) },  // Bottom left
    { x: size/2, y: -size/(2*Math.sqrt(3)), z: -size/(2*Math.sqrt(6)) },   // Bottom right
    { x: 0, y: size/Math.sqrt(3), z: -size/(2*Math.sqrt(6)) }        // Bottom back
  ];

  // Apply rotation to vertices
  const cosRot = Math.cos(rotation);
  const sinRot = Math.sin(rotation);
  for (const vertex of vertices) {
    const x = vertex.x;
    const z = vertex.z;
    vertex.x = x * cosRot - z * sinRot;
    vertex.z = x * sinRot + z * cosRot;
  }

  // Recursive function to generate points
  function generatePoints(p1: Vector3, p2: Vector3, p3: Vector3, p4: Vector3, depth: number): void {
    if (depth === 0) {
      // Add the four vertices of this tetrahedron
      for (const p of [p1, p2, p3, p4]) {
        // Add jitter
        const jitterX = (random() * 2 - 1) * jitter * size;
        const jitterY = (random() * 2 - 1) * jitter * size;
        const jitterZ = (random() * 2 - 1) * jitter * size;

        // Add to positions with offset
        positions.push({
          x: p.x + jitterX + offset.x,
          y: p.y + jitterY + offset.y,
          z: p.z + jitterZ + offset.z
        });
      }
      return;
    }

    // Calculate midpoints
    const mid1 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2, z: (p1.z + p2.z) / 2 };
    const mid2 = { x: (p2.x + p3.x) / 2, y: (p2.y + p3.y) / 2, z: (p2.z + p3.z) / 2 };
    const mid3 = { x: (p3.x + p1.x) / 2, y: (p3.y + p1.y) / 2, z: (p3.z + p1.z) / 2 };
    const mid4 = { x: (p1.x + p4.x) / 2, y: (p1.y + p4.y) / 2, z: (p1.z + p4.z) / 2 };
    const mid5 = { x: (p2.x + p4.x) / 2, y: (p2.y + p4.y) / 2, z: (p2.z + p4.z) / 2 };
    const mid6 = { x: (p3.x + p4.x) / 2, y: (p3.y + p4.y) / 2, z: (p3.z + p4.z) / 2 };

    // Recursive calls for the four sub-tetrahedra
    generatePoints(p1, mid1, mid3, mid4, depth - 1);
    generatePoints(mid1, p2, mid2, mid5, depth - 1);
    generatePoints(mid3, mid2, p3, mid6, depth - 1);
    generatePoints(mid4, mid5, mid6, p4, depth - 1);
  }

  // Start the recursion
  generatePoints(vertices[0], vertices[1], vertices[2], vertices[3], iterations);
}

/**
 * Generate a Sierpinski carpet
 * @param positions Array to store positions
 * @param size Size of the carpet
 * @param iterations Number of iterations
 * @param scale Scale factor between iterations
 * @param offset Center offset
 * @param rotation Rotation angle
 * @param jitter Random variation
 * @param random Random number generator
 */
function generateSierpinskiCarpet(
  positions: Vector3[],
  size: number,
  iterations: number,
  scale: number,
  offset: Vector3,
  rotation: number,
  jitter: number,
  random: () => number
): void {
  // Recursive function to generate points
  function generatePoints(x: number, y: number, z: number, size: number, depth: number): void {
    if (depth === 0) {
      // Add a point at this position
      const jitterX = (random() * 2 - 1) * jitter * size;
      const jitterY = (random() * 2 - 1) * jitter * size;
      const jitterZ = (random() * 2 - 1) * jitter * size;

      // Apply rotation
      const cosRot = Math.cos(rotation);
      const sinRot = Math.sin(rotation);
      const rotX = x * cosRot - z * sinRot;
      const rotZ = x * sinRot + z * cosRot;

      // Add to positions with offset
      positions.push({
        x: rotX + jitterX + offset.x,
        y: y + jitterY + offset.y,
        z: rotZ + jitterZ + offset.z
      });
      return;
    }

    const newSize = size / 3;

    // Generate the 8 sub-squares (skip the center)
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Skip the center square
        if (i === 1 && j === 1) continue;

        const newX = x - size/2 + newSize/2 + i * newSize;
        const newY = y - size/2 + newSize/2 + j * newSize;

        generatePoints(newX, newY, z, newSize, depth - 1);
      }
    }
  }

  // Start the recursion from the center
  generatePoints(0, 0, 0, size, iterations);
}

/**
 * Generate positions for a 3D Sierpinski carpet (cube)
 * @param pattern The Sierpinski formation pattern
 * @param seed The random seed
 * @returns An array of Vector3 positions
 */
export function generate3DSierpinskiCarpet(
  pattern: SierpinskiFormationPattern,
  seed: number
): Vector3[] {
  const {
    size,
    iterations,
    offset,
    jitter
  } = pattern.parameters;

  const positions: Vector3[] = [];
  const random = createSeededRandom(seed);

  // Recursive function to generate points for a 3D Sierpinski carpet (cube)
  function generatePoints(x: number, y: number, z: number, size: number, depth: number): void {
    if (depth === 0) {
      // Add a point at this position
      const jitterX = (random() * 2 - 1) * jitter * size;
      const jitterY = (random() * 2 - 1) * jitter * size;
      const jitterZ = (random() * 2 - 1) * jitter * size;

      // Add to positions with offset
      positions.push({
        x: x + jitterX + offset.x,
        y: y + jitterY + offset.y,
        z: z + jitterZ + offset.z
      });
      return;
    }

    const newSize = size / 3;

    // Generate the 20 sub-cubes (skip the center and 6 adjacent centers)
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          // Skip the center cube and the 6 adjacent centers
          if ((i === 1 && j === 1) ||
              (i === 1 && k === 1) ||
              (j === 1 && k === 1)) continue;

          const newX = x - size/2 + newSize/2 + i * newSize;
          const newY = y - size/2 + newSize/2 + j * newSize;
          const newZ = z - size/2 + newSize/2 + k * newSize;

          generatePoints(newX, newY, newZ, newSize, depth - 1);
        }
      }
    }
  }

  // Start the recursion from the center
  generatePoints(0, 0, 0, size, iterations);

  return positions;
}
