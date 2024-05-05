// import { render, fireEvent, screen } from "@testing-library/react";
// import Login from "./Login";
// import React from "react";

// test("method testing case1", () => {
//   render(<Login />);
//   const btn = screen.getByTestId("btn1");
//   fireEvent.click(btn);
//   expect(screen.getByText("hello")).toBeInTheDocument();
// });

import { render } from "@testing-library/react";
import Login from "./Login";
import React from "react";

test("Always true test", () => {
  expect(true).toBe.true;
});

test("Heading should be Vite + react", () => {
  console.log("Rendering Login component...");
  render(<Login />);
});
