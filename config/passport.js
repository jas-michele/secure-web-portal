const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/userModel');

require('dotenv').config();

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const existingUser = await User.findOne({githubID: profile.id});

                if (existingUser) {
                    return done(null, existingUser);
                }

                const newUser = new User({
                    githubId: profile.id,
                    username: profile.username,
                    email: profile.emails[0].value
                });

                await newUser.save();
                done(null, newUser);
            } catch (err) {
            done(err)
             }
            }
    )
)