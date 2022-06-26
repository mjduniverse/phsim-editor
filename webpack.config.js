const path = require('path');

module.exports = {
  
  /** 

  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'editor.js',
  },

  **/

  optimization: {
    minimize: false,
    concatenateModules: true
  },
};
