import passport from 'passport';
import passportJWT from 'passport-jwt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import {
  SECRET,
} from '../config';

// DONT DO THIS IN PRODUCTION, USE A DB
const localSessions = {};

const JwtStrategy = passportJWT.Strategy;
//const ExtractJwt = passportJWT.ExtractJwt;

//import jwt from 'jsonwebtoken';

export default function (app) {
  // Configure the local strategy for use by Passport.
  //
  // The local strategy require a `verify` function which receives the credentials
  // (`username` and `password`) submitted by the user.  The function must verify
  // that the password is correct and then invoke `cb` with a user object, which
  // will be set at `req.user` in route handlers after authentication.
  passport.use(new JwtStrategy({
    jwtFromRequest: req => {
      if (req && req.cookies && localSessions[req.cookies.token]) {
        return req.cookies.token;
      }

      return null;
    },
    secretOrKey: SECRET,
    //issuer: "accounts.examplesoft.com",
    //audience = "yoursite.net";
    usernameField: 'email',
    passwordField: 'password',
  }, ({
    id,
    email,
  }, done) => {
    if (email !== 'test@test.com') {
      return done('Invalid user');
    }

    return done(null, {
      email,
      id: 1,
    });
  }));

  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser((user, cb) => {
    //console.log('serialize user', user);
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    //console.log('de serialize user', id);
    if (id === 1) {
      return cb(null, {
        id: 1,
        email: 'test@test.com',
      });
    }

    return cb('Could not log you in');
  });

  // Initialize Passport and restore authentication state, if any, from the
  // session.
  app.use(passport.initialize());
  app.use(passport.session());

  // Define routes.

  app.post('/login', (req, res) => {
    const {
      email,
      password,
    } = req.body;

    if (email === 'test@test.com' && password === 'password') {
      //const token = 'foo';
      const token = jwt.sign({
        email,
      }, SECRET, {
        expiresIn: 1440, // expires in 24 hours
      });

      localSessions[token] = true;
      //console.log('set local session', token);

      res.setHeader('Set-Cookie', cookie.serialize('token', String(token), {
        path: '/',
        //httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 1 week
      }));

      return res.json({
        email,
      });
    }

    return res.status(401).json({
      error: {
        message: 'There was a problem logging in. Please try again',
        code: 2,
      },
    });
  });

  app.use('/logout', (req, res) => {
    if (req && req.cookies) {
      localSessions[req.cookies.token] = false;
    }
    res.json({});
  });

  app.use('/home', passport.authenticate('jwt', {
    session: false,
  }), (req, res) => {
    return res.json({ yes: 'one' });
  });
}
