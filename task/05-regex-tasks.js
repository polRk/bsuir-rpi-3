'use strict';

/********************************************************************************************
 *                                                                                          *
 * Plese read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions           *
 *                                                                                          *
 ********************************************************************************************/


/**
 * Returns the regexp that matches a GUID string representation
 * '{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}',
 * where X is hexadecimal digit (0,1,2...,9,A,a,B,b,C,c,D,d,F,f)
 *
 * See more details: https://en.wikipedia.org/wiki/Globally_unique_identifier
 *
 * Match :
 *   '{3F2504E0-4F89-41D3-9A0C-0305E82C3301}'
 *   '{21EC2020-3AEA-4069-A2DD-08002B30309D}'
 *   '{0c74f13f-fa83-4c48-9b33-68921dd72463}'
 *
 *  Do not match:
 *   '{D44EF4F4-280B47E5-91C7-261222A59621}'
 *   '{D1A5279D-B27D-4CD4-A05E-EFDH53D08E8D}'
 *   '{5EDEB36C-9006-467A8D04-AFB6F62CD7D2}'
 *   '677E2553DD4D43B09DA77414DB1EB8EA'
 *   '0c74f13f-fa83-4c48-9b33-68921dd72463'
 *   'The roof, the roof, the roof is on fire'
 *
 * @return {RegExp}
 */
function getRegexForGuid() {
   return new RegExp(/^{[A-F0-9]{8}-([A-F0-9]{4}-){3}[A-F0-9]{12}}$/i)
}


/**
 * Returns the regexp that matches all the strings from first column
 * but of them from the second
 *
 * Match :                 Do not match:
 * -----------             --------------
 *  'pit'                     ' pt'
 *  'spot'                    'Pot'
 *  'spate'                   'peat'
 *  'slap two'                'part'
 *  'respite'
 *
 * NOTE : the regex lenth should be < 13
 *
 * @return {RegExp}
 *
 */
function getRegexForPitSpot() {
   return new RegExp(/p.t/)
}


/**
 * Returns the regexp that matches all SSN (Social Security Number) codes in
 * 'XXX-XX-XXXX' format where X is digit, where each group can't be all zeros
 * https://en.wikipedia.org/wiki/Social_Security_number
 *
 * Valid SSN:                       Invalid SSN
 * ---------------                  -----------------
 * '123-45-6789'                     '123456789'
 * '234-56-2349'                     '000-56-2349'
 * '875-43-0298'                     '875-00-0298'
 * '034-01-0008'                     '034-01-0000'
 *                                   '0S4-H1-HACK'
 * @return {RegExp}
 */
function getRegexForSSN() {
   return /^(?!000)\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/;
}


module.exports = {
    getRegexForGuid: getRegexForGuid,
    getRegexForPitSpot: getRegexForPitSpot,
    getRegexForSSN: getRegexForSSN,
};
