const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    userType: { type: String, default: 'user', required: true }
//    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
