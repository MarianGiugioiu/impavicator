import { Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-pavement-shape',
  templateUrl: './pavement-shape.component.html',
  styleUrls: ['./pavement-shape.component.scss']
})
export class PavementShapeComponent {
  @ViewChild('canvasshaders') private canvasRef: ElementRef;
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private orbit: OrbitControls;

  private gui: dat.GUI;

  private sphereAngle: number = 0;

  private options: any;

  widthRatio: number;
  heightRatio: number;

  rayCaster: THREE.Raycaster;
  mousePosition: THREE.Vector2;


  constructor() { }

  ngAfterViewInit() {
    this.canvas.width = 1280 * 2;
    this.canvas.height = 739 * 2;
    this.widthRatio = this.canvas.width / window.innerWidth;
    this.heightRatio = this.canvas.height / window.innerHeight;

    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    this.renderer.shadowMap.enabled = true;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.orbit = new OrbitControls(this.camera, this.renderer.domElement);

    const axesHelper = new THREE.AxesHelper(5);

    //this.scene.add(axesHelper);

    const textureLoader = new THREE.TextureLoader();

    this.camera.position.set(-10,30,30);
    this.orbit.update;

    const gridHelper = new THREE.GridHelper(30);
    //this.scene.add(gridHelper);

    const ambientLight = new THREE.AmbientLight(0x333333);
    this.scene.add(ambientLight);
    ambientLight.intensity = 4;
    
    this.scene.background = textureLoader.load('https://i0.wp.com/eos.org/wp-content/uploads/2022/09/scorpius-centaurus-ob-stellar-association.jpg?fit=1200%2C675&ssl=1');


    const tri = new THREE.Shape();
    tri.moveTo(0, 1);
    tri.bezierCurveTo(2, 7, 10, 5, 10, 2);
    tri.bezierCurveTo(15, 10, 20, 10, 20, 2);
    // geometry
    const geometry = new THREE.ShapeGeometry(tri);
    geometry.rotateX(Math.PI * 1); // might want to center
    geometry.center();
    //-------- ----------
    // MESH
    //-------- ----------
    const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({side: THREE.DoubleSide}));
    mesh.add(new THREE.BoxHelper(mesh));
    // add the mesh to the scene
    this.scene.add(mesh);

    this.rayCaster = new THREE.Raycaster();

    this.renderer.setAnimationLoop((time) => {
      this.renderer.render(this.scene, this.camera);
    });
  }
}
