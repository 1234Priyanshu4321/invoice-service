# Invoice Upload and Validation Service

A Node.js service that processes CSV/Excel files, validates invoice data, and converts it to JSON. Handles multiple line items per invoice and provides detailed error reporting.

## Quick Start

```bash
npm install
node server.js
```

Server runs on `http://localhost:3000`

## Usage

Upload a file using Postman or cURL:

```bash
curl -X POST http://localhost:3000/upload -F "file=@sample1.csv"
```

**Postman:**
- Method: `POST`
- URL: `http://localhost:3000/upload`
- Body → form-data → key: `file` (File type)

## Response

Returns JSON with created invoices and any rows that had errors:

```json
{
  "createdInvoices": [
    {
      "invoiceNumber": "INV-101",
      "date": "2024-12-01",
      "customerName": "ABC Pvt Ltd",
      "lineItems": [
        {
          "description": "Item A",
          "quantity": 2,
          "price": 200,
          "total": 400
        }
      ],
      "invoiceTotal": 1000
    }
  ],
  "errorRows": [
    {
      "Invoice Number": "INV-103",
      "Errors": "Missing customer name"
    }
  ]
}
```

## File Format

CSV/Excel files should have these columns (case-sensitive):

```
Invoice Number, Date, Customer Name, Total Amount, Item Description, Item Quantity, Item Price, Item Total
```

**Important:** Multiple rows with the same invoice number are grouped into a single invoice with multiple line items. The invoice total is calculated as the sum of all line item totals.

## Validation Rules

Each row is validated for:
- **Required fields:** Invoice Number, Customer Name, Date must be present
- **Date format:** Must be parseable by JavaScript's `Date.parse()`
- **Numeric values:** Item Quantity and Item Price must be valid numbers

Rows with errors are collected separately with an "Errors" column containing comma-separated error messages.

## JSON Structure

Each invoice is converted to:

```json
{
  "invoiceNumber": "string",
  "date": "string",
  "customerName": "string",
  "lineItems": [
    {
      "description": "string",
      "quantity": "number",
      "price": "number",
      "total": "number"
    }
  ],
  "invoiceTotal": "number"
}
```

## Project Structure

```
invoice-service/
├── server.js              # Express server
├── parser.js              # CSV/Excel parsing
├── validator.js           # Validation logic
├── invoiceBuilder.js      # Builds JSON structure
├── tests/                 # Unit tests
└── sample*.csv           # Sample files
```

## Testing

```bash
npm test
```

Tests cover validation logic and invoice building (grouping multiple rows, calculating totals).

## Design Notes

- Uses Multer for file uploads, stores temporarily in `uploads/`
- CSV parsing uses `csv-parser` (streaming), Excel uses `xlsx` library
- Validation happens row-by-row; invalid rows don't block valid ones
- Invoice grouping uses invoice number as key; date/customer name taken from first row
- Currently uses `console.log` for mock invoice creation (can be replaced with actual API calls)

## Assumptions

- First row contains headers
- Multiple rows with same invoice number = same invoice with multiple line items
- Date format is flexible (anything `Date.parse()` accepts)
- "Total Amount" column exists but isn't used (invoice total calculated from line items)

## Sample Files

Check `sample1.csv` through `sample4.csv` for examples. They include both valid and invalid rows for testing.