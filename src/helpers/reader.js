'use strict';

const fs = require('fs');
const xlsx = require('node-xlsx');
const stream = require('stream');


const isReadableStream = obj =>
  obj instanceof stream.Readable &&
  typeof (obj._read === 'function') &&
  typeof (obj._readableState === 'object');

/**
 * Read excel file and parse to worksheet
 *
 * @param {string} html path
 * @returns {Object} xlsx Worksheet
 */
exports.readFromFile = filename => {
  if (!filename) return Promise.reject(new Error('Filename is required'));
  return new Promise((resolve, reject) => {
    if (typeof filename === 'string') {
      fs.readFile(filename, (err, html) => {
        if (err) return reject(err);
        return xlsx.parse(filename);
      });
    } else if (isReadableStream(filename)) {
      return xlsx.parse(filename);
    } else {
      reject(new Error('Filename was provided but invalid'));
    }
  });
}
