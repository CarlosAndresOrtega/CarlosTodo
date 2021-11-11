var scene = null,
  camara = null,
  render = null,
  controls = null;

var elementsObj = new Array(0),
  count = 0,
  element3D = null,
  thing = null,
  zapatos = null;

var param = {
  a: "Player 01", // Select to load different models
  b: true, // True or False to see model
  c: "#ffffff", // Choose Color
};
const colorInput = document.getElementById("color");
// console.log(colorInput);
const precio = document.querySelector(".precio");
console.log(precio.innerHTML);

colorInput.addEventListener("input", (e) => {
  let color = e.target.value;

  console.log(color);
  scene.remove(light);
  scene.remove(light2);
  createLight(color);
});

function start() {
  window.addEventListener("resize", onWindowResize, false);
  alert("Bienvenido, Si tiene problemas con los componentes de la pagína, solo vuelva a recargarla");
  initElements();
  animate();
}

function initElements() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf2f2f2);

  camera = new THREE.PerspectiveCamera(
    25, // Ángulo "grabación" - De abaja -> Arriba
    window.innerWidth / window.innerHeight, // Relación de aspecto 16:9
    0.1, // Mas cerca (no renderiza)
    1000 // Mas lejos (no renderiza)
  );

  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#app"),
  });
  if(window.innerWidth <=1920 && window.innerWidth>=1200){
    renderer.setSize(window.innerWidth / 2.1, window.innerHeight / 2);
    camera.position.set(-30, 80, -110);

  }else if(window.innerWidth <=1200 && window.innerWidth>=992 ){
    console.log("entrando");
    renderer.setSize(750, 450);
    camera.position.set(-30, 80, -110);

  }else if(window.innerWidth <=992 && window.innerWidth>=768 ){
    console.log("entrando");
    renderer.setSize(750, 450);
    camera.position.set(-30, 80, -110);

  }else if(window.innerWidth <=576 && window.innerWidth>=360){
    renderer.setSize(350, 400);
    camera.position.set(-30, 80, -300);
  }else if(window.innerWidth <=360){
    renderer.setSize(350, 300);
    camera.position.set(-30, 80, -300);
  }else{
    camera.position.set(-30, 80, -110);

  }
  // renderer.setSize(window.innerWidth / 2.1, window.innerHeight / 2.5);
  document.body.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  // camera.position.set(-30, 80, -110);
  // controls.enableZoom=false;

  //   var size = 30;
  //   var divisions = 30;

  //   var gridHelper = new THREE.GridHelper(size, divisions, 0x000000, 0x000000);
  //   scene.add(gridHelper);

  controls.update();

//   initGUI();
//   ChangeP();
  loadOBJ_MTL("./models/zapatos2/", "zapatos2.mtl", "zapatos2.obj");
  createLight();
  //   loadOBJ_MTL("../models/botas/", "zapatos.mtl", "zapatos.obj");
  // loadGITF();
  // loadSTL();
}

function addShadowedLight(x, y, z, color, intensity) {
  const directionalLight = new THREE.DirectionalLight(color, intensity);
  directionalLight.position.set(x, y, z);
  scene.add(directionalLight);

  directionalLight.castShadow = true;

  const d = 1;
  directionalLight.shadow.camera.left = -d;
  directionalLight.shadow.camera.right = d;
  directionalLight.shadow.camera.top = d;
  directionalLight.shadow.camera.bottom = -d;

  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 4;

  directionalLight.shadow.bias = -0.002;
}

function createLight(color) {
  //   light = new THREE.DirectionalLight(0xffffff, 0.8, 1000);
  //   light2 = new THREE.DirectionalLight(0xffffff, 0.6, 1000);

  light = new THREE.DirectionalLight(color, 1.0, 1000);
  // move the light back and up a bit
  light.position.set(10, 10, 10);
  // remember to add the light to the scene
  scene.add(light);

  light2 = new THREE.DirectionalLight(color, 1.0, 1000);
  scene.add(light2);
  const sphereSize = 1;
  const pointLightHelper = new THREE.PointLightHelper(light, sphereSize);
  const pointLightHelper2 = new THREE.PointLightHelper(light2, sphereSize);
  // move the light back and up a bit
  light.position.set(10, 10, 10);
  light2.position.set(-10, 10, -10);
  // remember to add the light to the scene
  scene.add(light);
  scene.add(light2);
  // scene.add(pointLightHelper);
  // scene.add(pointLightHelper2);
}
function validar(valor) {
  switch (valor) {
    case "Player 01":
      scene.remove(zapatos);
      scene.remove(thing);
      // zapatos.visible = false;
      // loadOBJ_MTL("./models/botas/", "shoe.mtl", "shoe.obj");
      loadOBJ_MTL_2("./models/zapatos1/", "zapatos1.mtl", "zapatos1.obj");
      
      precio.innerHTML = "$120000";
      break;
    case "Player 02":
      scene.remove(thing);
      scene.remove(zapatos);
      precio.innerHTML = "$150000";
      // loadGITF();
      loadOBJ_MTL("./models/zapatos2/", "zapatos2.mtl", "zapatos2.obj");
      break;
    case "Player 03":
      scene.remove(thing);
      scene.remove(zapatos);
      precio.innerHTML = "$130000";
      // loadGITF();
      loadOBJ_MTL_2("./models/zapatos3/", "zapatos3.mtl", "zapatos3.obj");
      break;
    case "Player 04":
      scene.remove(thing);
      scene.remove(zapatos);
      // loadGITF();
      precio.innerHTML = "$100000";
      loadOBJ_MTL_2("./models/zapatos4/", "zapatos4.mtl", "zapatos4.obj");
      break;
    case "Player 05":
      scene.remove(thing);
      scene.remove(zapatos);
      // loadGITF();
      precio.innerHTML = "$140000";
      loadOBJ_MTL_2("./models/zapatos5/", "zapatos5.mtl", "zapatos5.obj");
      break;
  }
  //   if (valor == "Player 01") {
  //     if (zapatos != null) {
  //       console.log("aqui estamos");
  //       scene.remove(zapatos);
  //       zapatos.visible = false;
  //     }
  //     loadOBJ_MTL("./models/botas/", "shoe.mtl", "shoe.obj");
  //     contador++;
  //   }
  //   if (valor == "Player 02") {
  //     scene.remove(thing);
  //     // loadGITF();
  //     loadOBJ_MTL_2("./models/botas/", "zapatos.mtl", "zapatos.obj");
  //   }
}
// function ChangeP() {
  
