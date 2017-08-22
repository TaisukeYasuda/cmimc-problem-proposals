const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const requestSchema = new Schema({
  body: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: [ 'REQUEST', 'INVITE' ] },
  created: { type: Date, required: true },
  updated: { type: Date, required: true }
});

requestSchema.pre('save', next => {
  const now = new Date();
  if (!this.created) this.created = now;
  if (!this.updated) this.updated = now;
  next();
});

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;
