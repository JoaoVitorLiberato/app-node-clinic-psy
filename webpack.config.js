require('dotenv').config();
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'node',          // Mantém compatibilidade com Node.js
  externals: [nodeExternals()], // Ignora node_modules no bundle
  mode: process.env.NODE_ENV,      // Ou 'development'
};