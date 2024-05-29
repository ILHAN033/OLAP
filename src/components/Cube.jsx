// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import "./cube.css";
// import "./model.css";

// function generateTable(data) {
//   console.log("generate table function", data);

//   if (!data || data.length === 0) {
//     return null; // Handle empty data case
//   }

//   if (typeof data === "object") {
//     data = [data];
//     console.log("generate table function", data);
//   }

//   const cols = Object.keys(data[0]).length;
//   const rows = data.length;

//   const table = [];
//   for (let i = 0; i < rows; i++) {
//     const row = [];
//     for (let j = 0; j < cols; j++) {
//       // Assuming each object property is unique, you can get the property name dynamically
//       const propertyName = Object.keys(data[i])[j];
//       row.push(<td key={propertyName}>{data[i][propertyName]}</td>);
//     }
//     table.push(<tr key={i}>{row}</tr>);
//   }
//   console.log(table);
//   return table;
// }

// function Cube({
//   dimensionTable,
//   setDrillDownData,
//   setRolledUpData,
//   isSlice,
//   isDice,
//   front,
//   top,
//   right,
//   frontData,
//   topData,
//   rightData,
// }) {
//   const containerRef = useRef(null);
//   const [isMouseDown, setIsMouseDown] = useState(false);
//   const [rotateX, setRotateX] = useState(0);
//   const [rotateY, setRotateY] = useState(0);

//   function getData() {
//     axios.get("http://localhost:8000/api/rollup").then((res) => {
//       setRolledUpData(res.data.rollup);
//       axios.get("http://localhost:8000/drilldown").then((res) => {
//         setDrillDownData(res.data.drilldown);
//       });
//       // console.log(rolledUpData);
//     });
//     // fetch("https://jsonplaceholder.typicode.com/todos")
//     //   .then((res) => res.json())
//     //   .then((data) => {});
//     // // }
//   }
//   const handleMouseDown = () => {
//     setIsMouseDown(true);
//   };

//   const handleMouseUp = () => {
//     setIsMouseDown(false);
//   };

//   // Constants for restricting rotation
//   const maxRotationX = 10;
//   const minRotationX = -150;
//   const maxRotationY = -50; // Adjust as needed
//   const minRotationY = -35; // Adjust as needed

//   // ...

//   const handleMouseMove = (e) => {
//     if (isMouseDown) {
//       const { clientX, clientY } = e;
//       const { offsetWidth, offsetHeight } = containerRef.current;

//       // Calculate rotation in X direction
//       const xPercent = (clientX / offsetWidth - 0.5) * 360;
//       const limitedRotationX = Math.max(
//         minRotationX,
//         Math.min(maxRotationX, xPercent)
//       );
//       setRotateY(limitedRotationX);

//       // Calculate rotation in Y direction
//       const yPercent = (clientY / offsetHeight - 0.5) * 360;
//       const limitedRotationY = Math.max(
//         minRotationY,
//         Math.min(maxRotationY, yPercent)
//       );
//       setRotateX(limitedRotationY);
//     }
//   };

//   // const len = Object.keys(data[0]).length;
//   // console.log(len);
//   useEffect(function () {
//     getData();
//   }, []);

