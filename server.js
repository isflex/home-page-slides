// https://expressjs.com/en/resources/middleware/serve-static.html#index
// http://expressjs.com/en/4x/api.html#express.static
// http://expressjs.com/en/advanced/best-practice-security.html#additional-considerations
// https://stackoverflow.com/a/34716129/10159170

// https://linux.die.net/man/8/nscd

var http = require('http')
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var serveIndex = require('serve-index');
var cors = require('cors');
var regexEscape = require('regex-escape');
var nocache = require("nocache");

const SERVER_RUNNING = process.env.FLEX_SERVER_RUNNING || 'INFO: Accepting connections at';
const DOMAIN_NAME = process.env.FLEX_DOMAIN_NAME || 'local.flexiness.com'
const HOSTNAME = process.env.FLEX_MF_HOMEPAGE_ABOUT_SLIDES_HOSTNAME || DOMAIN_NAME
const PORT = process.env.FLEX_MF_HOMEPAGE_ABOUT_SLIDES_PORT || 4008;
const PROTOCOL = process.env.FLEX_PROTOCOL || 'http'
const HOST = process.env.FLEX_MF_HOMEPAGE_ABOUT_SLIDES_HOST || `${PROTOCOL}://${HOSTNAME}:${PORT}`;

function setCustomCacheControl (res, path) {
  if (serveStatic.mime.lookup(path) === 'text/html') {
    // Custom Cache-Control for HTML files
    res.setHeader('Cache-Control', 'public, max-age=0')
  }
};

var corsOptions = {
  // origin: '*',
  origin: [
    new RegExp(`${regexEscape(DOMAIN_NAME)}`)
  ],
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','X-Requested-With', 'Authorization'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// /////////////////////////////////////////////////////////////////////////////////////////////////////

var app = express();

app.use(cors(corsOptions));

app.use('/', express.static(path.join(__dirname, 'public'), {
  index: ['about.html'],
  // maxAge: '1d',
  // setHeaders: setCustomCacheControl
}));

app.use('/node', express.static(path.join(__dirname, 'build/node'), { 
  // maxAge: '1d',
  // setHeaders: setCustomCacheControl
}));

app.use('/web', express.static(path.join(__dirname, 'build/web'), { 
  index: ['index.html'],
  // maxAge: '1d',
  // setHeaders: setCustomCacheControl
}));

// shows you the directory/file list at app root
app.use('/', serveIndex(path.join(__dirname, 'build'), { icons: true }));

// app.use(nocache());

var server = http.createServer(app);

server.listen(PORT, `${HOSTNAME}`, 34, (err) => {
  if (err) throw err;
  console.log(`[HTTP] : ${HOST} :`, server.address());
  console.log(`${SERVER_RUNNING} ${HOST}`)
});