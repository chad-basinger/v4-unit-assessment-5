require('dotenv').config();
const massive = require('massive');
const express = require('express'),
userCtrl = require('./controllers/user'),
postCtrl = require('./controllers/posts')
const session = require('express-session')
// const FileStore = require('session-file-store')(session);
const app = express();

app.use(express.json());

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

app.use(session({
    // store: new FileStore,
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
}))

//Auth Endpoints
app.post('/api/auth/register', userCtrl.register);
app.post('/api/auth/login', userCtrl.login);
app.get('/api/auth/me', userCtrl.getUser);
app.post('/api/auth/logout', userCtrl.logout);

//Post Endpoints
app.get('/api/posts', postCtrl.readPosts);
app.post('/api/post', postCtrl.createPost);
app.get('/api/post/:id', postCtrl.readPost);
app.delete('/api/post/:id', postCtrl.deletePost)



massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then (db => {
    app.set('db', db)
    console.log('db is LIVE FROM NEW YORK!')
    app.listen(SERVER_PORT, _ => console.log(`running on ${SERVER_PORT}`));
})