//   return (
//     <div className="mapContainer">
//       {console.log(frontData)}
//       <div
//         className="container"
//         ref={containerRef}
//         onMouseDown={handleMouseDown}
//         onMouseUp={handleMouseUp}
//         onMouseMove={handleMouseMove}
//       >
//         <div
//           className="box"
//           style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}
//         >
//           {isDice || isSlice ? (
//             <div
//               className="card"
//               id="front"
//               style={
//                 isSlice || isDice ? { width: "500px" } : { width: "350px" }
//               }
//             >
//               Front
//               <table>
//                 {console.log("frontData", frontData)}
//                 <tbody>{generateTable(frontData)}</tbody>
//               </table>
//             </div>
//           ) : (
//             <>
//               <div className="card" id="front">
//                 <h3>Front</h3>
//                 {front && (
//                   <>
//                     {/* <span>{dimensionTable}</span> */}
//                     <table>
//                       <tbody>{generateTable(frontData)}</tbody>
//                     </table>
//                   </>
//                 )}
//               </div>
//               <div className="card" id="back">
//                 {/* <table>
//             <tbody>{generateTable(tableRows, tableCols)}</tbody>
//           </table> */}
//               </div>
//               <div className="card" id="left">
//                 {/* left
//                 {left && (
//                   <table>
//                     <tbody>{generateTable(leftData)}</tbody>
//                   </table>
//                 )} */}
//               </div>
//               <div className="card" id="right">
//                 right
//                 {right && (
//                   <table>
//                     <tbody>{generateTable(rightData)}</tbody>
//                   </table>
//                 )}
//               </div>
//               <div className="card" id="top">
//                 top
//                 {top && (
//                   <>
//                     {/* <span>{dimensionTable}</span> */}
//                     <table>
//                       {/* <button
//                       onClick={() => {
//                         console.log(dimensionTable);
//                       }}
//                     >
//                       dim
//                     </button> */}
//                       <tbody>{generateTable(topData)}</tbody>
//                     </table>
//                   </>
//                 )}
//               </div>
//               <div className="card" id="bottom">
//                 bottom
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );

// }
// export default Cube;

// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import "./cube.css";
// import "./model.css";

// function generateTable(data) {
//   if (!data || data.length === 0) {
//     return null; // Handle empty data case
//   }
//   if (!Array.isArray(data)) {
//     data = [data];
//   }
//   console.log("generate table function", data);

//   const cols = Object.keys(data[0]).length;
//   const rows = data.length;

//   const table = [];
//   for (let i = 0; i < rows; i++) {
//     const row = [];
//     for (let j = 0; j < cols; j++) {
//       // Assuming each object property is unique, you can get the property name dynamically
//       const propertyName = Object.keys(data[i])[j];
//       row.push(<td key={propertyName}>{data[i][propertyName]}</td>);
//     }
//     table.push(<tr key={i}>{row}</tr>);
//   }
//   return table;
// }

// function Cube({
//   dimensionTable,
//   setDrillDownData,
//   setRolledUpData,
//   isSlice,
//   isDice,
//   front,
//   top,
//   right,
//   frontData,
//   topData,
//   rightData,
// }) {
//   const containerRef = useRef(null);
//   const [isMouseDown, setIsMouseDown] = useState(false);
//   const [rotateX, setRotateX] = useState(0);
//   const [rotateY, setRotateY] = useState(0);
//   const [data, setData] = useState([]);
//   const [data1, setData1] = useState([]);

//   function getData() {
//     axios.get("http://localhost:8000/api/rollup").then((res) => {
//       setRolledUpData(res.data.rollup);
//       axios.get("http://localhost:8000/drilldown").then((res) => {
//         setDrillDownData(res.data.drilldown);
//       });

//       // console.log(rolledUpData);
//     });

//     fetch("https://jsonplaceholder.typicode.com/todos")
//       .then((res) => res.json())
//       .then((data) => {
//         setData1(data);
//       });
//   }
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
//       const xPercent = (clientX / offsetWidth - 0.8) * 360;
//       const yPercent = (clientY / offsetHeight - 0.8) * 360;

//       setRotateY(xPercent);
//       setRotateX(yPercent);
//     }
//   };

//   // const len = Object.keys(data[0]).length;
//   // console.log(len);
//   useEffect(function () {
//     getData();
//   }, []);

