'use strict';

const path = require('path');
const { expect, assert } = require('chai');

const {
  loadYAML
} = require('../src/helpers');

describe('# Helper', () => {
  describe('## loader', () => {
    describe('## YAML loader', () => {
      it('Should load yaml configuration file correctly when provide correct path', done => {
        const cfgPath = path.resolve('config.yml');
        loadYAML(cfgPath)
          .then(cfg => {
            assert(cfg, 'Should not be null or empty');
            done();
          })
          .catch(err => done(err));
      });

      it('Should throw error when the configuration path does not exist', done => {
        loadYAML('/path/to/any/file.yml')
          .then(() => {
            done(
              new Error(
                'The configuration file does not exist but still load successfully'
              )
            );
          })
          .catch(() => done());
      });

      it('Should use default configuration if not providing filename', done => {
        loadYAML()
          .then(cfg => {
            assert(cfg, 'Should not be null or empty');
            done();
          })
          .catch(err => done(err));
      });

      it('Should load correct configuration if provide config name', done => {
        const cfgPath = path.resolve('config.yml');
        loadYAML(cfgPath, 'rules')
          .then(cfg => {
            assert(cfg, 'Should not be null or empty');
            done();
          })
          .catch(err => done(err));
      });

      it('Should throw error if provide config name but it doesnt exist', done => {
        const cfgPath = path.resolve('config.yml');
        loadYAML(cfgPath, 'x')
          .then(cfg => {
            done(new Error('Configuration does not exist but still loading'));
          })
          .catch(err => done());
      });
    });
  });
});
