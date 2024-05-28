import React, { useReducer, useState } from "react";
import Cube from "./Cube";
import "./model.css";
import StarNet from "./StarNet";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  status: null,
  isSlice: false,
  isDice: false,
  front: false,
  frontData: [],
  top: false,
  topData: [],
  right: false,
  rightData: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "front":
      return {
        ...state,
        status: "loadfront",
        front: action.payload,
      };
    case "frontData":
      return { ...state, status: "loadfront", frontData: action.payload };

    case "top":
      return {
        ...state,
        status: "loadtop",
        top: action.payload,
      };
    case "topData":
      return { ...state, status: "loadtop", topData: action.payload };

    case "right":
      return {
        ...state,
        status: "loadright",
        right: action.payload,
      };
    case "rightData":
      return { ...state, status: "loadright", rightData: action.payload };

    case "slice":
      return { ...state, isSlice: action.payload };

    case "dice":
      return { ...state, isDice: action.payload };

    case "reset":
      return { initialState };
  }
}

const Model = () => {
  const [rolledUpData, setRolledUpData] = useState([]);
  const [drilldownDimensionValue, setDrilldownDimensionValue] = useState("");
  const [drilldownData, setDrillDownData] = useState([]);
  const [measureTable, setMeasureTable] = useState("");
  const [measureColumn, setMeasureColumn] = useState("");
  const [dimensionTable, setDimensionTable] = useState("");
  const [dimensionColumn, setDimensionColumn] = useState("");
  const [dimensionTable2, setDimensionTable2] = useState("");
  const [dimension2Column, setDimension2Column] = useState("");
  const [tables, setTables] = useState([]);
  const [measureColumns, setMeasureColumns] = useState([]);
  const [dimensionColumns, setDimensionColumns] = useState([]);
  const [dimension2Columns, setDimension2Columns] = useState([]);
  const [slicedData, setSlicedData] = useState([]);
  // const [isSlice, setIsSlice] = useState(false);
  const [sliceDimensionValue, setSliceDimensionValue] = useState("");
  const [
    {
      front,
      top,
      right,
      frontData,
      topData,
      rightData,
      status,
      isSlice,
      isDice,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <>
      <div className="app bg-radial-gradient ">
        <StarNet
          measureTable={measureTable}
          measureColumn={measureColumn}
          measureColumns={measureColumns}
          dimensionTable={dimensionTable}
          dimensionTable2={dimensionTable2}
          dimensionColumn={dimensionColumn}
          dimensionColumns={dimensionColumns}
          dimension2Column={dimension2Column}
          dimension2Columns={dimension2Columns}
          tables={tables}
          setDimensionColumn={setDimensionColumn}
          setDimensionColumns={setDimensionColumns}
          setDimension2Column={setDimension2Column}
          setDimension2Columns={setDimension2Columns}
          setDimensionTable={setDimensionTable}
          setDimensionTable2={setDimensionTable2}
          setMeasureColumn={setMeasureColumn}
          setMeasureColumns={setMeasureColumns}
          setMeasureTable={setMeasureTable}
          sliceDimensionValue={sliceDimensionValue}
          setSliceDimensionValue={setSliceDimensionValue}
          setTables={setTables}
          drilldownDimensionValue={drilldownDimensionValue}
          setDrilldownDimensionValue={setDrilldownDimensionValue}
          setDrillDownData={setDrillDownData}
          setSlicedData={setSlicedData}
          result={rolledUpData}
          setResult={setRolledUpData}
          isSlice={isSlice}
          isDice={isDice}
          status={status}
          front={front}
          top={top}
          right={right}
          frontData={frontData}
          topData={topData}
          rightData={rightData}
          dispatch={dispatch}
        />
        <Cube
          rolledUpData={rolledUpData}
          setRolledUpData={setRolledUpData}
          setDrillDownData={setDrillDownData}
          setSlicedData={setSlicedData}
          dimensionTable={dimensionTable}
          isSlice={isSlice}
          isDice={isDice}
          front={front}
          top={top}
          right={right}
          dispatch={dispatch}
          frontData={frontData}
          topData={topData}
          rightData={rightData}
        />
      </div>
    </>
  );
};

export default Model;
