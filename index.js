var consolidate = require('consolidate');
var gutil = require('gulp-util');
var through = require('through2');
var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-layout';

function gulpLayout(opts) {
  opts = opts || {};

  if (!opts.engine) {
    throw new PluginError(PLUGIN_NAME, '"engine" option required.');
  }

  if (!opts.template) {
    throw new PluginError(PLUGIN_NAME, '"template" option required.');
  }

  var stream = through.obj(function(file, enc, cb) {

    if (file.isNull()) {
      // do nothing if no contents
    }

    function render(err, html) {
      if (err) {
        cb(err);
      } else {
        file.contents = new Buffer(html);
        cb(null, file);
      }
    }

    try {
      consolidate[opts.engine](opts.template, { contents: String(file.contents)}, render);
    } catch (err) {
      cb(err);
    }
  });

  return stream;
};

module.exports = gulpLayout;