//   //   if (param.a == "Player 01") {
//   //     console.log("antes de la condicion");
//   //     if (zapatos != null) {
//   //       console.log("aqui estamos");
//   //       scene.remove(zapatos);
//   //       zapatos.visible = false;
//   //     }
//   //     loadOBJ_MTL("./models/botas/", "shoe.mtl", "shoe.obj");
//   //   }
//   //   if (param.a == "Player 02") {
//   //     scene.remove(thing);
//   //     // loadGITF();
//   //     loadOBJ_MTL_2("./models/botas/", "zapatos.mtl", "zapatos.obj");
//   //   }
// }
// function showModel(b) {
//   if (param.a == "Player 01") {
//     thing.visible = b;
//   }
//   if (param.a == "Player 02") {
//     zapatos.visible = b;
//   }
// }
// function luces() {
//   scene.remove(light);
//   scene.remove(light2);
//   createLight();
// }
function animate() {
  requestAnimationFrame(animate);
  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();
  renderer.render(scene, camera);
}

function onWindowResize() {
  // .... Tra .... Code
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// function initGUI() {
//   var gui = new dat.GUI();

//   gui
//     .add(param, "a", ["Player 01", "Player 02", "Player 03"])
//     .name("3D Model")
//     .onChange(ChangeP);
//   gui.add(param, "b").name("Show Model").onChange(showModel);
//   gui.addColor(param, "c").name("Color Light").onChange(luces);

//   // Change .... To Action
//   // .....
// }
// function loadSTL() {
//   const loader = new THREE.STLLoader();

//   const material = new THREE.MeshPhongMaterial({
//     color: 0x808080,
//     specular: 0x111111,
//   });

//   loader.load("./models/reloj.stl", function (geometry) {
//     const mesh = new THREE.Mesh(geometry, material);

//     mesh.position.set(0, -0.25, 0.6);

//     mesh.scale.set(0.5, 0.5, 0.5);
//     mesh.rotation.y = 0;
//     mesh.rotation.x = 0;
//     mesh.castShadow = true;
//     mesh.receiveShadow = true;
//     mesh.doubleSided = true;

//     scene.add(mesh);
//   });
// }

function loadOBJ_MTL(generalPath, pathMTL, pathOBJ) {
  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.setTexturePath(generalPath);
  mtlLoader.setPath(generalPath);
  mtlLoader.load(pathMTL, function (materials) {
    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath(generalPath);
    objLoader.load(pathOBJ, function (object) {
      modelLoad = object;
      thing = object;
      scene.add(thing); //hize el cambio de nombre
      thing.scale.set(1, 1, 1);
      thing.position.y = 0;
      thing.position.x = 10;

      model = object;
    });
  });
}
function loadOBJ_MTL_2(generalPath, pathMTL, pathOBJ) {
  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.setTexturePath(generalPath);
  mtlLoader.setPath(generalPath);
  mtlLoader.load(pathMTL, function (materials) {
    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath(generalPath);
    objLoader.load(pathOBJ, function (object) {
      modelLoad = object;
      zapatos = object;
      scene.add(zapatos); //hize el cambio de nombre
      zapatos.scale.set(1, 1, 1);
      zapatos.position.y = 0;
      zapatos.position.x = 10;

      model = object;
    });
  });
}
// function loadGITF() {
//   // Instantiate a loader
//   var loader = new THREE.GLTFLoader();

//   // Optional: Provide a DRACOLoader instance to decode compressed mesh data
//   var dracoLoader = new THREE.DRACOLoader();
//   dracoLoader.setDecoderPath("./models/botas/");
//   loader.setDRACOLoader(dracoLoader);

//   // Load a glTF resource
//   loader.load(
//     // resource URL
//     "./models/botas/botas.glb",
//     // called when the resource is loaded
//     function (gltf) {
//       thing2 = gltf.scene;
//       scene.add(gltf.scene);
//       gltf.animations; // Array<THREE.AnimationClip>
//       gltf.scene; // THREE.Scene
//       gltf.scenes; // Array<THREE.Scene>
//       gltf.cameras; // Array<THREE.Camera>
//       gltf.asset; // Object
//       gltf.scene.scale.set(10, 10, 10); // scale here
//       gltf.scene.rotation.y = -(Math.PI / 2);
//     },

//     // called while loading is progressing
//     function (xhr) {
//       console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
//     },
//     // called when loading has errors
//     function (error) {
//       console.log("An error happened");
//     }
//   );
// }
