const express = require('express');
// const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');

const routes = require('./routes/index.js');

// const multer = require("multer";
// const upload = multer()

/**
* Express instance
* @public
*/

const cookiesSecret = "qwgd634tdgyuewury7uh"
const app = express();

// request logging. dev: console | production: file
// app.use(morgan());

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(cookiesSecret))

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use(express.static('public'))


// mount api v1 routes
app.use('/v1', routes);




app.listen(3000, () => { console.log("listening at 3000..."); })
