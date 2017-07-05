const xlsxj = require("xlsx-to-json");
const fs = require('fs');
const _ = require('lodash');
const fieldNames = require('./field-names.json');

xlsxj({
    input: "Final Field Mappings.xlsx",
    output: null,
}, function (err, result) {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
        let rules = [];
        _.forEach(result, function (record) {
            let key = _.findKey(fieldNames, function(name){
                console.log(name);
                return name == record['Custom Data Field Name']
            });
            let dtdRule = {
                system: "DTD",
                resultFieldName: key,
                originalFieldName: record['DTD Field Name'],
                rule: record['DTD Derived/ Source?']
            };
            rules.push(dtdRule);

            let dtccRule = {
                system: "DTCC",
                resultFieldName: key,
                originalFieldName: record['DTCC Field Name'],
                rule: record['DTCC Derived/ Source?']
            };
            rules.push(dtccRule);
        });
        fs.writeFile('rules.json', JSON.stringify(rules), function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
        });
    }
});