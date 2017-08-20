const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const announcementSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  created: { type: Date, required: true },
  updated: { type: Date, required: true }
});

announcementSchema.pre('save', next => {
  const now = new Date();
  if (!this.created) this.created = now;
  if (!this.updated) this.updated = now;
  next();
});

const Announcement = mongoose.model('Announcement', announcementSchema);
module.exports = Announcement;
