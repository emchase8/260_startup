const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

//data scruture for users and scores, deleted after each restart, DB will take care of persistent data
// let users = [];
// let scores = [];

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

//allows backend to read JSON
app.use(express.json());

//allows cookie parser to track auth tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

//differenciating between endpoint calls and frontend calls
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//creates a user, gives them a token
apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('email', req.body.email)) {
        res.status(409).send({msg: 'Existing user'});
    } else {
        const user = await createUser(req.body.email, req.body.password)
        setAuthCookies(res, user.token)
        res.send({email: user.email})
    }
});

//login an existing user
apiRouter.post('/auth/login', async (req, res) => {
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
apiRouter.delete('/auth/logout', async (req,res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

//verifying a user exists and is authorized, allows endpoints that need auth to be called
const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        next();
    } else {
        res.status(401).send({msg: 'Unauthorized'});
    }
};

//getting the scores
apiRouter.get('/scores', verifyAuth, async (_req, res) => {
    res.send(scores);
});

//submits scores to the scores array
apiRouter.post('/score', verifyAuth, async (req, res) => {
    scores = updateScores(req.body);
    res.send(scores)
});

//error handler, so hopefully things dont break too bad 
app.use(function (err, req, res, next) {
    res.status(500).send({type: err.name, message: err.message})
});

//returns app default page if no path given
app.use((_req, res) => {
    res.sendFile('index.html', {root: 'public'});
});

//actually updates the scores, maybe change it to =< to deal with new scores trumping old?
async function updateScores(new_score) {
    await DB.add_scores(new_score);
    return DB.best_scores();
    // let found = false;
    // for (const [i, prev_score] of scores.entries()) {
    //     if (new_score.score < prev_score.score) {
    //         scores.splice(i, 0, new_score);
    //         found = true;
    //         break;
    //     }
    // }
    // if (!found) {
    //     scores.push(new_score);
    // }
    // if (scores.length > 10) {
    //     scores.length = 10;
    // }
    // return scores;
}

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
    return users.find((u) => u[field] === value);
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