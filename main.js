import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';
import {mockWithVideo} from "./libs/camera-mock";

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('startButton');

  startButton.addEventListener('click', async () => {
    startButton.style.display = 'none'; // Nascondi il pulsante dopo il clic

    mockWithVideo("./assets/mock-videos/course-banner1.mp4");
    // initialize MindAR 
    const mindarThree = new MindARThree({
      container: document.body,
      imageTargetSrc: '../../assets/targets/course-banner.mind',
    });
    const {renderer, scene, camera} = mindarThree;

    // create AR object
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({color: 0x00ffff, transparent: true, opacity: 0.5});
    const plane = new THREE.Mesh(geometry, material);

    // create anchor
    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(plane);

    // start AR
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  });
});
