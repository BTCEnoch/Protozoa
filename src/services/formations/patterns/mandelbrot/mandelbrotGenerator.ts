/**
 * Mandelbrot Formation Generator
 *
 * Generates particle positions for Mandelbrot formations.
 */

import { MandelbrotFormationPattern } from './mandelbrotFormation';
import { Vector3 } from '../../../../types/common';
import { createSeededRandom } from '../../../utils/random';

/**
 * Generate positions for a Mandelbrot formation
 * @param pattern The Mandelbrot formation pattern
 * @param seed The random seed
 * @returns An array of Vector3 positions
 */
export function generateMandelbrotFormation(
  pattern: MandelbrotFormationPattern,
  seed: number
): Vector3[] {
  const {
    centerX,
    centerY,
    scale,
    iterations,
    threshold,
    density,
    offset,
    rotation,
    jitter,
    is3D
  } = pattern.parameters;

  const positions: Vector3[] = [];
  const random = createSeededRandom(seed);

  // Choose the appropriate generator based on the is3D flag
  if (is3D) {
    return generate3DJuliaFormation(pattern, seed);
  } else {
    return generate2DMandelbrotFormation(pattern, seed);
  }
}

/**
 * Generate positions for a 2D Mandelbrot set
 * @param pattern The Mandelbrot formation pattern
 * @param seed The random seed
 * @returns An array of Vector3 positions
 */
function generate2DMandelbrotFormation(
  pattern: MandelbrotFormationPattern,
  seed: number
): Vector3[] {
  const {
    centerX,
    centerY,
    scale,
    iterations,
    threshold,
    density,
    offset,
    rotation,
    jitter
  } = pattern.parameters;

  const positions: Vector3[] = [];
  const random = createSeededRandom(seed);

  // Calculate the number of points to generate based on density
  const pointCount = Math.floor(density * 200);

  // Generate random points and check if they're in the Mandelbrot set
  let validPoints = 0;
  let attempts = 0;
  const maxAttempts = pointCount * 10; // Limit the number of attempts

  while (validPoints < pointCount && attempts < maxAttempts) {
    attempts++;

    // Generate a random point in the complex plane
    const x = centerX + (random() * 2 - 1) * scale;
    const y = centerY + (random() * 2 - 1) * scale;

    // Calculate the Mandelbrot value for this point
    const iterationCount = mandelbrotIterations(x, y, iterations, threshold);

    // Only include points that are in the set (reached max iterations)
    // or are close to the boundary (interesting points)
    if (iterationCount > 0 && (iterationCount === iterations || iterationCount > iterations * 0.7)) {
      // Map iteration count to z-coordinate for visual interest
      const z = (iterationCount / iterations) * scale * 0.5;

      // Apply rotation
      const cosRot = Math.cos(rotation);
      const sinRot = Math.sin(rotation);
      const rotX = x * cosRot - y * sinRot;
      const rotY = x * sinRot + y * cosRot;

      // Add jitter
      const jitterX = (random() * 2 - 1) * jitter * scale;
      const jitterY = (random() * 2 - 1) * jitter * scale;
      const jitterZ = (random() * 2 - 1) * jitter * scale;

      // Add to positions with offset
      positions.push({
        x: rotX + jitterX + offset.x,
        y: rotY + jitterY + offset.y,
        z: z + jitterZ + offset.z
      });

      validPoints++;
    }
  }

  return positions;
}

/**
 * Generate positions for a 3D Julia set
 * @param pattern The Mandelbrot formation pattern
 * @param seed The random seed
 * @returns An array of Vector3 positions
 */
function generate3DJuliaFormation(
  pattern: MandelbrotFormationPattern,
  seed: number
): Vector3[] {
  const {
    centerX,
    centerY,
    scale,
    iterations,
    threshold,
    density,
    offset,
    rotation,
    jitter
  } = pattern.parameters;

  const positions: Vector3[] = [];
  const random = createSeededRandom(seed);

  // Calculate the number of points to generate based on density
  const pointCount = Math.floor(density * 300);

  // Use the center coordinates as the Julia set parameter
  const juliaA = centerX;
  const juliaB = centerY;

  // Generate random points in 3D space and check if they're in the Julia set
  let validPoints = 0;
  let attempts = 0;
  const maxAttempts = pointCount * 10; // Limit the number of attempts

  while (validPoints < pointCount && attempts < maxAttempts) {
    attempts++;

    // Generate a random point in 3D space
    const x = (random() * 2 - 1) * scale;
    const y = (random() * 2 - 1) * scale;
    const z = (random() * 2 - 1) * scale;

    // Calculate the Julia set value for this point
    const iterationCount = juliaIterations3D(x, y, z, juliaA, juliaB, iterations, threshold);

    // Only include points that are in the set or close to the boundary
    if (iterationCount > 0 && (iterationCount === iterations || iterationCount > iterations * 0.7)) {
      // Add jitter
      const jitterX = (random() * 2 - 1) * jitter * scale;
      const jitterY = (random() * 2 - 1) * jitter * scale;
      const jitterZ = (random() * 2 - 1) * jitter * scale;

      // Apply rotation around Y axis
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

      validPoints++;
    }
  }

  return positions;
}

/**
 * Calculate the number of iterations for a point in the Mandelbrot set
 * @param x X-coordinate in the complex plane
 * @param y Y-coordinate in the complex plane
 * @param maxIterations Maximum number of iterations
 * @param threshold Escape threshold
 * @returns The number of iterations before escaping, or maxIterations if it doesn't escape
 */
function mandelbrotIterations(
  x: number,
  y: number,
  maxIterations: number,
  threshold: number
): number {
  let zx = 0;
  let zy = 0;
  let iteration = 0;

  while (zx * zx + zy * zy < threshold && iteration < maxIterations) {
    const xtemp = zx * zx - zy * zy + x;
    zy = 2 * zx * zy + y;
    zx = xtemp;
    iteration++;
  }

  return iteration;
}

/**
 * Calculate the number of iterations for a point in a 3D Julia set
 * @param x X-coordinate
 * @param y Y-coordinate
 * @param z Z-coordinate
 * @param juliaA Julia set parameter A
 * @param juliaB Julia set parameter B
 * @param maxIterations Maximum number of iterations
 * @param threshold Escape threshold
 * @returns The number of iterations before escaping, or maxIterations if it doesn't escape
 */
function juliaIterations3D(
  x: number,
  y: number,
  z: number,
  juliaA: number,
  juliaB: number,
  maxIterations: number,
  threshold: number
): number {
  let iteration = 0;

  // Use quaternion Julia set formula
  let qx = x;
  let qy = y;
  let qz = z;
  let qw = 0;

  while (qx * qx + qy * qy + qz * qz + qw * qw < threshold && iteration < maxIterations) {
    // Quaternion multiplication
    const nx = qx * qx - qy * qy - qz * qz - qw * qw + juliaA;
    const ny = 2 * qx * qy + juliaB;
    const nz = 2 * qx * qz;
    const nw = 2 * qx * qw;

    qx = nx;
    qy = ny;
    qz = nz;
    qw = nw;

    iteration++;
  }

  return iteration;
}