//   return (
//     <div className="mapContainer">
//       {console.log(frontData)}
//       <div
//         className="container"
//         ref={containerRef}
//         onMouseDown={handleMouseDown}
//         onMouseUp={handleMouseUp}
//         onMouseMove={handleMouseMove}
//       >
//         <div
//           className="box"
//           style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}
//         >
//           {isDice || isSlice ? (
//             <div
//               className="card"
//               id="front"
//               style={
//                 isSlice || isDice ? { width: "500px" } : { width: "350px" }
//               }
//             >
//               Front
//               <table>
//                 {console.log("frontData", frontData)}
//                 <tbody>{generateTable(frontData)}</tbody>
//               </table>
//             </div>
//           ) : (
//             <>
//               <div className="card" id="front">
//                 <h3>Front</h3>
//                 {front && (
//                   <>
//                     {/* <span>{dimensionTable}</span> */}
//                     <table>
//                       <tbody>{generateTable(frontData)}</tbody>
//                     </table>
//                   </>
//                 )}
//               </div>
//               <div className="card" id="back">
//                 {/* <table>
//                 <tbody>{generateTable(tableRows, tableCols)}</tbody>
//               </table> */}
//               </div>
//               <div className="card" id="left">
//                 {/* left
//                     {left && (
//                       <table>
//                         <tbody>{generateTable(leftData)}</tbody>
//                       </table>
//                     )} */}
//               </div>
//               <div className="card" id="right">
//                 right
//                 {right && (
//                   <table>
//                     <tbody>{generateTable(rightData)}</tbody>
//                   </table>
//                 )}
//               </div>
//               <div className="card" id="top">
//                 top
//                 {top && (
//                   <>
//                     {/* <span>{dimensionTable}</span> */}
//                     <table>
//                       {/* <button
//                           onClick={() => {
//                             console.log(dimensionTable);
//                           }}
//                         >
//                           dim
//                         </button> */}
//                       <tbody>{generateTable(topData)}</tbody>
//                     </table>
//                   </>
//                 )}
//               </div>
//               <div className="card" id="bottom">
//                 bottom
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Cube;

// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import "./cube.css";
// import "./model.css";

// function generateTable(data) {
//   if (!data || data.length === 0) {
//     return null; // Handle empty data case
//   }
//   if (!Array.isArray(data)) {
//     data = [data];
//   }
//   console.log("generate table function", data);

//   const cols = Object.keys(data[0]).length;
//   const rows = data.length;

//   const table = [];
//   for (let i = 0; i < rows; i++) {
//     const row = [];
//     for (let j = 0; j < cols; j++) {
//       // Assuming each object property is unique, you can get the property name dynamically
//       const propertyName = Object.keys(data[i])[j];
//       row.push(<td key={propertyName}>{data[i][propertyName]}</td>);
//     }
//     table.push(<tr key={i}>{row}</tr>);
//   }
//   return table;
// }

// function Cube({
//   dimensionTable,
//   setDrillDownData,
//   setRolledUpData,
//   isSlice,
//   isDice,
//   front,
//   top,
//   right,
//   frontData,
//   topData,
//   rightData,
// }) {
//   const containerRef = useRef(null);
//   const [isMouseDown, setIsMouseDown] = useState(false);
//   const [initialMouseX, setInitialMouseX] = useState(0);
//   const [initialMouseY, setInitialMouseY] = useState(0);
//   const [rotateX, setRotateX] = useState(0);
//   const [rotateY, setRotateY] = useState(0);
//   const sensitivity = 0.2; // Adjust this value to control sensitivity
//   const minRotateX = -45;
//   const maxRotateX = 45;
//   const minRotateY = -45;
//   const maxRotateY = 45;

//   function getData() {
//     axios.get("http://localhost:8000/api/rollup").then((res) => {
//       setRolledUpData(res.data.rollup);
//       axios.get("http://localhost:8000/drilldown").then((res) => {
//         setDrillDownData(res.data.drilldown);
//       });

//       // console.log(rolledUpData);
//     });

//     fetch("https://jsonplaceholder.typicode.com/todos")
//       .then((res) => res.json())
//       .then((data) => {
//         setData1(data);
//       });
//   }

//   const handleMouseDown = (e) => {
//     setIsMouseDown(true);
//     setInitialMouseX(e.clientX);
//     setInitialMouseY(e.clientY);
//   };

//   const handleMouseUp = () => {
//     setIsMouseDown(false);
//   };

//   const handleMouseMove = (e) => {
//     if (isMouseDown) {
//       const { clientX, clientY } = e;
//       let xDiff = (clientX - initialMouseX) * sensitivity;
//       let yDiff = (clientY - initialMouseY) * sensitivity;

