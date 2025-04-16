/**
 * Rendering Utilities
 * 
 * This file contains utility functions for rendering in Three.js.
 * It provides helper functions for working with geometries, materials,
 * shaders, textures, and optimization techniques.
 */

import * as THREE from 'three';
import { LODLevel, LODOptions } from '../types/rendering/lod';
import { Vector3 } from '../types/common';

/**
 * Create a basic Three.js material
 * @param color Material color
 * @param options Optional material parameters
 * @returns Three.js material
 */
export function createBasicMaterial(
  color: string | number = 0xffffff,
  options: {
    wireframe?: boolean;
    transparent?: boolean;
    opacity?: number;
    side?: THREE.Side;
    map?: THREE.Texture;
    alphaMap?: THREE.Texture;
  } = {}
): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({
    color,
    wireframe: options.wireframe || false,
    transparent: options.transparent || false,
    opacity: options.opacity !== undefined ? options.opacity : 1.0,
    side: options.side || THREE.FrontSide,
    map: options.map,
    alphaMap: options.alphaMap
  });
}

/**
 * Create a standard Three.js material
 * @param color Material color
 * @param options Optional material parameters
 * @returns Three.js material
 */
export function createStandardMaterial(
  color: string | number = 0xffffff,
  options: {
    roughness?: number;
    metalness?: number;
    emissive?: string | number;
    emissiveIntensity?: number;
    transparent?: boolean;
    opacity?: number;
    side?: THREE.Side;
    map?: THREE.Texture;
    normalMap?: THREE.Texture;
    envMap?: THREE.Texture;
  } = {}
): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: options.roughness !== undefined ? options.roughness : 0.5,
    metalness: options.metalness !== undefined ? options.metalness : 0.0,
    emissive: options.emissive || 0x000000,
    emissiveIntensity: options.emissiveIntensity !== undefined ? options.emissiveIntensity : 1.0,
    transparent: options.transparent || false,
    opacity: options.opacity !== undefined ? options.opacity : 1.0,
    side: options.side || THREE.FrontSide,
    map: options.map,
    normalMap: options.normalMap,
    envMap: options.envMap
  });
}

/**
 * Create a point material for particle systems
 * @param color Material color
 * @param size Point size
 * @param options Optional material parameters
 * @returns Three.js points material
 */
export function createPointsMaterial(
  color: string | number = 0xffffff,
  size: number = 1.0,
  options: {
    sizeAttenuation?: boolean;
    transparent?: boolean;
    opacity?: number;
    map?: THREE.Texture;
    alphaMap?: THREE.Texture;
    alphaTest?: number;
  } = {}
): THREE.PointsMaterial {
  return new THREE.PointsMaterial({
    color,
    size,
    sizeAttenuation: options.sizeAttenuation !== undefined ? options.sizeAttenuation : true,
    transparent: options.transparent || false,
    opacity: options.opacity !== undefined ? options.opacity : 1.0,
    map: options.map,
    alphaMap: options.alphaMap,
    alphaTest: options.alphaTest !== undefined ? options.alphaTest : 0.0
  });
}

/**
 * Create a shader material
 * @param vertexShader Vertex shader code
 * @param fragmentShader Fragment shader code
 * @param uniforms Shader uniforms
 * @param options Optional material parameters
 * @returns Three.js shader material
 */
export function createShaderMaterial(
  vertexShader: string,
  fragmentShader: string,
  uniforms: { [uniform: string]: THREE.IUniform } = {},
  options: {
    transparent?: boolean;
    side?: THREE.Side;
    wireframe?: boolean;
  } = {}
): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: options.transparent || false,
    side: options.side || THREE.FrontSide,
    wireframe: options.wireframe || false
  });
}

/**
 * Create a geometry based on LOD level
 * @param lodLevel LOD level configuration
 * @returns Three.js geometry
 */
