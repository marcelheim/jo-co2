import sirv from 'sirv';
import compression from 'compression';
import * as sapper from '@sapper/server';
const express = require('express')
const { auth } = require('express-openid-connect');
require('dotenv').config({
	path: '../.env'
})

const { 
	PORT,
	NODE_ENV,
	AUTH0_BASE_URL,
	AUTH0_CLIENT_ID,
	AUTH0_ISSUER_BASE_URL,
	AUTH0_CLIENT_SECRET
} = process.env;
const dev = NODE_ENV === 'development';

const config = {
	authRequired: false,
	auth0Logout: true,
	baseURL: AUTH0_BASE_URL,
	clientID: AUTH0_CLIENT_ID,
	issuerBaseURL: AUTH0_ISSUER_BASE_URL,
	secret: AUTH0_CLIENT_SECRET,
};

const app = express();

app.use(compression({ threshold: 0 }));
app.use(sirv('static', { dev }));
app.use(auth(config));
app.use((req, res, next) => {
	return sapper.middleware({
		session: () => {
			return {
				isAuthenticated: req.oidc.isAuthenticated(),
				user: req.oidc.user,
			};
		}
	})(req, res, next)
});

app.listen(PORT, (err) => {
	if(err) console.log(err)
})