//       // Constrain rotation angles
//       const newRotateX = rotateX + yDiff;
//       const newRotateY = rotateY + xDiff;
//       const constrainedRotateX = Math.max(
//         minRotateX,
//         Math.min(maxRotateX, newRotateX)
//       );
//       const constrainedRotateY = Math.max(
//         minRotateY,
//         Math.min(maxRotateY, newRotateY)
//       );

//       setRotateX(constrainedRotateX);
//       setRotateY(constrainedRotateY);
//       setInitialMouseX(clientX);
//       setInitialMouseY(clientY);
//     }
//   };

//   useEffect(function () {
//     getData();
//   }, []);

//   return (
//     <div className="mapContainer">
//       <div
//         className="container"
//         ref={containerRef}
//         onMouseDown={handleMouseDown}
//         onMouseUp={handleMouseUp}
//         onMouseMove={handleMouseMove}
//       >
//         <div
//           className="box"
//           style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}
//         >
//           {isDice || isSlice ? (
//             <div className="card" id="front">
//               Front
//               <table>
//                 <tbody>{generateTable(frontData)}</tbody>
//               </table>
//             </div>
//           ) : (
//             <>
//               <div className="card" id="front">
//                 <h3>Front</h3>
//                 {front && (
//                   <table>
//                     <tbody>{generateTable(frontData)}</tbody>
//                   </table>
//                 )}
//               </div>
//               <div className="card" id="back">
//                 {/* <table>
//                 <tbody>{generateTable(tableRows, tableCols)}</tbody>
//               </table> */}
//               </div>
//               <div className="card" id="left">
//                 {/* left
//                     {left && (
//                       <table>
//                         <tbody>{generateTable(leftData)}</tbody>
//                       </table>
//                     )} */}
//               </div>
//               <div className="card" id="right">
//                 right
//                 {right && (
//                   <table>
//                     <tbody>{generateTable(rightData)}</tbody>
//                   </table>
//                 )}
//               </div>
//               <div className="card" id="top">
//                 top
//                 {top && (
//                   <table>
//                     <tbody>{generateTable(topData)}</tbody>
//                   </table>
//                 )}
//               </div>
//               <div className="card" id="bottom">
//                 bottom
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Cube;

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./cube.css";
import "./model.css";

// function generateTable(data) {
//   console.log("generate table function", data);

//   if (!data || data.length === 0) {
//     return null; // Handle empty data case
//   }
//   if (!Array.isArray(data)) {
//     data = [data];
//   }
//   console.log("generate table function", data);

//   const cols = Object.keys(data[0]).length;
//   const rows = data.length;

//   const table = [];
//   for (let i = 0; i < rows; i++) {
//     const row = [];
//     for (let j = 0; j < cols; j++) {
//       // Assuming each object property is unique, you can get the property name dynamically
//       const propertyName = Object.keys(data[i])[j];
//       row.push(
//         <td key={propertyName} style={{ fontSize: cols > 2 ? "10px" : "25px" }}>
//           {data[i][propertyName]}
//         </td>
//       );
//     }
//     table.push(<tr key={i}>{row}</tr>);
//   }
//   return table;
// }

function generateTable(data) {
  console.log("generate table function", data);

  if (!data || data.length === 0) {
    return null; // Handle empty data case
  }
  if (!Array.isArray(data)) {
    data = [data];
  }
  console.log("generate table function", data);

  const cols = Object.keys(data[0]).length;
  const rows = data.length;

  const table = [];

  // Create the column headings
  const headings = Object.keys(data[0]).map((key) => (
    <th
      key={key}
      style={{
        fontSize: cols > 2 ? "10px" : "20px",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
      }}
    >
      {key}
    </th>
  ));
  table.push(<tr key="headings">{headings}</tr>);

  // Create the table rows and cells
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      const propertyName = Object.keys(data[i])[j];
      row.push(
        <td key={propertyName} style={{ fontSize: cols > 2 ? "10px" : "20px" }}>
          {data[i][propertyName]}
        </td>
      );
    }
    table.push(<tr key={i}>{row}</tr>);
  }
  return table;
}

