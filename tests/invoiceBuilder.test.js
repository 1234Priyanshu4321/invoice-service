const buildInvoices = require("../invoiceBuilder");

describe("Invoice Builder Tests", () => {

  test("should group multiple rows into one invoice", () => {
    const rows = [
      {
        "Invoice Number": "INV-001",
        "Date": "2024-12-01",
        "Customer Name": "ABC",
        "Item Description": "Item A",
        "Item Quantity": "2",
        "Item Price": "100",
        "Item Total": "200"
      },
      {
        "Invoice Number": "INV-001",
        "Date": "2024-12-01",
        "Customer Name": "ABC",
        "Item Description": "Item B",
        "Item Quantity": "3",
        "Item Price": "100",
        "Item Total": "300"
      }
    ];

    const invoices = buildInvoices(rows);

    expect(invoices.length).toBe(1);
    expect(invoices[0].lineItems.length).toBe(2);
    expect(invoices[0].invoiceTotal).toBe(500);
  });


  test("should create separate invoices for different invoice numbers", () => {
    const rows = [
      { "Invoice Number": "INV-001", "Item Total": "100" },
      { "Invoice Number": "INV-002", "Item Total": "200" }
    ];

    const invoices = buildInvoices(rows);

    expect(invoices.length).toBe(2);
  });

});