export function createGeometryFromLODLevel(lodLevel: LODLevel): THREE.BufferGeometry {
  const params = lodLevel.geometryParams || {};
  
  switch (lodLevel.geometry) {
    case 'sphere':
      return new THREE.SphereGeometry(
        params.radius || 1,
        params.segments || 16,
        params.segments || 16
      );
    case 'box':
      return new THREE.BoxGeometry(
        params.width || 1,
        params.height || 1,
        params.depth || 1
      );
    case 'cone':
      return new THREE.ConeGeometry(
        params.radius || 1,
        params.height || 2,
        params.segments || 16
      );
    case 'cylinder':
      return new THREE.CylinderGeometry(
        params.radius || 1,
        params.radius || 1,
        params.height || 2,
        params.segments || 16
      );
    case 'torus':
      return new THREE.TorusGeometry(
        params.radius || 1,
        params.radius ? params.radius * 0.3 : 0.3,
        params.segments || 16,
        params.segments ? params.segments * 2 : 32
      );
    case 'point':
    default:
      return new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0)]);
  }
}

/**
 * Create a material based on LOD level
 * @param lodLevel LOD level configuration
 * @returns Three.js material
 */
export function createMaterialFromLODLevel(lodLevel: LODLevel): THREE.Material {
  const params = lodLevel.materialParams || {};
  const color = params.color || '#ffffff';
  
  switch (lodLevel.material) {
    case 'standard':
      return createStandardMaterial(color, {
        emissive: params.emissive ? color : undefined,
        emissiveIntensity: params.emissiveIntensity,
        transparent: params.transparent,
        opacity: params.opacity
      });
    case 'phong':
      return new THREE.MeshPhongMaterial({
        color,
        emissive: params.emissive ? color : 0x000000,
        specular: 0x111111,
        shininess: 30,
        transparent: params.transparent || false,
        opacity: params.opacity !== undefined ? params.opacity : 1.0,
        wireframe: params.wireframe || false,
        flatShading: params.flatShading || false
      });
    case 'lambert':
      return new THREE.MeshLambertMaterial({
        color,
        emissive: params.emissive ? color : 0x000000,
        transparent: params.transparent || false,
        opacity: params.opacity !== undefined ? params.opacity : 1.0,
        wireframe: params.wireframe || false,
        flatShading: params.flatShading || false
      });
    case 'toon':
      return new THREE.MeshToonMaterial({
        color,
        transparent: params.transparent || false,
        opacity: params.opacity !== undefined ? params.opacity : 1.0,
        wireframe: params.wireframe || false
      });
    case 'point':
      return createPointsMaterial(color, params.size || 1.0, {
        sizeAttenuation: params.sizeAttenuation,
        transparent: params.transparent,
        opacity: params.opacity
      });
    case 'basic':
    default:
      return createBasicMaterial(color, {
        wireframe: params.wireframe,
        transparent: params.transparent,
        opacity: params.opacity
      });
  }
}

/**
 * Create a LOD object from LOD settings
 * @param lodSettings LOD settings
 * @returns Three.js LOD object
 */
export function createLODObject(lodSettings: LODOptions): THREE.LOD {
  const lod = new THREE.LOD();
  
  // Sort levels by distance
  const sortedLevels = [...lodSettings.levels].sort((a, b) => a.distance - b.distance);
  
  for (const level of sortedLevels) {
    const geometry = createGeometryFromLODLevel(level);
    const material = createMaterialFromLODLevel(level);
    
    let object: THREE.Object3D;
    
    if (level.material === 'point') {
      object = new THREE.Points(geometry, material);
    } else {
      object = new THREE.Mesh(geometry, material);
    }
    
    lod.addLevel(object, level.distance);
  }
  
  return lod;
}

/**
 * Convert a Vector3 from our types to a Three.js Vector3
 * @param vector Our Vector3 type
 * @returns Three.js Vector3
 */
export function convertToThreeVector3(vector: Vector3): THREE.Vector3 {
  return new THREE.Vector3(vector.x, vector.y, vector.z);
}

/**
 * Convert a Three.js Vector3 to our Vector3 type
 * @param vector Three.js Vector3
 * @returns Our Vector3 type
 */
export function convertFromThreeVector3(vector: THREE.Vector3): Vector3 {
  return { x: vector.x, y: vector.y, z: vector.z };
}

