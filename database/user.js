const bcrypt = require('bcrypt'),
      mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

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

userSchema.methods.checkPassword = (password, callback) => {
  let user = this;
  bcrypt.hash(password, user.salt, (err, hash) => {
    if (err) return callback(err, null);
    else return callback(null, { authenticated: user.password === hash });
  });
};

userSchema.pre('save', next => {
  let user = this;
  
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      /* replace cleartext password with hash */
      user.password = hash;
    });
  });

  /* set created and/or updated */
  const now = new Date();
  if (!user.created) user.created = now;
  if (!user.updated) user.updated = now;
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
