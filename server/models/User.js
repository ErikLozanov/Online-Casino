const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const formatDateTwo = require('../utils/dateFormatterTwo');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],

    },
    profilePicture: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },
    description: {
        type: String,
        default: 'No description added yet.'
    },
    joinedDate: {
        type: String,
        default: formatDateTwo(new Date())
    }
});

userSchema.virtual('repeatPassword')
.set(function(value) {
    if (this.password !== value) {
        throw new Error('Password missmatch!')
    }
});

userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;