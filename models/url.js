var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CounterSchema = Schema({
    lid: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

var counter = mongoose.model('counter', CounterSchema);

// create a schema for our links
var urlSchema = new Schema({
  lid: {type: Number, index: true},
  long_url: String,
  created_at: Date
});

urlSchema.pre('save', function(next){
  var doc = this;
  counter.findByIdAndUpdate({lid: 'url_count'}, {$inc: {seq: 1} }, function(error, counter) {
      if (error)
          return next(error);
      doc.created_at = new Date();
      doc.lid = counter.seq;
      next();
  });
});

var Url = mongoose.model('Url', urlSchema);

module.exports = Url;