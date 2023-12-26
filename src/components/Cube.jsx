// import React, { useRef } from "react";
// import { Canvas, useFrame, useLoader } from "@react-three/fiber";
// import { TextureLoader } from "three/src/loaders/TextureLoader";
// import styles from "./cube.module.scss";
// import { OrbitControls } from "@react-three/drei";
// import { Mesh } from 'react-three-fiber';

// export default function index() {
//   return (
//     <div className={styles.main}>
//       <div className={styles.cube}>
//         <Canvas>
//           <ambientLight intensity={2} />
//           <directionalLight position={[2, 1, 1]} />
//           <Cube />
//         </Canvas>
//       </div>
//     </div>
//   );
// }

// function Cube() {
//   const mesh = useRef(null);

//   useFrame((state, delta) => {
//     mesh.current.rotation.x += delta * 0.15;
//     mesh.current.rotation.y += delta * 0.15;
//     mesh.current.rotation.z += delta * 0.15;
//   });

//   //   const texture_1 = useLoader(TextureLoader, "/assets/blog01.png");
//   //   const texture_2 = useLoader(TextureLoader, "/assets/blog02.png");
//   //   const texture_3 = useLoader(TextureLoader, "/assets/blog03.png");
//   //   const texture_4 = useLoader(TextureLoader, "/assets/blog04.png");
//   //   const texture_5 = useLoader(TextureLoader, "/assets/blog05.png");
//   //   const texture_6 = useLoader(TextureLoader, "/assets/logo.png");

//   return (
//     <>
//       <mesh ref={mesh}>
//         <boxGeometry args={[2.5, 2.5, 2.5]} />
//         <meshStandardMaterial attach="material-0" />
//         <meshStandardMaterial attach="material-1" />
//         <meshStandardMaterial attach="material-2" />
//         <meshStandardMaterial attach="material-3" />
//         <meshStandardMaterial attach="material-4" />
//         <meshStandardMaterial attach="material-5" />
//       </mesh>

//       <div className={styles.main}>
//         <div className={styles.cube}>
//           <Canvas>
//             <OrbitControls enableZoom={false} enablePan={false} />
//             <ambientLight intensity={2} />
//             <directionalLight position={[2, 1, 1]} />
//             <Cube />
//           </Canvas>
//         </div>
//       </div>
//     </>
//   );
// }

// V2
// import React, { useEffect, useRef } from "react";
// import { Canvas, useLoader } from "@react-three/fiber";
// import { TextureLoader } from "three/src/loaders/TextureLoader";
// import styles from "./cube.module.scss";
// import { OrbitControls } from "@react-three/drei";
// import {
//   useMotionValue,
//   useSpring,
//   useScroll,
//   useTransform,
// } from "framer-motion";
// import { motion } from "framer-motion-3d";

// export default function index() {
//   const container = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: container,
//     offset: ["start start", "end end"],
//   });
//   const progress = useTransform(scrollYProgress, [0, 1], [0, 5]);
//   const smoothProgress = useSpring(progress, { damping: 20 });

//   return (
//     <div ref={container} className={styles.main}>
//       <div className={styles.cube}>
//         <Canvas>
//           <OrbitControls enableZoom={false} enablePan={false} />
//           <ambientLight intensity={2} />
//           <directionalLight position={[2, 1, 1]} />
//           <Cube progress={smoothProgress} />
//         </Canvas>
//       </div>
//     </div>
//   );
// }

// function Cube({ progress }) {
//   const mesh = useRef(null);

//   // const options = {
//   //     damping: 20
//   // }

//   // const mouse = {
//   //     x: useSpring(useMotionValue(0), options),
//   //     y: useSpring(useMotionValue(0), options)
//   // }

//   // const manageMouseMove = (e) => {
//   //     const { innerWidth, innerHeight } = window;
//   //     const { clientX, clientY } = e;
//   //     const x = -0.5 + (clientX / innerWidth)
//   //     const y = -0.5 + (clientY / innerHeight)
//   //     mouse.x.set(x);
//   //     mouse.y.set(y);
//   // }

//   // useEffect( () => {
//   //     window.addEventListener("mousemove", manageMouseMove)

//   //     return () => window.removeEventListener("mouse", manageMouseMove);
//   // }, [])

//   const texture_1 = useLoader(TextureLoader, "/1.jpg");
//   //   const texture_2 = useLoader(TextureLoader, "/assets/2.jpg");
//   //   const texture_3 = useLoader(TextureLoader, "/assets/3.jpg");
//   //   const texture_4 = useLoader(TextureLoader, "/assets/4.jpg");
//   //   const texture_5 = useLoader(TextureLoader, "/assets/5.jpg");
//   //   const texture_6 = useLoader(TextureLoader, "/assets/6.jpg");

