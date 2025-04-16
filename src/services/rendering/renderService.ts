/**
 * Render Service for Bitcoin Protozoa
 *
 * This service orchestrates the rendering process, managing the scene,
 * camera, and renderer, and coordinating with other rendering services.
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { Vector3, Role } from '../../types/core';
import { getParticleRenderer } from './particleRenderer';
import { getShaderManager } from './shaderManager';
import { getLODManager } from './lodManager';
import { BlockData } from '../../types/bitcoin/bitcoin/block';

/**
 * Render Service class
 * Orchestrates the rendering process
 */
class RenderService {
  private container: HTMLElement | null = null;
  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private renderer: THREE.WebGLRenderer | null = null;
  private controls: OrbitControls | null = null;
  private composer: EffectComposer | null = null;
  private clock: THREE.Clock = new THREE.Clock();
  private animationId: number | null = null;
  private blockData: BlockData | null = null;
  private initialized: boolean = false;

  /**
   * Initialize the render service
   * @param container DOM element to render to (optional)
   */
  public initialize(container?: HTMLElement): void {
    if (!container) {
      console.warn('No container provided, using document.body');
      container = document.body;
    }
    this.container = container;

    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#000000');

    // Create camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 50;

    // Create renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    container.appendChild(this.renderer.domElement);

    // Create controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;

    // Create composer for post-processing
    this.composer = new EffectComposer(this.renderer);

    // Add render pass
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    // Add bloom pass
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      0.5, // strength
      0.4, // radius
      0.85 // threshold
    );
    this.composer.addPass(bloomPass);

    // Initialize particle renderer
    getParticleRenderer().initialize(container);

    // Initialize shader manager
    getShaderManager().initialize();

    // Initialize LOD manager
    getLODManager().initialize(this.camera);

    // Set up resize handler
    window.addEventListener('resize', () => this.handleResize());

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 10);
    this.scene.add(directionalLight);

    this.initialized = true;
    console.log('Render Service initialized');
  }

  /**
   * Set block data for rendering
   * @param blockData Bitcoin block data
   */
  public setBlockData(blockData: BlockData): void {
    this.blockData = blockData;

    // Update rendering based on block data
    // This will be implemented when the particle system is ready
  }

  /**
   * Update particle positions
   * @param role Particle role
   * @param positions Array of particle positions
   * @param velocities Optional array of particle velocities
   * @param scales Optional array of particle scales
   */
  public updateParticles(
    role: Role,
    positions: Vector3[],
    velocities?: Vector3[],
    scales?: number[]
  ): void {
    getParticleRenderer().updateParticles(role, positions, velocities, scales);
  }

  /**
   * Start the render loop
   */
  public startRenderLoop(): void {
    if (!this.initialized) {
      return;
    }

    // Stop any existing animation
    this.stopRenderLoop();

    // Start animation loop
    const animate = () => {
      this.animationId = requestAnimationFrame(animate);
      this.renderInternal();
    };

    animate();
  }

  /**
   * Stop the render loop
   */
  public stopRenderLoop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  /**
   * Render the scene (private implementation)
   */
  private renderInternal(): void {
    if (!this.initialized || !this.scene || !this.camera || !this.composer) {
      return;
    }

    // Update controls
    if (this.controls) {
      this.controls.update();
    }

    // Update shader uniforms
    getShaderManager().updateUniforms(this.clock.getDelta());

    // Render scene with composer
    this.composer.render();
  }

  /**
   * Handle window resize
   */
  private handleResize(): void {
    if (!this.initialized || !this.container || !this.camera || !this.renderer || !this.composer) {
      return;
    }

    // Update camera aspect ratio
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();

    // Update renderer size
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);

    // Update composer size
    this.composer.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  /**
   * Render the scene (public method)
   */
  public render(): void {
    this.renderInternal();
  }

  /**
   * Take a screenshot of the current view
   * @returns Data URL of the screenshot
   */
  public takeScreenshot(): string {
    if (!this.initialized || !this.renderer) {
      return '';
    }

    // Render scene
    this.renderInternal();

    // Get data URL
    return this.renderer.domElement.toDataURL('image/png');
  }

  /**
   * Get the scene
   * @returns THREE.Scene
   */
  public getScene(): THREE.Scene | null {
    return this.scene;
  }

  /**
   * Get the camera
   * @returns THREE.PerspectiveCamera
   */
  public getCamera(): THREE.PerspectiveCamera | null {
    return this.camera;
  }

  /**
   * Get the renderer
   * @returns THREE.WebGLRenderer
   */
  public getRenderer(): THREE.WebGLRenderer | null {
    return this.renderer;
  }

  /**
   * Dispose of all resources
   */
  public dispose(): void {
    if (!this.initialized) {
      return;
    }

    // Stop render loop
    this.stopRenderLoop();

    // Dispose of particle renderer
    getParticleRenderer().dispose();

    // Dispose of composer
    if (this.composer) {
      this.composer.renderTarget1.dispose();
      this.composer.renderTarget2.dispose();
    }

    // Dispose of renderer
    if (this.renderer) {
      this.renderer.dispose();

      // Remove canvas from DOM
      const canvas = this.renderer.domElement;
      if (canvas.parentElement) {
        canvas.parentElement.removeChild(canvas);
      }
    }

    // Clear references
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.composer = null;
    this.container = null;

    this.initialized = false;
  }
}

// Singleton instance
let renderServiceInstance: RenderService | null = null;

/**
 * Get the render service instance
 * @returns RenderService instance
 */
export function getRenderService(): RenderService {
  if (!renderServiceInstance) {
    renderServiceInstance = new RenderService();
  }

  return renderServiceInstance;
}

