const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');
//let logger = require('morgan');

//const bodyParser = require('body-parser');

const app = express();

//app.use(logger('dev'));
//app.use(bodyParser.json());

console.log(`server.js is running under ${ __dirname }`);

const staticFileMiddleware = express.static(path.join(__dirname, 'dist'));
app.use(staticFileMiddleware);
app.use(history());
app.use(staticFileMiddleware);

// Serve the index.html for all the other requests so that the
// router in the javascript app can render the necessary components
/*app.get('*',function(req,res){
    res.sendFile(__dirname + '/dist/index.html');
});*/

// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
    let err = new Error('Fancy page Not Found');
    err.status = 404;
    next(err);
});

// Start the server
app.set('port', process.env.PORT || 8081);

let server = app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + server.address().port);
});
