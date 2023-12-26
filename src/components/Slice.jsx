import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [dimensionTable, setDimensionTable] = useState("");
  const [dimensionColumn, setDimensionColumn] = useState("");
  const [sliceDimensionValue, setSliceDimensionValue] = useState("");
  const [tables, setTables] = useState([]);
  const [dimensionColumns, setDimensionColumns] = useState([]);
  const [slicedData, setSlicedData] = useState([]);

  useEffect(() => {
    // Fetch table names when the component mounts
    axios
      .get("http://localhost:5000/tables")
      .then((response) => setTables(response.data))
      .catch((error) => console.error(error));
  }, []);

  const fetchColumns = (tableName, setColumns) => {
    // Fetch column names for the selected table
    axios
      .get(`http://localhost:5000/columns/${tableName}`)
      .then((response) => setColumns(response.data))
      .catch((error) => console.error(error));
  };

  const handleDimensionTableChange = (table) => {
    setDimensionTable(table);
    setDimensionColumns([]); // Clear dimension columns when changing dimension table
    fetchColumns(table, setDimensionColumns);
  };

  const handleSlice = async () => {
    try {
      const response = await axios.post("http://localhost:5000/slice", {
        dimensionTable,
        dimensionColumn,
        dimensionValue: sliceDimensionValue,
      });

      setSlicedData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>OLAP Slice Operation</h1>

      <div>
        <label>Dimension Table:</label>
        <select
          value={dimensionTable}
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
            <label>Dimension Column:</label>
            <select
              value={dimensionColumn}
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

        {dimensionTable && (
          <div>
            <label>Slice Dimension Value:</label>
            <input
              type="text"
              value={sliceDimensionValue}
              onChange={(e) => setSliceDimensionValue(e.target.value)}
            />
          </div>
        )}

        <button
          onClick={handleSlice}
          disabled={!dimensionTable || !dimensionColumn || !sliceDimensionValue}
        >
          Perform Slice
        </button>
      </div>

      <div>
        <h2>Sliced Result:</h2>
        <ul>
          {slicedData.map((row, index) => (
            <li key={index}>{JSON.stringify(row)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
