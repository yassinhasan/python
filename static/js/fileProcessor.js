
importScripts('/js/lib/exceljs.min.js');

self.onmessage = function (event) {
    const file = event.data;

    const reader = new FileReader();
    reader.onload = function (e) {
        const buffer = e.target.result;
        const workbook = new ExcelJS.Workbook();

        workbook.xlsx.load(buffer).then(() => {
            const sheet = workbook.getWorksheet(1); // Get the first sheet
            const jsonData = [];

            sheet.eachRow((row, rowNumber) => {
                // Remove the first element (null) and shift the array to make it 0-indexed
                const rowData = row.values.slice(1);
                jsonData.push(rowData);
            });

            self.postMessage(jsonData);
        });
    };

    reader.readAsArrayBuffer(file);
};