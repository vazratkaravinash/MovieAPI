const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config()
const mongoose = require('mongoose');

const http = require('http');

const port = process.env.PORT || 8080;
const host = process.env.HOST;


const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


//sequelizedb.sync();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

app.use((req,res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization ,Origin, X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    if(req.method === 'OPTIONS'){
        res.status(200).end();
    } else
    next();
});


const swaggerDefinition = {
    info: {
        title: 'Movies - Swagger API',
        version: '1.0.0',
        description: 'Endpoints to test movies routes',
    },
    host: process.env["BB_STOREFRONT_HOST"],
    basePath: '/api/v1',
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            scheme: 'bearer',
            in: 'header',
        },
    },
};

const options = {
    swaggerDefinition,
    apis: [
        './routes/movies.routes.js'
    ],
};

const swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//importing user router
const userRouter = require('./routes/movies.routes');
app.use('/api/v1', userRouter);


app.get('/api/v1/*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of REST API.',
}));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log("app.js error - " + err);
    // render the error page
    res.status(err.status || 500);
    //res.render('error');
});

app.set('port', port);
mongoose.connect(process.env["CONNECTION_STRING"], {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const server = http.createServer(app);

server.listen(port, host, async () => {
    // cron.runJobs();
    //connecting to the database


    console.log(`Server is up and running at ${port} `);
});


module.exports = server;