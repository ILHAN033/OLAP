// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function App() {
//   const [measureTable, setMeasureTable] = useState("");
//   const [measureColumn, setMeasureColumn] = useState("");
//   const [dimensionTable, setDimensionTable] = useState("");
//   const [dimensionColumn, setDimensionColumn] = useState("");
//   const [tables, setTables] = useState([]);
//   const [columns, setColumns] = useState([]);
//   const [result, setResult] = useState([]);

//   useEffect(() => {
//     // Fetch table names when the component mounts
//     axios
//       .get("http://localhost:8000/tables")
//       .then((response) => setTables(response.data))
//       .catch((error) => console.error(error));
//   }, []);

//   const fetchColumns = (tableName) => {
//     // Fetch column names for the selected table
//     axios
//       .get(`http://localhost:8000/columns/${tableName}`)
//       .then((response) => setColumns(response.data))
//       .catch((error) => console.error(error));
//   };

//   const handleRollup = async () => {
//     try {
//       const response = await axios.post("http://localhost:8000/rollup", {
//         measureTable,
//         measureColumn,
//         dimensionTable,
//         dimensionColumn,
//       });

//       setResult(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>OLAP Rollup Example</h1>

//       <div>
//         <label>Measure Table:</label>
//         <select
//           value={measureTable}
//           onChange={(e) => {
//             setMeasureTable(e.target.value);
//             fetchColumns(e.target.value);
//           }}
//         >
//           <option value="">Select Table</option>
//           {tables.map((table) => (
//             <option key={table} value={table}>
//               {table}
//             </option>
//           ))}
//         </select>

//         {measureTable && (
//           <div>
//             <label>Measure Column:</label>
//             <select
//               value={measureColumn}
//               onChange={(e) => setMeasureColumn(e.target.value)}
//             >
//               <option value="">Select Column</option>
//               {columns.map((column) => (
//                 <option key={column} value={column}>
//                   {column}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}
//       </div>

//       <div>
//         <label>Dimension Table:</label>
//         <select
//           value={dimensionTable}
//           onChange={(e) => {
//             setDimensionTable(e.target.value);
//             fetchColumns(e.target.value);
//           }}
//         >
//           <option value="">Select Table</option>
//           {tables.map((table) => (
//             <option key={table} value={table}>
//               {table}
//             </option>
//           ))}
//         </select>

//         {dimensionTable && (
//           <div>
//             <label>Dimension Column:</label>
//             <select
//               value={dimensionColumn}
//               onChange={(e) => setDimensionColumn(e.target.value)}
//             >
//               <option value="">Select Column</option>
//               {columns.map((column) => (
//                 <option key={column} value={column}>
//                   {column}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}
//       </div>

//       <button
//         onClick={handleRollup}
//         disabled={
//           !measureTable || !measureColumn || !dimensionTable || !dimensionColumn
//         }
//       >
//         Perform Rollup
//       </button>

//       <div>
//         <h2>Result:</h2>
//         <ul>
//           {result.map((row, index) => (
//             <li key={index}>
//               {row.Dimension}: {row.Total}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default App;

// final

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./model.css";

