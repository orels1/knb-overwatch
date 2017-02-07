/**
 * Created by orel- on 17/Jan/17.
 */
import express from 'express';
let router = express.Router();
import passport from 'passport';
import LocalPassport from 'passport-local';
import Mod from 'models/mod';
import {extend} from 'underscore';
import JWTPassport from 'passport-jwt';

const JwtStrategy = JWTPassport.Strategy;
const ExtractJwt = JWTPassport.ExtractJwt;

const LocalStrategy = LocalPassport.Strategy;

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = process.env.JWT_SECRET;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({
        'id': id,
    })
        .exec()
        .then((user) => {
            done(null, user);
        })
        .catch((err) => {
            throw err;
        });
});

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    Mod.findOne({'_id': jwt_payload.id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
            // or you could create a new account
        }
    });
}));

passport.use(new LocalStrategy(
    function(username, password, done) {
        Mod.findOne({
            'username': username,
        })
            .exec()
            .then((user) => {
                if (!user) {
                    throw new Error('EntryNotFound');
                }

                return user.authenticate(password, (err, user) => {
                    return Mod.sign(user)
                        .then((user) => {
                            return done(null, user);
                        })
                        .catch((err) => {
                            throw err;
                        });
                });
            })
            .catch((err) => {
                throw err;
            });
    }
));

router.post('/signup', (req, res) => {
    Mod.register(
        new Mod({'username': req.body.username}),
        req.body.password,
        (err, mod) => {
            if (err) {
                throw err;
            }

            // Due to lack of better approach
            mod.links = {
                '_self': `/api/v1/mods/${mod._id}`,
                'self': `/mods/${mod.username}`,
                '_logs': `/api/v1/logs/user/${mod._id}`,
            };
            mod.roles = ['mod'];

            Mod.sign(mod)
                .then(() => {
                    passport.authenticate('local')(req, res, () => {
                        res.status(200).send({
                            'error': false,
                            'results': {
                                'token': req.user.token,
                            },
                        });
                    });
                })
                .catch((err) => {
                    throw err;
                });
        }
    );
});

// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHub will redirect the user
//   back to this application at /auth/github/callback
router.post('/login',
    passport.authenticate('local'),
    (req, res) => {
        res.status(200).send({
            'error': false,
            'results': {
                'token': req.user.token,
            },
        });
    });

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// function authorize(req, res, next) {
//     let token = req.get('Authorization');
//     if (!token && req.get('Service-Token') !== process.env.serviceToken) {
//         return res.status(401).send({
//             'error': 'Unauthorized',
//             'error_details': 'Authorization header not provided',
//             'results': {},
//         });
//     }
//     User.findOne({
//         'tokens.jwt': token,
//     })
//         .exec()
//         .then((user) => {
//             if (!user  && req.get('Service-Token') !== process.env.serviceToken) {
//                 // override if Service-Token is provided
//                 throw new Error('Unauthorized');
//             }
//             req.user = user;
//             next();
//         })
//         .catch((err) => {
//             if (err.message === 'Unauthorized') {
//                 return res.status(401).send({
//                     'error': 'Unauthorized',
//                     'error_details': 'JWT token invalid',
//                     'results': {},
//                 });
//             }
//             throw err;
//         });
// }

router.post('/profile', passport.authenticate('jwt', { '': false }),
    function(req, res) {
        res.send(req.user);
    }
);

export {router, passport};
