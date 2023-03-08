import { Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
// import GUI from 'lil-gui';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';

@Component({
  selector: 'app-curve-shape',
  templateUrl: './curve-shape.component.html',
  styleUrls: ['./curve-shape.component.scss']
})
export class CurveShapeComponent {
  @ViewChild('canvas') private canvasRef: ElementRef<HTMLCanvasElement>;

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private circle: THREE.Mesh;
  private raycaster: THREE.Raycaster = new THREE.Raycaster();
  private mouse: THREE.Vector2 = new THREE.Vector2();

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;

    const width = window.innerWidth * 0.8;
    const height = window.innerHeight * 0.8;

    canvas.width = width;
    canvas.height = height;

    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setSize(width, height);

    this.scene = new THREE.Scene();

    const aspectRatio = width / height;
    this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    this.camera.position.z = 5;

    this.controls = new OrbitControls(this.camera, canvas);

    const geometry = new THREE.CircleGeometry(0.5, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.circle = new THREE.Mesh(geometry, material);
    this.scene.add(this.circle);

    canvas.addEventListener('click', (event) => {
      console.log("asd");
      
      this.mouse.x = (event.clientX / width) * 2 - 1;
      this.mouse.y = -(event.clientY / height) * 2 + 1;
    
      this.raycaster.setFromCamera(this.mouse, this.camera);
    
      const intersects = this.raycaster.intersectObject(this.circle);
    
      if (intersects.length > 0) {
        const newTarget = new THREE.Vector3(
          Math.random() * 4 - 2,
          Math.random() * 4 - 2,
          0
        );
        this.circle.position.copy(newTarget);
      }
    });

    this.animate();
  }

  animate(): void {
    requestAnimationFrame(() => this.animate());
  
    this.controls.update();
  
    this.renderer.render(this.scene, this.camera);
  }
}
