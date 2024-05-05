const express = require("express");
const cors = require("cors");
const sql = require("mssql");
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Configure SQL Server connection
const config = {
  user: "ILHAN",
  password: "12345678",
  server: "DESKTOP-QUE9RU4",
  database: "SalesDB1",
  options: {
    trustedconnection: true,
    enableArithAbort: true,
    instancename: "DBSERVER",
    trustServerCertificate: true,
  },
  port: 52436,
};

/////////////////////////ROUGH?????????????????????????????????????????????

// // Endpoint to get table names
app.get("/tables", async (req, res) => {
  try {
    const query =
      "SELECT table_name FROM INFORMATION_SCHEMA.TABLES WHERE table_type = 'BASE TABLE';";
    const pool = await sql.connect(config);
    const result = await pool.request().query(query);

    const tables = result.recordset.map((row) => row.table_name);
    res.json(tables);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to get column names for a table
app.get("/columns/:tableName", async (req, res) => {
  try {
    const { tableName } = req.params;
    const query = `SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = '${tableName}';`;
    const pool = await sql.connect(config);
    const result = await pool.request().query(query);

    const columns = result.recordset.map((row) => row.column_name);
    res.json(columns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to handle the roll-up operation
app.post("/rollup", async (req, res) => {
  try {
    const { measureTable, measureColumn, dimensionTable, dimensionColumn } =
      req.body;

    // Perform your roll-up operation using SQL queries
    const query = `
      SELECT ${dimensionTable}.${dimensionColumn} AS Dimension,
             SUM(${measureTable}.${measureColumn}) AS Total
      FROM ${measureTable}
      INNER JOIN ${dimensionTable} ON ${measureTable}.${dimensionTable}ID = ${dimensionTable}.${dimensionTable}ID
      GROUP BY ${dimensionTable}.${dimensionColumn}
      ORDER BY Dimension;
    `;

    const pool = await sql.connect(config);
    const result = await pool.request().query(query);

    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint for the generalized drilldown operation on any dimension
app.post("/drilldown", async (req, res) => {
  try {
    const {
      measureTable,
      measureColumn,
      dimensionTable,
      dimensionColumn,
      drilldownDimensionValue,
    } = req.body;

    // Perform your drill-down operation using SQL queries
    const query = `
      SELECT ${dimensionTable}.${dimensionColumn} AS Dimension,
             SUM(${measureTable}.${measureColumn}) AS Total
      FROM ${measureTable}
      INNER JOIN ${dimensionTable} ON ${measureTable}.${dimensionTable}ID = ${dimensionTable}.${dimensionTable}ID
      WHERE ${dimensionTable}.${dimensionColumn} = '${drilldownDimensionValue}'
      GROUP BY ${dimensionTable}.${dimensionColumn}
      ORDER BY Dimension;
    `;

    const pool = await sql.connect(config);
    const result = await pool.request().query(query);

    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Slice Operation
app.post("/slice", async (req, res) => {
  try {
    const { dimensionTable, dimensionColumn, dimensionValue } = req.body;

    // Perform your slice operation using SQL queries
    const query = `
      SELECT *
      FROM ${dimensionTable}
      WHERE ${dimensionColumn} = @dimensionValue;
    `;

    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("dimensionValue", sql.VarChar, dimensionValue)
      .query(query);

    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// const testData = [
//   {
//     ProductID: 1,
//     CategoryID: 1,
//     Brand: "BrandX",
//     Price: 1200.0,
//     StockQuantity: 50,
//   },
//   {
//     ProductID: 2,
//     CategoryID: 1,
//     Brand: "BrandY",
//     Price: 800.0,
//     StockQuantity: 100,
//   },
// ];

// Dice operation endpoint
// Dice operation endpoint
// app.post("/dice", async (req, res) => {
//   try {
//     const { dimension1, value1, dimension2, value2 } = req.body;

//     // Fetch data from the database
//     const data = [await fetchDataFromDB()];

//     // Filter the fetched data based on the provided dimensions and values
//     const filteredData = data.filter((entry) => {
//       return entry[dimension1] === value1 && entry[dimension2] === value2;
//     });

//     // Calculate the total measure for the filtered data
//     const totalMeasure = filteredData.reduce((total, entry) => {
//       return total + entry.measure;
//     }, 0);

//     // Send the total measure as the response
//     res.json({ totalMeasure });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

const fs = require("fs"); // Import the file system module to read JSON file

app.post("/dice", async (req, res) => {
  try {
    const {
      dimensionTable,
      dimensionTable2,
      dimensionColumn,
      dimension2Column,
      value1,
      value2,
    } = req.body;
    console.log(
      dimensionTable,
      dimensionColumn,
      dimensionTable2,
      dimension2Column,
      value1,
      value2
    );
    // Read data from Data.json
    const jsonData = JSON.parse(fs.readFileSync("Data.json", "utf8"));

    // Get the data array from JSON based on the dimension table
    const data = jsonData[dimensionTable];
    const data2 = jsonData[dimensionTable2];

    // console.log(data);

    // Find the object where the specified column matches the given value
    // const result = data.find((obj) => obj[dimensionColumn] === value1);
    const result = data.map((obj, index) => {
      if (Number(value1) - 1 === index) {
        if (
          dimensionTable === "Product" ||
          dimensionTable === "Customer" ||
          dimensionTable === "Category"
        ) {
          return [obj[dimensionColumn], obj[`${dimensionTable}Name`]];
        } else if (dimensionTable === "Time") {
          return [obj[dimensionColumn], obj[`Date`]];
        } else {
          return [obj[dimensionColumn], obj["Amount"]];
        }
      }
    });

    const result2 = data2.map((obj, index) => {
      if (Number(value2) - 1 === index) {
        if (
          dimensionTable2 === "Product" ||
          dimensionTable2 === "Customer" ||
          dimensionTable2 === "Category"
        ) {
          return [obj[dimension2Column], obj[`${dimensionTable2}Name`]];
        } else if (dimensionTable2 === "Time") {
          return [obj[dimension2Column], obj[`Date`]];
        } else {
          return [obj[dimension2Column], obj["Amount"]];
        }
      }
    });

    console.log(result, result2);

    const finalResult = [...result, ...result2];
    console.log(finalResult);

    if (finalResult) {
      res.json(finalResult);
    } else {
      res.status(404).json({ error: "Data not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function fetchDataFromDB() {
  try {
    // Connect to the database
    await sql.connect(config);

    // Fetch data from tables
    const productData = await sql.query`SELECT * FROM Product`;
    const categoryData = await sql.query`SELECT * FROM Category`;
    const customerData = await sql.query`SELECT * FROM Customer`;
    const timeData = await sql.query`SELECT * FROM Time`;
    const salesData = await sql.query`SELECT * FROM Sales`;

    // Construct JSON object with fetched data
    const jsonData = {
      Product: productData.recordset,
      Category: categoryData.recordset,
      Customer: customerData.recordset,
      Time: timeData.recordset,
      Sales: salesData.recordset,
    };

    return jsonData;
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
    throw error;
  } finally {
    // Close the connection
    await sql.close();
  }
}

// Route to fetch and return data
app.get("/getData", async (req, res) => {
  try {
    // Fetch data from the database
    const data = [await fetchDataFromDB()];
    // console.log(data);
    res.json(data);
  } catch (error) {
    // Handle errors
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Failed to fetch data from database" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/////////////////////////ROUGH?????????????????????????????????????????????