function generateTable2(data) {
  console.log("generate table 2 function", data);

  data = Array.isArray(data[0])
    ? data.flat().filter((val) => {
        return val !== null;
      })
    : data;
  console.log("generate table 2 function after", data);

  if (!data || data.length === 0) {
    return null; // Handle empty data case
  }
  if (!Array.isArray(data)) {
    data = [data];
  }
  console.log("generate table function", data);

  const cols = Array.isArray(data) ? data.length : Object.keys(data[0]).length;
  const rows = Array.isArray(data) ? 1 : data.length;
  console.log(cols, rows);

  const table = [];
  const headings = Object.keys(data[0]).map((key) => (
    <th
      key={key}
      style={{
        fontSize: cols > 2 ? "10px" : "20px",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
      }}
    >
      {key}
    </th>
  ));
  table.push(<tr key="headings">{headings}</tr>);
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      // Assuming each object property is unique, you can get the property name dynamically
      const propertyName = Object.keys(data[i])[j];
      row.push(
        <td
          key={Array.isArray(data) ? j + 1 : propertyName}
          style={{ fontSize: cols > 2 ? "10px" : "20px" }}
        >
          {Array.isArray(data) ? data[j] : data[i][propertyName]}
        </td>
      );
    }
    table.push(<tr key={Array.isArray(data) ? i + 1 : i}>{row}</tr>);
  }
  return table;
}

function Cube({
  dimensionTable,
  setDrillDownData,
  setRolledUpData,
  isSlice,
  isDice,
  front,
  top,
  right,
  frontData,
  topData,
  rightData,
}) {
  const containerRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [initialMouseX, setInitialMouseX] = useState(null);
  const [initialMouseY, setInitialMouseY] = useState(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  // const [data, setData] = useState([]);
  // const [data1, setData1] = useState([]);

  // function getData() {
  //   axios.get("http://localhost:8000/api/rollup").then((res) => {
  //     setRolledUpData(res.data.rollup);
  //     axios.get("http://localhost:8000/drilldown").then((res) => {
  //       setDrillDownData(res.data.drilldown);
  //     });
  //   });
  function getData() {
    axios.get("//20.2.249.58:8000/api/rollup").then((res) => {
      setRolledUpData(res.data.rollup);
      axios.get("//20.2.249.58:8000/drilldown").then((res) => {
        setDrillDownData(res.data.drilldown);
      });
    });

    // fetch("https://jsonplaceholder.typicode.com/todos")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setData1(data);
    //   });
  }

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setInitialMouseX(e.clientX);
    setInitialMouseY(e.clientY);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setInitialMouseX(null);
    setInitialMouseY(null);
  };

  const handleMouseMove = (e) => {
    if (isMouseDown) {
      const { clientX, clientY } = e;
      const { offsetWidth, offsetHeight } = containerRef.current;
      const deltaX = ((clientX - initialMouseX) / offsetWidth) * 360;
      const deltaY = ((clientY - initialMouseY) / offsetHeight) * 360;

      setRotateY(rotateY + deltaX);
      setRotateX(rotateX + deltaY);

      setInitialMouseX(clientX);
      setInitialMouseY(clientY);
    }
  };

  useEffect(() => {
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
          {isDice || isSlice ? (
            <div
              className="card"
              id="front"
              style={
                isSlice || isDice ? { width: "500px" } : { width: "350px" }
              }
            >
              Front
              <table>
                <tbody>
                  {isDice ? generateTable(frontData) : generateTable(frontData)}
                </tbody>
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
              </div>
              <div className="card" id="back"></div>
              <div className="card" id="left"></div>
              <div className="card" id="right">
                right
                {right && (
                  <table>
                    <tbody>{generateTable(rightData)}</tbody>
                  </table>
                )}
              </div>
              <div className="card" id="top">
                top
                {top && (
                  <table>
                    <tbody>{generateTable(topData)}</tbody>
                  </table>
                )}
              </div>
              <div className="card" id="bottom">
                bottom
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Cube;
