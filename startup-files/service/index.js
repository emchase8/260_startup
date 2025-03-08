const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express()

//data scruture for users and scores, deleted after each restart, DB will take care of persistent data
let users = [];
let scores = [];

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

//allows backend to read JSON
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

//differenciating between endpoint calls and frontend calls
let apiRouter = express.Router();
app.use(`/api`, apiRouter);

//creates a user, gives them a token
apiRouter.post('auth/create', async (req, res) => {
    if (await findUser('email', req.body.email)) {
        res.status(409).send({msg: 'Existing user'});
    } else {
        const user = await createUser(req.body.email, req.body.password)
        setAuthCookies(res, user.token)
        res.send({email: user.email})
    }
});

//login an existing user
apiRouter.post('auth/login', async (req, res) => {
    const user = await findUser('email', req.body.email);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            setAuthCookies(res, user.token);
            res.send({email: user.email});
            return;
        }
    }
    res.status(401).send({msg: 'Unauthorized'});
});

//logout a user
apiRouter.delete('auth/logout', async (req,res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

//verifying a user exists and is authorized
const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        next();
    } else {
        res.status(401).send({msg: 'Unauthorized'});
    }
};

//handles actually creating a user and storing them in local storage
async function createUser(email, password) {
    const password_hash = await bcrypt.hash(password, 10);
    const user = {
        email: email,
        password: password_hash,
        token: uuid.v4(),
    };
    users.push(user);
    return user;
}

//searches users array to see if user already there
async function findUser(field, value) {
    if (!value) return null;
    return users.find((u) => u(field) === value);
}

//sets cookie to an HTTP response?
function setAuthCookies(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

//tells code where to listen 
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});