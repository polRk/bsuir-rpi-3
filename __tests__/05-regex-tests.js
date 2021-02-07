'use strict';

var assert = require('assert');
var tasks = require('../task/05-regex-tasks');

describe('05-regex-tasks', function() {
    it('getRegexForGuid should match the valid GUID', function () {
        var result = tasks.getRegexForGuid();

        [
            '{3F2504E0-4F89-41D3-9A0C-0305E82C3301}',
            '{21EC2020-3AEA-4069-A2DD-08002B30309D}',
            '{0c74f13f-fa83-4c48-9b33-68921dd72463}'
        ].forEach((str) => {
            assert(
                result.test(str),
                `regex does not match '${str}'`
            );
        });

        [
            '{D44EF4F4-280B47E5-91C7-261222A59621}',
            '{D1A5279D-B27D-4CD4-A05E-EFDH53D08E8D}',
            '{5EDEB36C-9006-467A8D04-AFB6F62CD7D2}',
            '677E2553DD4D43B09DA77414DB1EB8EA',
            '0c74f13f-fa83-4c48-9b33-68921dd72463',
            'The roof, the roof, the roof is on fire'
        ].forEach((str) => {
             assert(
                 result.test(str) == false,
                `regex matches '${str}'`
             );
        });

    });


    it('getRegexForPitSpot should be implemeted according to task', function () {
        var result = tasks.getRegexForPitSpot();

        [ 'pit', 'spot', 'spate', 'slap two', 'respite' ].forEach((str) => {
            assert(
                result.test(str),
                `regex does not match '${str}'`
            );
        });

        [ ' pt', 'Pot', 'peat', 'part' ].forEach((str) => {
            assert(
                result.test(str) == false,
                `regex matches '${str}'`
            );
        });

        assert(
            result.source.length < 13,
            `regexp length should be < 13, actual ${result.source.length} `
        );
    });

    it('getRegexForSSN should match the valid SSN', function () {
        var result = tasks.getRegexForSSN();

        [
            '123-45-6789',
            '234-56-2349',
            '875-43-0298',
            '034-01-0008'
        ].forEach((str) => {
            assert(
                result.test(str),
                `regex does not match '${str}'`
            );
        });

        [
            '123456789',
            '000-56-2349',
            '875-00-0298',
            '034-01-0000',
            '0S4-H1-HACK'
        ].forEach((str) => {
            assert(
                result.test(str) == false,
                `regex matches '${str}'`
            );
        });

    });

});
