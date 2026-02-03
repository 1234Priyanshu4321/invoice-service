function validateRows(rows) {
    const validRows = [];
    const errorRows = [];

    rows.forEach((row) => {
        const errors = [];

        if (!row["Invoice Number"])
            errors.push("Missing invoice number");

        if (!row["Customer Name"])
            errors.push("Missing customer name");

        if (!row["Date"] || isNaN(Date.parse(row["Date"])))
            errors.push("Invalid date");

        if (isNaN(Number(row["Item Quantity"])))
            errors.push("Invalid quantity");

        if (isNaN(Number(row["Item Price"])))
            errors.push("Invalid price");

        

        if (errors.length > 0) {
            errorRows.push({ ...row, Errors: errors.join(", ") });
        } else {
            validRows.push(row);
        }
    });

    return { validRows, errorRows };
}

module.exports = validateRows;