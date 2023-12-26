import React, { useReducer, useState } from "react";
import RollupForm from "./RollupForm";
import Nav from "../Nav";
import Cube from "./Cube";
import "./model.css";
import Drilldown from "./Drilldown";
import StarNet from "./StarNet";

const initialState = {
  status: null,
  isSlice: false,
  front: false,
  frontData: [],
  left: false,
  leftData: [],
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

    case "left":
      return {
        ...state,
        status: "loadleft",
        left: action.payload,
      };
    case "leftData":
      return { ...state, status: "loadleft", leftData: action.payload };
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
  const [tables, setTables] = useState([]);
  const [measureColumns, setMeasureColumns] = useState([]);
  const [dimensionColumns, setDimensionColumns] = useState([]);
  const [slicedData, setSlicedData] = useState([]);
  // const [isSlice, setIsSlice] = useState(false);
  const [sliceDimensionValue, setSliceDimensionValue] = useState("");
  const [
    { front, left, right, frontData, leftData, rightData, status, isSlice },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <>
      <Nav />
      <div className="app bg-radial-gradient ">
        {/* <RollupForm
          measureTable={measureTable}
          measureColumn={measureColumn}
          measureColumns={measureColumns}
          dimensionTable={dimensionTable}
          dimensionColumn={dimensionColumn}
          dimensionColumns={dimensionColumns}
          tables={tables}
          setDimensionColumn={setDimensionColumn}
          setDimensionColumns={setDimensionColumns}
          setDimensionTable={setDimensionTable}
          setMeasureColumn={setMeasureColumn}
          setMeasureColumns={setMeasureColumns}
          setMeasureTable={setMeasureTable}
          setTables={setTables}
          status={status}
          setResult={setRolledUpData}
          front={front}
          left={left}
          right={right}
          frontData={frontData}
          leftData={leftData}
          rightData={rightData}
          dispatch={dispatch}
        />
        <Drilldown
          measureTable={measureTable}
          measureColumn={measureColumn}
          measureColumns={measureColumns}
          dimensionTable={dimensionTable}
          dimensionColumn={dimensionColumn}
          dimensionColumns={dimensionColumns}
          tables={tables}
          setDimensionColumn={setDimensionColumn}
          setDimensionColumns={setDimensionColumns}
          setDimensionTable={setDimensionTable}
          setMeasureColumn={setMeasureColumn}
          setMeasureColumns={setMeasureColumns}
          setMeasureTable={setMeasureTable}
          setTables={setTables}
          drilldownDimensionValue={drilldownDimensionValue}
          setDrilldownDimensionValue={setDrilldownDimensionValue}
          result={drilldownData}
          setResult={setDrillDownData}
          status={status}
          front={front}
          left={left}
          right={right}
          frontData={frontData}
          leftData={leftData}
          rightData={rightData}
          dispatch={dispatch}
        /> */}
        <StarNet
          measureTable={measureTable}
          measureColumn={measureColumn}
          measureColumns={measureColumns}
          dimensionTable={dimensionTable}
          dimensionColumn={dimensionColumn}
          dimensionColumns={dimensionColumns}
          tables={tables}
          setDimensionColumn={setDimensionColumn}
          setDimensionColumns={setDimensionColumns}
          setDimensionTable={setDimensionTable}
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
          status={status}
          front={front}
          left={left}
          right={right}
          frontData={frontData}
          leftData={leftData}
          rightData={rightData}
          dispatch={dispatch}
        />
        <Cube
          rolledUpData={rolledUpData}
          setRolledUpData={setRolledUpData}
          setDrillDownData={setDrillDownData}
          setSlicedData={setSlicedData}
          isSlice={isSlice}
          front={front}
          left={left}
          right={right}
          dispatch={dispatch}
          frontData={frontData}
          leftData={leftData}
          rightData={rightData}
        />
      </div>
    </>
  );
};

export default Model;
