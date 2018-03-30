'use strict';

const loader = require('./loader');
const reader = require('./reader');

module.exports = {
  ...loader,
  ...reader
};
