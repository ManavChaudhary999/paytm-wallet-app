const mongoose = require('mongoose');
const URL = `${process.env.DB_BASE_URL}/${process.env.DB_NAME}`;

mongoose.connect(URL)
  .then(()=> console.log('Connected to MongoDB'))
  .catch((err)=> console.log('Could not connect to database', err));

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    minLenght: 3,
    maxLength: 20
  },
  lastName: {
    type: String,
    minLength: 3,
    maxLength: 20
  },
});

const AccountSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model('User', UserSchema);
const Account = mongoose.model('Account', AccountSchema);

module.exports = {
  User,
  Account
};