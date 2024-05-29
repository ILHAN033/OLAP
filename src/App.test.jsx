import { render, screen } from "@testing-library/react";
import App from "./App";
import { describe } from "vitest";

describe("App", () => {
  test("should have heading AnalytiCube", () => {
    render(<App />);
    const appTitle = screen.getByText(/AnalytiCube/i);
    expect(appTitle).toBeInTheDocument();
  });
});
