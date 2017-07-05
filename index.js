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
            let remappedRecord = {};
            _.forEach(dtdRules, function(rule){
                remappedRecord[rule.resultFieldName] = record[rule.originalFieldName];
            });

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
            let remappedRecord = {
                externalId:record['Trade Reference Identifier'],
                tradeDate:record['Trade Date'],
                maturityDate:record['Scheduled Termination Date/Expiration Date'],
                effectiveDate: record['Effective Date'],
                counterpartyAccountNumber: record['Counterparty Account Number'],
                dtccAccountNumber: record['DTCC Account Number'],
                fixedRate: record['Fixed Rate'],
                notionalCCY: record['Warehouse Current State Notional Currency'],
                notionalAMT: record['Warehouse Current State Notional Amount'],
                independentPayer: record['Independent COUNTERPARTY'],
                independentReceiver: record['Independent TRADINGPARTY'],
                fixedRatePayer: record['Fixed Rate Payer (Buyer)/Swaption Buyer'],
                floatRatePayer: record['Float Rate Payer (Seller)/Swaption Seller'],
                calculationAgentBusinessCenterCode: record['Calculation Agent Business Center Code'],
                referenceEntityId: record['Reference Entity ID'],
                referenceEntityName: record['Reference Entity Name'],
                independentPercent: record['Independent Percent'],
                floatRateCurrency: record['Float Rate Currency'],
                initialPaymentPayer: record['Initial Payment Payer'],
                initialPaymentReceiver: record['Initial Payment Receiver'],
                firstPaymentDate: record['First Payment Date'],
                masterDocumentTransactionType: record['Master Document Transaction Type'],
                referenceObligation: record['Reference Obligation'],
                restructuringEvent: record['Restructuring Event'],
                paymentAmount: record['Single Payment Amount/Premium Payment Amount'],
                singlePaymentCurrency: record['Single Payment Currency/Premium Payment Currency'],
                singlePaymentDate: record['Single Payment Date/Premium Payment Date'],
                bookId: record['Desk ID'],
                product: record['Product Type'],
                annexDate: record['Master Confirm Annex Date'],
                optionMaturity: record['Underlying Scheduled Termination Date'],
                strike: record['Strike Price'],
                exhaustionPoint: record['Exhaustion Point'],
                attachmentPoint: record['Attachment Point'],
                referencePolicyApplicable: record['Reference Policy Applicable'],
                entityType: record['Product ID'],
                subCategory: record['Sub-Product']
            };

            return record;
        });
        fs.writeFile('DTCC.json', JSON.stringify(remappedData), function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
        });
    }
});