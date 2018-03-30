'use strict';

const fs = require('fs');
const path = require('path');
const { expect, assert } = require('chai');

const {
  readFromFile
} = require('../src/helpers')

describe('# reader', () => {
  describe('### readFromFile', () => {
    it('Should load Excel file correctly without error', done => {
      const testDir = path.resolve('./', 'tests');
      readFromFile(path.resolve(testDir, 'test.xlsx'))
        .then(() => done())
        .catch(err => done(err));
    });

    it('Should throw error when xlsx file does not exist', done => {
      readFromFile('/this/path/does/not/exist.xlsx')
        .then(() => new Error('The file still load even file does not exist'))
        .catch(err => done());
    });

    it('Should return cheerio wrapper object (Wrapped xlsx)', done => {
      const testDir = path.resolve('./', 'tests');
      readFromFile(path.resolve(testDir, 'xlsx.xlsx'))
        .then(woorksheet => {
          // woorksheet
          expect(tagName.toLowerCase()).to.eq('xlsx');
          done();
        })
        .catch(err => done(err));
    });

    it('Should throw error if not providing filename', done => {
      readFromFile()
        .then($ => {
          done(new Error('Not providing `filename` but still loading file'));
        })
        .catch(err => done());
    });

    it('Should throw error if providing error but invalid', done => {
      readFromFile(1)
        .then(() => {
          done(new Error('Filename is invalid but still loading'));
        })
        .catch(err => done());
    });

    it('Should load readable stream correctly', done => {
      const testDir = path.resolve('./', 'tests');
      const xlsxFile = path.resolve(testDir, 'test.xlsx');
      const stream = fs.createReadStream(xlsxFile, { encoding: 'utf8' });
      readFromFile(stream)
        .then($ => {
          const tagName = $.prop('tagName');
          expect(tagName.toLowerCase()).to.eq('xlsx');
          done();
        })
        .catch(err => done(err));
    });
  });
});
