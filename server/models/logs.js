'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogSchema = new Schema(
  { name: String},
  { versionKey: false }
  );

module.exports = mongoose.model('Log', Log);
