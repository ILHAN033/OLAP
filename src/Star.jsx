import React, { useEffect, useRef } from "react";
import "./star.css";
import * as d3 from "d3";

const StarQueryModel = () => {
  const svgRef = useRef();

  useEffect(() => {
    const mainDimension = "Product";
    const secondaryDimensions = [
      "Category",
      "Manufacturer",
      "Supplier",
      "Time",
    ];

    const data = [
      {
        [mainDimension]: "Product A",
        Category: "Electronics",
        Manufacturer: "Brand X",
        Supplier: "Supplier 1",
        Time: "2022-01-01",
      },
      {
        [mainDimension]: "Product B",
        Category: "Clothing",
        Manufacturer: "Brand Y",
        Supplier: "Supplier 2",
        Time: "2022-02-15",
      },
      {
        [mainDimension]: "Product C",
        Category: "Electronics",
        Manufacturer: "Brand Z",
        Supplier: "Supplier 1",
        Time: "2022-03-20",
      },
      {
        [mainDimension]: "Product D",
        Category: "Furniture",
        Manufacturer: "Brand W",
        Supplier: "Supplier 3",
        Time: "2022-04-10",
      },
      // ... more data entries
    ];

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const star = d3.symbol().type(d3.symbolStar).size(100);

    const draw = () => {
      const starData = data.map((d, i) => ({
        x: 80 * Math.cos((i / data.length) * 2 * Math.PI),
        y: 80 * Math.sin((i / data.length) * 2 * Math.PI),
        dimensions: [mainDimension, ...secondaryDimensions].map(
          (dim) => d[dim]
        ),
      }));

      // Draw lines connecting footprints
      starData.forEach((d, i) => {
        svg
          .append("line")
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", d.x)
          .attr("y2", d.y)
          .attr("stroke", "#ccc")
          .attr("stroke-width", 2)
          .attr("stroke-opacity", 0.5);
      });

      svg
        .selectAll("path")
        .data(starData)
        .enter()
        .append("path")
        .attr("transform", (d) => `translate(${d.x},${d.y})`)
        .attr("d", star)
        .attr("fill", (_, i) => color(i))
        .on("mouseover", function () {
          d3.select(this).attr("fill", "orange");
        })
        .on("mouseout", function () {
          d3.select(this).attr("fill", (_, i) => color(i));
        });

      svg
        .selectAll("text")
        .data(starData)
        .enter()
        .append("text")
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y)
        .text((d) => d.dimensions[0]) // Display the main dimension label
        .attr("dy", -12) // Offset for better positioning
        .attr("text-anchor", "middle")
        .attr("fill", "#333")
        .style("font-size", "12px");
    };

    draw();
  }, []);

  return (
    <div className="gradient_bg">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default StarQueryModel;
