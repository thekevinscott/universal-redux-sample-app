import passport from 'passport';
import passportJWT from 'passport-jwt';
import jwt from 'jsonwebtoken';
import {
  SECRET,
} from '../config';

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

//import jwt from 'jsonwebtoken';

export default function (app) {
  // Configure the local strategy for use by Passport.
  //
  // The local strategy require a `verify` function which receives the credentials
  // (`username` and `password`) submitted by the user.  The function must verify
  // that the password is correct and then invoke `cb` with a user object, which
  // will be set at `req.user` in route handlers after authentication.
  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: SECRET,
    //issuer: "accounts.examplesoft.com",
    //audience = "yoursite.net";
    usernameField: 'email',
    passwordField: 'password',
  }, (username, password, cb) => {
    console.log('here is a login strategy');
    if (username === 'test@test.com' && password === 'password') {
      return cb(null, {
        id: 1,
        email: username,
      });
    }

    return cb('Could not log you in');
  }));

  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser((user, cb) => {
    console.log('serialize user', user);
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    console.log('de serialize user', id);
    if (id === 1) {
      return cb(null, {
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
      const token = jwt.sign({
        email,
      }, SECRET, {
        expiresIn: 1440, // expires in 24 hours
      });

      return res.json({
        token,
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
    console.log('time to log out');
    req.logout();
    res.redirect('/');
  });

  app.use('/home', (req, res) => {
    res.status(401).json({});
    console.log('USING /');
    passport.authenticate('jwt', {
      session: false,
      //failWithError: true,
    }, (err, user, info) => {
      console.log('back!');
      if (err) {
        console.log('fail with error', err);
        return res.status(400).send({
          success: false,
          error: err,
        });
      }

      console.log(user, info);
      return res.json({ yes: 'one' });

      // handle error
    }, () => {
      console.log('fucking shit');
    });
  });

  app.use('*', (req, res) => {
    console.log('any');
    res.json({
      error: 'unhandled route',
    });
  });
}
