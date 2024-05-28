import React, { useEffect, useState } from "react";
import axios from "axios";
import "./model.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function StarNet({
  measureTable,
  measureColumn,
  measureColumns,
  dimensionTable,
  dimensionColumn,
  dimensionColumns,
  dimensionTable2,
  dimension2Column,
  dimension2Columns,
  tables,
  setDimensionColumn,
  setDimensionColumns,
  setDimensionTable,
  setDimension2Column,
  setDimension2Columns,
  setDimensionTable2,
  setMeasureColumn,
  setMeasureColumns,
  setMeasureTable,
  setTables,
  isSlice,
  isDice,
  status,
  setResult,
  setSlicedData,
  sliceDimensionValue,
  setSliceDimensionValue,
  setDrillDownData,
  drilldownDimensionValue,
  setDrilldownDimensionValue,
  front,
  top,
  right,
  dispatch,
}) {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [diceData, setDiceData] = useState([]);

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

  const handleDimensionTable2Change = (table) => {
    setDimensionTable2(table);
    setDimension2Columns([]);
    fetchColumns(table, setDimension2Columns);
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

      if (status === "loadtop") {
        top && dispatch({ type: "topData", payload: response.data });
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
  const handleDrilldownDimensionChange = (value) => {
    if (value > 0) {
      setDrilldownDimensionValue(value);
    } else {
      toast.error("Please enter a positive value.");
    }
  };

  const handleDiceDimensionValue = (value, setValue) => {
    if (value && value > 0) {
      setValue(value);
      console.log(value);
    } else {
      toast.error("Please enter a positive value.");
    }
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

      setDrillDownData(response.data);
      if (status === "loadfront") {
        dispatch({ type: "frontData", payload: response.data });
        // dispatch({ type: "front", payload: !front });
      }

      if (status === "loadtop") {
        top && dispatch({ type: "topData", payload: response.data });
      }
      if (status === "loadright") {
        right && dispatch({ type: "rightData", payload: response.data });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSlice = async () => {
    try {
      const response = await axios.post("http://localhost:8000/slice", {
        dimensionTable,
        dimensionColumn,
        dimensionValue: sliceDimensionValue,
      });

      setSlicedData(response.data);
      dispatch({ type: "frontData", payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDice = async () => {
    try {
      const response = await axios.post("http://localhost:8000/Dice", {
        dimensionTable,
        dimensionTable2,
        dimensionColumn,
        dimension2Column,
        value1,
        value2,
      });

      setDiceData(response.data);
      console.log(response.data);
      dispatch({ type: "frontData", payload: response.data });
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

      {/* Dimension 2 */}
      {isDice ? (
        <div>
          <label className="block text-lg font-semibold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mt-2">
            Dimension Table 2
          </label>
          <select
            value={dimensionTable2}
            className="w-full px-4 py-2 mt-1 mb-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            onChange={(e) => handleDimensionTable2Change(e.target.value)}
          >
            <option value="">Select Table</option>
            {tables.map((table) => (
              <option key={table} value={table}>
                {table}
              </option>
            ))}
          </select>

          {dimensionTable2 && (
            <div>
              <label className="block text-lg font-semibold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mt-2">
                Dimension Column
              </label>
              <select
                value={dimension2Column}
                className="w-full px-4 py-2 mt-1 mb-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                onChange={(e) => setDimension2Column(e.target.value)}
              >
                <option value="">Select Column</option>
                {dimension2Columns.map((column) => (
                  <option key={column} value={column}>
                    {column}
                  </option>
                ))}
              </select>
            </div>
          )}
          <label className="block text-lg font-semibold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mt-2">
            Dice Dimension 1 Value
          </label>
          <input
            type="text"
            className="text-black"
            value={value1}
            onChange={(e) =>
              handleDiceDimensionValue(e.target.value, setValue1)
            }
          />
          <label className="block text-lg font-semibold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mt-2">
            Dice Dimension 2 Value
          </label>
          <input
            type="text"
            className="text-black"
            value={value2}
            onChange={(e) =>
              handleDiceDimensionValue(e.target.value, setValue2)
            }
          />
        </div>
      ) : null}
      <label className="block text-lg font-semibold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mt-2">
        Drilldown Dimension Value
      </label>
      <input
        type="text"
        className="text-black"
        value={drilldownDimensionValue}
        onChange={(e) => handleDrilldownDimensionChange(e.target.value)}
      />
      {dimensionTable && (
        <div>
          <label className="block text-lg font-semibold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mt-2 ">
            Slice Dimension Value
          </label>
          <input
            type="text"
            className="text-black"
            value={sliceDimensionValue}
            onChange={(e) => setSliceDimensionValue(e.target.value)}
          />
        </div>
      )}
      <button
        onClick={handleSlice}
        className="bg-orange-500 mt-5 "
        disabled={!dimensionTable || !dimensionColumn || !sliceDimensionValue}
      >
        Perform Slice
      </button>
      <button
        className="bg-orange-500 mt-5 "
        onClick={handleRollup}
        disabled={
          !measureTable || !measureColumn || !dimensionTable || !dimensionColumn
        }
      >
        Perform Rollup
      </button>
      <button
        onClick={handleDrilldown}
        className="bg-orange-500 mt-5 "
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
      <button
        onClick={handleDice}
        className="bg-orange-500 mt-5 "
        disabled={
          !measureTable ||
          !measureColumn ||
          !dimensionTable ||
          !dimensionColumn ||
          !dimensionTable2 ||
          !value1 ||
          !value2
        }
      >
        Perform Dice
      </button>

      <div className="flex flex-col gap-5  mt-3">
        {!isDice ? (
          !isSlice ? (
            <>
              <div className="flex justify-between">
                <label className="ml-2 text-white bg-gradient-to-r from-orange-400 to-orange-600 py-1 px-2  rounded-md">
                  Front
                </label>
                <input
                  type="checkbox"
                  disabled={front}
                  checked={front}
                  className=" h-5 w-5"
                  value={front}
                  onChange={() => {
                    dispatch({ type: "front", payload: !front });
                  }}
                />
              </div>

              <div className="flex justify-between">
                <label className="ml-2 text-white bg-gradient-to-r from-orange-400 to-orange-600 py-1 px-2 rounded-md">
                  Top
                </label>
                <input
                  type="checkbox"
                  className=" h-5 w-5"
                  checked={top}
                  disabled={top}
                  value={top}
                  onChange={() => {
                    dispatch({ type: "top", payload: !top });
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
                  checked={right}
                  disabled={right}
                  value={right}
                  onChange={() => {
                    dispatch({ type: "right", payload: !right });
                  }}
                />
              </div>
            </>
          ) : null
        ) : null}
        {!isDice ? (
          <div className="flex justify-between">
            <label className="ml-2 text-white bg-gradient-to-r from-orange-400 to-orange-600 py-1 px-2 rounded-md">
              Slice
            </label>
            <input
              type="checkbox"
              className=" h-5 w-5"
              disabled={isSlice}
              value={isSlice}
              checked={isSlice}
              onChange={() => {
                dispatch({ type: "slice", payload: !isSlice });
              }}
            />
          </div>
        ) : null}
        {!isSlice ? (
          <div className="flex justify-between">
            <label className="ml-2 text-white bg-gradient-to-r from-orange-400 to-orange-600 py-1 px-2 rounded-md">
              Dice
            </label>
            <input
              type="checkbox"
              className=" h-5 w-5"
              disabled={isDice}
              value={isDice}
              checked={isDice}
              onChange={() => {
                dispatch({ type: "dice", payload: !isDice });
              }}
            />
          </div>
        ) : null}
        <button
          className=" hover:bg-gradient-to-r from-orange-400 to-orange-600"
          onClick={() => dispatch({ type: "reset" })}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default StarNet;
