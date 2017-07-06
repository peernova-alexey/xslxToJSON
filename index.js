const xlsxj = require("xlsx-to-json");
const fs = require('fs');
const _ = require('lodash');
const fieldNames = require('./field-names.json');
const rules = require('./rules.json');

xlsxj({
    input: "Sample Data.xlsx",
    output: null,
    sheet: "DTD INPUT"
}, function (err, result) {
    if (err) {
        console.error(err);
    } else {
        let remappedData = _.map(result, function (record) {
            let dtdRules = _.filter(rules, {system:'DTD'});
            let remappedRecord = {
                system:'DTD'
            };
            let originalValues = {};
            let derivedValues = {};
            
            _.forEach(dtdRules, function(rule){
                originalValues[rule.resultFieldName] = record[rule.originalFieldName] || "";
                derivedValues[rule.resultFieldName] = record[rule.originalFieldName] || "";
            });
            remappedRecord.originalValues = originalValues;
            remappedRecord.derivedValues = derivedValues;

            return remappedRecord;
        });
        fs.writeFile('DTD.json', JSON.stringify(remappedData), function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
        });
    }
});

xlsxj({
    input: "Sample Data.xlsx",
    output: null,
    sheet: "DTCC INPUT"
}, function (err, result) {
    if (err) {
        console.error(err);
    } else {
        let remappedData = _.map(result, function (record) {
            let dtccRules = _.filter(rules, {system:'DTCC'});
            let remappedRecord = {
                system:'DTCC'
            };
            let originalValues = {};
            let derivedValues = {};

            _.forEach(dtccRules, function(rule){
                originalValues[rule.resultFieldName] = record[rule.originalFieldName] || "";
                derivedValues[rule.resultFieldName] = record[rule.originalFieldName] || "";
            });
            remappedRecord.originalValues = originalValues;
            remappedRecord.derivedValues = derivedValues;

            return remappedRecord;
        });
        fs.writeFile('DTCC.json', JSON.stringify(remappedData), function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
        });
    }
});