function RollupForm({
  measureTable,
  measureColumn,
  measureColumns,
  dimensionTable,
  dimensionColumn,
  dimensionColumns,
  tables,
  setDimensionColumn,
  setDimensionColumns,
  setDimensionTable,
  setMeasureColumn,
  setMeasureColumns,
  setMeasureTable,
  setTables,
  status,
  setResult,
  front,
  left,
  right,
  dispatch,
}) {
  useEffect(() => {
    // Fetch table names when the component mounts
    axios
      .get("http://localhost:8000/tables")
      .then((response) => setTables(response.data))
      .catch((error) => console.error(error));
  }, []);

  const fetchColumns = (tableName, setColumns) => {
    // Fetch column names for the selected table
    axios
      .get(`http://localhost:8000/columns/${tableName}`)
      .then((response) => setColumns(response.data))
      .catch((error) => console.error(error));
  };

  const handleMeasureTableChange = (table) => {
    setMeasureTable(table);
    setMeasureColumns([]); // Clear measure columns when changing measure table
    fetchColumns(table, setMeasureColumns);
  };

  const handleDimensionTableChange = (table) => {
    setDimensionTable(table);
    setDimensionColumns([]); // Clear dimension columns when changing dimension table
    fetchColumns(table, setDimensionColumns);
  };

  const handleRollup = async () => {
    try {
      const response = await axios.post("http://localhost:8000/rollup", {
        measureTable,
        measureColumn,
        dimensionTable,
        dimensionColumn,
      });

      setResult(response.data);
      // console.log(result);
      if (status === "loadfront") {
        dispatch({ type: "frontData", payload: response.data });
        // dispatch({ type: "front", payload: !front });
      }

      if (status === "loadleft") {
        left && dispatch({ type: "leftData", payload: response.data });
      }
      if (status === "loadright") {
        right && dispatch({ type: "rightData", payload: response.data });
      }
      // console.log("front", frontData);
      // console.log("left", leftData);
      // console.log("right", rightData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (dimensionTable) {
      fetchColumns(dimensionTable, setDimensionColumns);
    }
  }, [dimensionTable]);

  return (
    <div className="sidebar overflow-auto">
      <h1 className="text-2xl font-bold mb-4">OLAP Operations</h1>

      <div>
        <label className="block text-lg font-semibold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mt-2">
          Measure Table
        </label>
        <select
          value={measureTable}
          className="w-full px-4 py-2 mt-1 mb-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          onChange={(e) => handleMeasureTableChange(e.target.value)}
        >
          <option value="">Select Table</option>
          {tables.map((table) => (
            <option key={table} value={table}>
              {table}
            </option>
          ))}
        </select>

        {measureTable && (
          <div>
            <label className="block text-lg font-semibold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mt-2">
              Measure Column
            </label>
            <select
              value={measureColumn}
              className="w-full px-4 py-2 mt-1 mb-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e) => setMeasureColumn(e.target.value)}
            >
              <option value="">Select Column</option>
              {measureColumns.map((column) => (
                <option key={column} value={column}>
                  {column}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div>
        <label className="block text-lg font-semibold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mt-2">
          Dimension Table
        </label>
        <select
          value={dimensionTable}
          className="w-full px-4 py-2 mt-1 mb-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          onChange={(e) => handleDimensionTableChange(e.target.value)}
        >
          <option value="">Select Table</option>
          {tables.map((table) => (
            <option key={table} value={table}>
              {table}
            </option>
          ))}
        </select>

        {dimensionTable && (
          <div>
            <label className="block text-lg font-semibold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mt-2">
              Dimension Column
            </label>
            <select
              value={dimensionColumn}
              className="w-full px-4 py-2 mt-1 mb-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e) => setDimensionColumn(e.target.value)}
            >
              <option value="">Select Column</option>
              {dimensionColumns.map((column) => (
                <option key={column} value={column}>
                  {column}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <button
        className="bg-orange-500 mt-5"
        onClick={handleRollup}
        disabled={
          !measureTable || !measureColumn || !dimensionTable || !dimensionColumn
        }
      >
        Perform Rollup
      </button>

      <div className="flex flex-col gap-5  mt-3">
        <div className="flex justify-between">
          <label className="ml-2 text-white bg-gradient-to-r from-orange-400 to-orange-600 py-1 px-2  rounded-md">
            Front
          </label>
          <input
            type="checkbox"
            disabled={front}
            className=" h-5 w-5"
            value={front}
            onChange={() => {
              dispatch({ type: "front", payload: !front });
            }}
          />
        </div>
        {/* {front && <p>Front</p>} */}
        <div className="flex justify-between">
          <label className="ml-2 text-white bg-gradient-to-r from-orange-400 to-orange-600 py-1 px-2 rounded-md">
            Left
          </label>
          <input
            type="checkbox"
            className=" h-5 w-5"
            disabled={left}
            value={left}
            onChange={() => {
              dispatch({ type: "left", payload: !left });
            }}
          />
        </div>
        <div className="flex justify-between">
          <label className="ml-2 text-white bg-gradient-to-r from-orange-400 to-orange-600 py-1 px-2 rounded-md">
            Right
          </label>
          <input
            type="checkbox"
            className=" h-5 w-5"
            disabled={right}
            value={right}
            onChange={() => {
              dispatch({ type: "right", payload: !right });
            }}
          />
        </div>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      </div>
    </div>
  );
}

export default RollupForm;
