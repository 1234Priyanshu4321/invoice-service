const express = require("express");
const multer = require("multer");

const parseFile = require("./parser");
const validateRows = require("./validator");
const buildInvoices = require("./invoiceBuilder");

const upload = multer({ dest: "uploads/" });

const app = express();

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const rows = await parseFile(req.file.path, req.file.originalname);

    const { validRows, errorRows } = validateRows(rows);

    const invoices = buildInvoices(validRows);

    invoices.forEach(inv =>
      console.log("Created invoice:", inv.invoiceNumber)
    );

    res.json({
      createdInvoices: invoices,
      errorRows: errorRows
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () =>
  console.log("Server running at http://localhost:3000")
);
