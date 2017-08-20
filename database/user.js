const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  university: { type: String, required: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  unread: [ { type: Schema.Types.ObjectId, ref: 'Announcement' } ],
  read: [ { type: Schema.Types.ObjectId, ref: 'Announcement' } ],
  urgent: [ { type: Schema.Types.ObjectId, ref: 'Announcement' } ],
  created: { type: Date, required: true },
  updated: { type: Date, required: true }
});

userSchema.pre('save', next => {
  const now = new Date();
  if (!this.created) this.created = now;
  if (!this.updated) this.updated = now;
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
