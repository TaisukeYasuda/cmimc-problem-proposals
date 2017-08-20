const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const competitionSchema = new Schema({
  name: { type: String, required: true, unique: true },
  website: String,
  location: { type: String, required: true },
  active_contest: { type: Schema.Types.ObjectId, ref: 'Contest' },
  contests: [ { type: Schema.Types.ObjectId, ref: 'Contest' } ],
  directors: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
  members: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
  announcements: [ { type: Schema.Types.ObjectId, ref: 'Announcement' } ],
  created: { type: Date, required: true },
  updated: { type: Date, required: true },
});

competitionSchema.pre('save', next => {
  const now = new Date();
  if (!this.created) this.created = now;
  if (!this.updated) this.updated = now;
  next();
});

const Competition = mongoose.model('Competition', userSchema);
module.exports = Competition;