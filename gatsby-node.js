'use strict';
/**
 * @see './configs/gatsby-node.ts'
 */
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2017'
  }
});

const { createPage, onCreateNode, createSchemaCustomization } = require('./configs/gatsby-node');
exports.createPage = createPage;
exports.onCreateNode = onCreateNode;
exports.createSchemaCustomization = createSchemaCustomization;
