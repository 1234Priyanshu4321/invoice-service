function buildInvoices(rows) {
    const invoices = {};

    rows.forEach((row) => {
        const id = row["Invoice Number"];

        if (!invoices[id]) {
            invoices[id] = {
                invoiceNumber: id,
                date: row["Date"],
                customerName: row["Customer Name"],
                lineItems: [],
                invoiceTotal: 0
            };
        }

        const itemTotal = Number(row["Item Total"]);

        invoices[id].lineItems.push({
            description: row["Item Description"],
            quantity: Number(row["Item Quantity"]),
            price: Number(row["Item Price"]),
            total: itemTotal
        });

        invoices[id].invoiceTotal += itemTotal;
    });

    return Object.values(invoices);
}

module.exports = buildInvoices;
