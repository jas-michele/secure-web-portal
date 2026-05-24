const {Schema, model}= require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must be a valid email address']
    },
    password: {
        type: String,
        minlength: 5
    },
    githubId: {
        type: String
    }
})

userSchema.pre('save', async function() {
    if (this.password && (this.isNew || this.isModified('password'))) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds)
    }
})

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

const User = model('User', userSchema);

module.exports = User;