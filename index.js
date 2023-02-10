let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    dbConfig = require('./db/database');
    const cookieSession = require("cookie-session");

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true
}).then(() => {
        console.log('Database connected')
    },
    error => {
        console.log('Database could not be connected : ' + error)
    }
)
// Setting up express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json())


//
app.use(
    cookieSession({
      name: "bezkoder-session",
      secret: "COOKIE_SECRET", // should use as secret environment variable
      httpOnly: true
    })
  )
//
// Api root
const userRoute = require('./routes/student.route')
app.use('/endpoint', userRoute)
// Create port
const port = process.env.PORT || 8080;
// Conectting port
const server = app.listen(port, () => {
    console.log('Port connected to: ' + port)
})
// Find 404 and hand over to error handler
app.use((req, res, next) => {
    next(createError(404));
});
// Index Route
app.get('/', (req, res) => {
    res.send('invaild endpoint');
});
// error handler
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

//


//

// Static build location
app.use(express.static(path.join(__dirname, 'dist')));