//   return (
//     <motion.mesh ref={mesh} rotation-y={progress} rotation-x={progress}>
//       <boxGeometry args={[2.5, 2.5, 2.5]} />
//       <meshStandardMaterial map={texture_1} attach="material-0" />
//       <meshStandardMaterial attach="material-1" />
//       <meshStandardMaterial attach="material-2" />
//       <meshStandardMaterial attach="material-3" />
//       <meshStandardMaterial attach="material-4" />
//       <meshStandardMaterial attach="material-5" />
//     </motion.mesh>
//   );
// }

// import React, { useRef, useState } from "react";
// import { Canvas, useLoader } from "@react-three/fiber";
// import { TextureLoader } from "three/src/loaders/TextureLoader";
// import { OrbitControls, Html } from "@react-three/drei";
// import { useScroll, useSpring, useTransform } from "framer-motion";
// import { motion } from "framer-motion-3d";
// import Nav from "../Nav";
// import StarQueryModel from "../Star";
// import styles from "./cube.module.scss";

// export default function Index() {
//   const container = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: container,
//     offset: ["start start", "end end"],
//   });
//   const progress = useTransform(scrollYProgress, [0, 1], [0, 5]);
//   const smoothProgress = useSpring(progress, { damping: 20 });

//   return (
//     <>
//       <Nav />
//       <StarQueryModel />
//       <div ref={container} className="main">
//         <div className="gradient_bg h-screen">
//           <Canvas>
//             <OrbitControls enableZoom={false} enablePan={false} />
//             <ambientLight intensity={2} />
//             <directionalLight position={[2, 1, 1]} />
//             <Cube progress={smoothProgress} />
//           </Canvas>
//         </div>
//       </div>
//     </>
//   );
// }

// function Cube({ progress }) {
//   const mesh = useRef(null);
//   const texture_1 = useLoader(TextureLoader, "/sales.png");
//   const [inputValue, setInputValue] = useState("Enter...");

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   return (
//     <motion.group ref={mesh} rotation-y={progress} rotation-x={progress}>
//       <mesh>
//         <boxGeometry args={[3, 3, 3]} />
//         {/* <meshStandardMaterial map={texture_1} attach="material-0" />
//         <meshStandardMaterial map={texture_1} attach="material-1" />
//         <meshStandardMaterial map={texture_1} attach="material-2" />
//         <meshStandardMaterial map={texture_1} attach="material-3" />
//         <meshStandardMaterial map={texture_1} attach="material-4" />
//         <meshStandardMaterial map={texture_1} attach="material-5" /> */}
//         <meshStandardMaterial attach="material-0" />
//         <meshStandardMaterial attach="material-1" />
//         <meshStandardMaterial attach="material-2" />
//         <meshStandardMaterial attach="material-3" />
//         <meshStandardMaterial attach="material-4" />
//         <meshStandardMaterial attach="material-5" />
//       </mesh>
//       <Html
//         position={[0, 1, 0]} // Adjust the Z position to bring it closer to the cube
//         transform
//       >
//         <div>
//           <table width={"10px"}>
//             <tr>
//               <th>Person 1</th>
//               <th>Person 2</th>
//               <th>Person 3</th>
//             </tr>
//             <tr>
//               <td>Emil</td>
//               <td>Tobias</td>
//               <td>Linus</td>
//             </tr>
//             <tr>
//               <td>16</td>
//               <td>14</td>
//               <td>10</td>
//             </tr>
//           </table>
//         </div>
//       </Html>
//     </motion.group>
//   );
// }

// import "./cube.css";

// function Cube() {
//   return (
//     <div className="container">
//       <div className="box">
//         <div className="card" id="front">
//           front
//         </div>
//         <div className="card" id="back">
//           back
//         </div>
//         <div className="card" id="left">
//           left
//         </div>
//         <div className="card" id="right">
//           right
//         </div>
//         <div className="card" id="top">
//           top
//         </div>
//         <div className="card" id="bottom">
//           bottom
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Cube;

// import React, { useRef, useState } from "react";
// import "./cube.css";

// function Cube() {
//   const containerRef = useRef(null);
//   const [isMouseDown, setIsMouseDown] = useState(false);
//   const [rotateX, setRotateX] = useState(0);
//   const [rotateY, setRotateY] = useState(0);

//   const handleMouseDown = () => {
//     setIsMouseDown(true);
//   };

//   const handleMouseUp = () => {
//     setIsMouseDown(false);
//   };

//   const handleMouseMove = (e) => {
//     if (isMouseDown) {
//       const { clientX, clientY } = e;
//       const { offsetWidth, offsetHeight } = containerRef.current;
//       const xPercent = (clientX / offsetWidth - 0.5) * 360;
//       const yPercent = (clientY / offsetHeight - 0.5) * 360;

//       setRotateY(xPercent);
//       setRotateX(yPercent);
//     }
//   };

//   return (
//     <div
//       className="container"
//       ref={containerRef}
//       onMouseDown={handleMouseDown}
//       onMouseUp={handleMouseUp}
//       onMouseMove={handleMouseMove}
//     >
//       <div
//         className="box"
//         style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}
//       >
//         <div className="card" id="front">
//           Front
//         </div>
//         <div className="card" id="back">
//           back
//         </div>
//         <div className="card" id="left">
//           left
//         </div>
//         <div className="card" id="right">
//           right
//         </div>
//         <div className="card" id="top">
//           top
//         </div>
//         <div className="card" id="bottom">
//           bottom
//         </div>
//       </div>
//     </div>
//   );
// }

// Second final
// const data = [
//   { name: "a", value: "1", price: "3434" },
//   { name: "b", value: "2", price: "3434" },
//   { name: "r", value: "3", price: "3434" },
//   { name: "d", value: "4", price: "3434" },
//   { name: "o", value: "5", price: "3434" },
//   { name: "u", value: "6", price: "3434" },
//   { name: "c", value: "7", price: "3434" },
//   { name: "t", value: "8", price: "3434" },
// ];

// function generateTable(rows, cols) {
//   document.documentElement.style.setProperty("--rows", rows);
//   document.documentElement.style.setProperty("--columns", cols);
//   // console.log(Object.keys(data[0]).length);
//   const table = [];
//   for (let i = 0; i < rows; i++) {
//     const row = [];
//     for (let j = 0; j < cols; j++) {
//       row.push(<td key={j}>{data[i].name}</td>);
//     }
//     table.push(<tr key={i}>{row}</tr>);
//   }
//   return table;

// const table = [];
// data.map((_, i) => {
//   const row = [];
//   data.map((item, j) => {
//     row.push(<td key={j}>{item.name}</td>);
//     console.log(row);
//   });

//   table.push(<tr key={i}>{row}</tr>);
// });

// return table;}

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./cube.css";
import "./model.css";
import { dispatch } from "d3";

function generateTable(data) {
  if (!data || data.length === 0) {
    return null; // Handle empty data case
  }

  const cols = Object.keys(data[0]).length;
  const rows = data.length;

  const table = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      // Assuming each object property is unique, you can get the property name dynamically
      const propertyName = Object.keys(data[i])[j];
      row.push(<td key={propertyName}>{data[i][propertyName]}</td>);
    }
    table.push(<tr key={i}>{row}</tr>);
  }
  return table;
}

