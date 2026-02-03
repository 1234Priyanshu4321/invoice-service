const validateRows = require("../validator");

describe("Validator Tests", () => {

  test("should pass valid row", () => {
    const rows = [
      {
        "Invoice Number": "INV-001",
        "Date": "2024-12-01",
        "Customer Name": "ABC",
        "Item Quantity": "2",
        "Item Price": "100"
      }
    ];

    const { validRows, errorRows } = validateRows(rows);

    expect(validRows.length).toBe(1);
    expect(errorRows.length).toBe(0);
  });


  test("should catch missing customer name", () => {
    const rows = [
      {
        "Invoice Number": "INV-002",
        "Date": "2024-12-01",
        "Customer Name": "",
        "Item Quantity": "2",
        "Item Price": "100"
      }
    ];

    const { errorRows } = validateRows(rows);

    expect(errorRows.length).toBe(1);
    expect(errorRows[0].Errors).toContain("Missing customer name");
  });


  test("should catch invalid date", () => {
    const rows = [
      {
        "Invoice Number": "INV-003",
        "Date": "wrong-date",
        "Customer Name": "ABC",
        "Item Quantity": "2",
        "Item Price": "100"
      }
    ];

    const { errorRows } = validateRows(rows);

    expect(errorRows.length).toBe(1);
    expect(errorRows[0].Errors).toContain("Invalid date");
  });

});