/**
 * Create a color from a hex string or RGB values
 * @param colorInput Hex string, RGB array, or separate R, G, B values
 * @returns Three.js Color
 */
export function createColor(
  colorInput: string | number | [number, number, number],
  g?: number,
  b?: number
): THREE.Color {
  if (Array.isArray(colorInput) && colorInput.length >= 3) {
    return new THREE.Color(colorInput[0], colorInput[1], colorInput[2]);
  } else if (typeof g === 'number' && typeof b === 'number') {
    return new THREE.Color(colorInput as number, g, b);
  } else {
    return new THREE.Color(colorInput as string | number);
  }
}

/**
 * Dispose of a Three.js object to free memory
 * @param object Object to dispose
 * @param disposeChildren Whether to dispose children recursively
 */
export function disposeObject(object: THREE.Object3D, disposeChildren: boolean = true): void {
  if (disposeChildren) {
    while (object.children.length > 0) {
      disposeObject(object.children[0], true);
      object.remove(object.children[0]);
    }
  }
  
  if (object instanceof THREE.Mesh) {
    if (object.geometry) {
      object.geometry.dispose();
    }
    
    if (object.material) {
      disposeMaterial(object.material);
    }
  } else if (object instanceof THREE.LOD) {
    object.levels.forEach(level => {
      if (level.object instanceof THREE.Mesh) {
        if (level.object.geometry) {
          level.object.geometry.dispose();
        }
        
        if (level.object.material) {
          disposeMaterial(level.object.material);
        }
      }
    });
  }
}

/**
 * Dispose of a Three.js material to free memory
 * @param material Material to dispose
 */
export function disposeMaterial(material: THREE.Material | THREE.Material[]): void {
  if (Array.isArray(material)) {
    material.forEach(mat => disposeMaterial(mat));
    return;
  }
  
  // Dispose textures
  Object.keys(material).forEach(prop => {
    const value = (material as any)[prop];
    if (value instanceof THREE.Texture) {
      value.dispose();
    }
  });
  
  material.dispose();
}

/**
 * Create a simple particle system
 * @param count Number of particles
 * @param size Particle size
 * @param color Particle color
 * @param options Optional parameters
 * @returns Three.js Points object
 */