function Cube({
  setDrillDownData,
  rolledUpData,
  setRolledUpData,
  isSlice,
  setIsSlicedData,
  front,
  left,
  right,
  frontData,
  leftData,
  rightData,
  dispatch,
}) {
  const containerRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

  function getData() {
    axios.get("http://localhost:8000/api/rollup").then((res) => {
      setRolledUpData(res.data.rollup);
      axios.get("http://localhost:8000/drilldown").then((res) => {
        setDrillDownData(res.data.drilldown);
      });

      // console.log(rolledUpData);
    });

    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        setData1(data);
      });
  }
  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e) => {
    if (isMouseDown) {
      const { clientX, clientY } = e;
      const { offsetWidth, offsetHeight } = containerRef.current;
      const xPercent = (clientX / offsetWidth - 0.8) * 360;
      const yPercent = (clientY / offsetHeight - 0.8) * 360;

      setRotateY(xPercent);
      setRotateX(yPercent);
    }
  };

  // const len = Object.keys(data[0]).length;
  // console.log(len);
  useEffect(function () {
    getData();
  }, []);

  return (
    <div className="mapContainer">
      <div
        className="container"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div
          className="box"
          style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}
        >
          {isSlice ? (
            <div className="card" id="front">
              <h3>Front</h3>
              <table>
                <tbody>{generateTable(frontData)}</tbody>
              </table>
            </div>
          ) : (
            <>
              <div className="card" id="front">
                <h3>Front</h3>
                {front && (
                  <table>
                    <tbody>{generateTable(frontData)}</tbody>
                  </table>
                )}
                {/* <table>
              <tbody>{generateTable(rolledUpData)}</tbody>
            </table> */}
              </div>
              <div className="card" id="back">
                {/* <table>
            <tbody>{generateTable(tableRows, tableCols)}</tbody>
          </table> */}
              </div>
              <div className="card" id="left">
                left
                {left && (
                  <table>
                    <tbody>{generateTable(leftData)}</tbody>
                  </table>
                )}
              </div>
              <div className="card" id="right">
                right
                {right && (
                  <table>
                    <tbody>{generateTable(rightData)}</tbody>
                  </table>
                )}
                {/* <table>
            <tbody>{generateTable(tableRows, tableCols)}</tbody>
          </table> */}
              </div>
              <div className="card" id="top">
                top
                {/* <table>
            <tbody>{generateTable(tableRows, tableCols)}</tbody>
          </table> */}
              </div>
              <div className="card" id="bottom">
                bottom
                {/* <table>
            <tbody>{generateTable(tableRows, tableCols)}</tbody>
          </table> */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Cube;
