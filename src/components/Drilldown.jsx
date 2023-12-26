// Import necessary modules

import React, { useState, useEffect } from "react";
import axios from "axios";

function Drilldown({
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
  drilldownDimensionValue,
  setDrilldownDimensionValue,
  setResult,
  status,
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

  const handleDrilldownDimensionChange = (value) => {
    setDrilldownDimensionValue(value);
  };

  const handleDrilldown = async () => {
    try {
      const response = await axios.post("http://localhost:8000/drilldown", {
        measureTable,
        measureColumn,
        dimensionTable,
        dimensionColumn,
        drilldownDimensionValue,
      });

      setResult(response.data);
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div>
        <label>Drilldown Dimension Value:</label>
        <input
          type="text"
          value={drilldownDimensionValue}
          onChange={(e) => handleDrilldownDimensionChange(e.target.value)}
        />
      </div>

      <button
        onClick={handleDrilldown}
        className="bg-orange-500 mt-5"
        disabled={
          !measureTable ||
          !measureColumn ||
          !dimensionTable ||
          !dimensionColumn ||
          !drilldownDimensionValue
        }
      >
        Perform Drilldown
      </button>
    </div>
  );
}

export default Drilldown;
