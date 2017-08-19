var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync');

gulp.task('lint', function () {
    gulp.src('./**/*.js')
        .pipe(jshint())
});

gulp.task('default', ['browser-sync'], function() {});

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files:  ['app.js', 'public/javascripts/*.js'],
        port: 3000,
    });
});

gulp.task('nodemon', function(cb) {
    return nodemon({
        script: 'app.js',
        env: {
            'NODE_ENV': 'development'
        }
    }).on('start', function() {
        cb();
    }).on('restart');
});

gulp.task('develop', function () {
    var stream = nodemon({ script: 'server.js'
        , ext: 'html js'
        , ignore: ['ignored.js']
        , tasks: ['lint'] });

    stream
        .on('restart', function () {
            console.log('restarted!')
        })
        .on('crash', function() {
            console.error('Application has crashed!\n');
            stream.emit('restart', 10)  // restart the server in 10 seconds
        })
});