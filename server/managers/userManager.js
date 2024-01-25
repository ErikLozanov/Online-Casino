const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register =async (userData) => {
    const isValidEmail = await User.findOne({email: userData.email});
        if(!isValidEmail) {
            const user = await User.create(userData);
            const result = getAuthResult(user);
            return result;
        } else {
            console.log('hi!');
           throw new Error('There is already a user with this email.');
        }
};

exports.login =async ({email, password}) => {
    const user = await User.findOne({email});

    if(!user) {
        throw new Error('Invalid username or password');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid) {
        throw new Error('Invalid username or password');
    }
    const result = getAuthResult(user);

    return result;
};

exports.edit = async (userId, userData) => {
    const editedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
    return editedUser;
}

exports.getProfile = async (userId) => {
    return User.findById(userId);
}

function getAuthResult (user) {
    const payload = {
        _id: user._id,
        email: user.email,
    }
    const token = jwt.sign(payload, 'SECRETSECRET', { expiresIn: '2d' });

    const result = {
            email: user.email,
            username: user.username,
            accessToken: token,
            profilePicture: user.profilePicture,
            description: user.description,
            _id: user._id,
            joinedDate: user.joinedDate
    };

    return result;
}