export function createParticleSystem(
  count: number,
  size: number = 1.0,
  color: string | number = 0xffffff,
  options: {
    positions?: Vector3[];
    texture?: THREE.Texture;
    transparent?: boolean;
    opacity?: number;
    sizeAttenuation?: boolean;
  } = {}
): THREE.Points {
  const geometry = new THREE.BufferGeometry();
  
  // Create positions
  const positions = new Float32Array(count * 3);
  
  if (options.positions && options.positions.length > 0) {
    // Use provided positions
    for (let i = 0; i < Math.min(count, options.positions.length); i++) {
      positions[i * 3] = options.positions[i].x;
      positions[i * 3 + 1] = options.positions[i].y;
      positions[i * 3 + 2] = options.positions[i].z;
    }
  } else {
    // Create random positions
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  // Create material
  const material = createPointsMaterial(color, size, {
    sizeAttenuation: options.sizeAttenuation,
    transparent: options.transparent,
    opacity: options.opacity,
    map: options.texture
  });
  
  return new THREE.Points(geometry, material);
}

/**
 * Update particle positions
 * @param particles Points object
 * @param positions New positions
 */
export function updateRenderingParticlePositions(
  particles: THREE.Points,
  positions: Vector3[]
): void {
  const positionAttribute = particles.geometry.getAttribute('position');
  const positionArray = positionAttribute.array as Float32Array;
  
  const count = Math.min(positions.length, positionArray.length / 3);
  
  for (let i = 0; i < count; i++) {
    positionArray[i * 3] = positions[i].x;
    positionArray[i * 3 + 1] = positions[i].y;
    positionArray[i * 3 + 2] = positions[i].z;
  }
  
  positionAttribute.needsUpdate = true;
}

/**
 * Create a texture from an image URL
 * @param url Image URL
 * @param options Optional texture parameters
 * @returns Promise that resolves to a Three.js texture
 */
export function createTextureFromURL(
  url: string,
  options: {
    repeat?: THREE.Vector2;
    anisotropy?: number;
    filtering?: THREE.TextureFilter;
  } = {}
): Promise<THREE.Texture> {
  return new Promise((resolve, reject) => {
    const loader = new THREE.TextureLoader();
    
    loader.load(
      url,
      texture => {
        if (options.repeat) {
          texture.repeat.copy(options.repeat);
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
        }
        
        if (options.anisotropy) {
          texture.anisotropy = options.anisotropy;
        }
        
        if (options.filtering) {
          // Use filtering as both min and mag filter, but cast appropriately
          texture.magFilter = options.filtering as THREE.MagnificationTextureFilter;
          texture.minFilter = options.filtering as THREE.MinificationTextureFilter;
        }
        
        texture.needsUpdate = true;
        resolve(texture);
      },
      undefined,
      error => reject(error)
    );
  });
}

/**
 * Create a data texture from a TypedArray
 * @param data Typed array of data
 * @param width Texture width
 * @param height Texture height
 * @param format Texture format
 * @returns Three.js data texture
 */
export function createDataTexture(
  data: Float32Array | Uint8Array,
  width: number,
  height: number,
  format: THREE.PixelFormat = THREE.RGBAFormat
): THREE.DataTexture {
  const texture = new THREE.DataTexture(data, width, height, format);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Add a bloom effect to a scene (simplified helper)
 * @param renderer Three.js renderer
 * @param scene Three.js scene
 * @param camera Three.js camera
 * @param options Bloom options
 * @returns Function to render the bloom effect
 */
export function addBloomEffect(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera,
  options: {
    strength?: number;
    radius?: number;
    threshold?: number;
  } = {}
): () => void {
  // This is a simplified placeholder.
  // In a real implementation, you would use EffectComposer, RenderPass, UnrealBloomPass from three/examples/jsm/postprocessing
  // Since importing those requires additional setup, we're keeping this as a placeholder
  
  console.warn('Bloom effect requires EffectComposer, RenderPass, and UnrealBloomPass from three/examples/jsm/postprocessing');
  
  // Return a render function that just renders the scene normally
  return () => {
    renderer.render(scene, camera);
  };
}

/**
 * Set up an instanced mesh for efficient rendering of many objects
 * @param geometry Base geometry
 * @param material Base material
 * @param count Instance count
 * @returns Three.js instanced mesh
 */
export function createInstancedMesh(
  geometry: THREE.BufferGeometry,
  material: THREE.Material,
  count: number
): THREE.InstancedMesh {
  return new THREE.InstancedMesh(geometry, material, count);
}

/**
 * Update an instanced mesh's matrix for a specific instance
 * @param mesh Instanced mesh
 * @param index Instance index
 * @param position Position
 * @param rotation Rotation in Euler angles
 * @param scale Scale (uniform or vector)
 * @param color Optional color
 */
export function updateInstance(
  mesh: THREE.InstancedMesh,
  index: number,
  position: Vector3,
  rotation: Vector3 = { x: 0, y: 0, z: 0 },
  scale: number | Vector3 = 1,
  color?: THREE.Color
): void {
  const matrix = new THREE.Matrix4();
  const pos = new THREE.Vector3(position.x, position.y, position.z);
  const rot = new THREE.Euler(rotation.x, rotation.y, rotation.z);
  const quaternion = new THREE.Quaternion().setFromEuler(rot);
  
  let scaleVector: THREE.Vector3;
  if (typeof scale === 'number') {
    scaleVector = new THREE.Vector3(scale, scale, scale);
  } else {
    scaleVector = new THREE.Vector3(scale.x, scale.y, scale.z);
  }
  
  matrix.compose(pos, quaternion, scaleVector);
  mesh.setMatrixAt(index, matrix);
  
  if (color && mesh.instanceColor) {
    mesh.setColorAt(index, color);
  }
  
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
} 