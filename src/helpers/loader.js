'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Load yaml config file to javascript object
 *
 * @param {string} filename: provide the absolute path of yaml configuration file.
 * @param {string} config stands for key of configuration
 */
exports.loadYAML = (filename, config) => {
  if (!filename) {
    filename = path.resolve('config.yml');
  }
  if (!fs.existsSync(filename))
    return Promise.reject(
      new Error(`Provied path (${filename}) does not exist!`)
    );

  return new Promise((resolve, reject) => {
    try {
      const cfg = yaml.safeLoad(fs.readFileSync(filename, 'utf8'));
      if (config && !cfg[config])
        throw new Error(`Config with name '${config}' doesn't exist`);
      return config ? resolve(cfg[config]) : resolve(cfg);
    } catch (err) {
      reject(err);
    }
  });
}
