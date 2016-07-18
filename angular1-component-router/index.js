(function () {
    'use strict';
    var express = require('express');
    var fs = require('fs');
    var app = express();
    var bodyParser = require('body-parser');
    var logger = require('morgan');

    var movies = JSON.parse(fs.readFileSync('movies.json'));


    app.use(bodyParser.json());
    app.use(express.static('./'));
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(logger('dev'));

    function findMovie(id) {
        for (var movie of movies) {
            if (movie.id === parseInt(id)) {
                return movie;
            }
        }
    }

    app.get('/api/movies', function (req, res) {
        res.json(movies);
    });

    app.get('/api/movies/:id', function (req, res) {
        var movie = findMovie(req.params.id);

        res.json(movie);
    });

    app.get('/*', function (req, res) {
        res.sendFile('index.html', {
            root: './'
        });
    });

    app.listen(3000, function () {
        console.log('server running at port 3000');
    });


})();
