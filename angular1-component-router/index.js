(function () {
    'use strict';
    var express = require('express');
    var fs = require('fs');
    var app = express();
    var bodyParser = require('body-parser');
    var logger = require('morgan');

    /**
     * Read the movie json file
     */

    var movies = JSON.parse(fs.readFileSync('movies.json'));


    app.use(bodyParser.json());
    app.use(express.static('./public'));
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(logger('dev'));

    /**
     * [findMovie Finds movie of specified id]
     * @param  {[Integer]} id [The id of the movie]
     * @return {[Object]}    [The movie of the specified id]
     */
    function findMovie(id) {
        for (var movie of movies) {
            if (movie.id === parseInt(id)) {
                return movie;
            }
        }
    }


    /**
     * This routes returns all the movies in the json file
     */

    app.get('/api/movies', function (req, res) {
        res.json(movies);
    });

    /**
     * Returns on movies from the json file using id specified
     */

    app.get('/api/movies/:id', function (req, res) {
        var movie = findMovie(req.params.id);

        res.json(movie);
    });

    /**
     * Servers our index.html file
     */

    app.get('/*', function (req, res) {
        res.sendFile('index.html', {
            root: './public'
        });
    });

    /**
     * Runs the server on port 300
     */

    app.listen(3000, function () {
        console.log('server running at port 3000');
    });


})();
