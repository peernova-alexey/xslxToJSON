const xlsxj = require("xlsx-to-json");
xlsxj({
    input: "Sample Data.xlsx",
    output: "output2.json",
    sheet:"DTCC INPUT"
}, function(err, result) {
    if(err) {
        console.error(err);
    }else {
        console.log(result);
    }
});