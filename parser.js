const fs = require("fs");
const csv = require("csv-parser");
const xlsx = require("xlsx");

function parseCSV(path) {
    return new Promise((resolve) => {
        const results = [];

        fs.createReadStream(path)
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", () => resolve(results));
    });
}

function parseExcel(path) {
    const workbook = xlsx.readFile(path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    return xlsx.utils.sheet_to_json(sheet, {
        raw: false   // VERY IMPORTANT → keeps dates as strings
    });
}

module.exports = function (path) {
    if (path.endsWith(".csv")) return parseCSV(path);
    return parseExcel(path);
};