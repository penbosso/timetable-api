// This function is not transpiled, so must use commonJS

// Register babel to transpile before our test run.
require('babel-register')();

// Disable webpack features that Mocha doesn't understand.
require.extensions['.css'] = function(){};
