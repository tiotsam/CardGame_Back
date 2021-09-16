const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        nom: {
            type: String,
            required: true
        },
        prenom: {
            type: String,
            required: true
        },
        mail: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true
        },
        pseudo:{
            type: String,
            required: true,
            unique: true
        },
        image:{
            type: String
        },
        ban:{
            type: Boolean,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            required: true
        },
        admin:{
            type: Boolean,
            required: true
        }
    }
);

// play function before save into display: 'block',
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(pseudo, password) {
    const user = await this.findOne({ pseudo });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect pseudo');
};

const UserModel = mongoose.model("Users", userSchema);

module.exports = {UserModel};