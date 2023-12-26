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
  database: "SalesDB",
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
/////////////////////////ROUGH?????????????????????????????????????????????
