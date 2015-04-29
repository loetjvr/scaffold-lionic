'use strict';

var gulp = require('gulp');
var karma = require('karma').server;
var $ = require('gulp-load-plugins')();

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('scss/main.scss')
    .pipe($.sass())
    .pipe(gulp.dest('www/css/'))
    .on('end', done);
});

gulp.task('useref', ['wiredep'], function() {
  var assets = $.useref.assets();

  gulp.src('wire.dep')
    .pipe(assets)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.ignore.exclude('*.dep'))
    .pipe(gulp.dest('www'));
});

gulp.task('wiredep', function() {
  var wiredep = require('wiredep').stream;

  gulp.src('wire.dep')
    .pipe(wiredep({exclude: 'ionic/css/ionic.css'}))
    .pipe(gulp.dest(''));

  gulp.src('scss/*.scss')
    .pipe(wiredep())
    .pipe(gulp.dest('scss'));

  gulp.src('test/*.js')
    .pipe(wiredep({devDependencies: true}))
    .pipe(gulp.dest('test'));
});

gulp.task('fonts', function() {
  gulp.src('bower_components/ionic/fonts/*')
    .pipe(gulp.dest('www/fonts'));
});

gulp.task('jshint', function() {
  gulp.src('www/js/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('jscs', function() {
  gulp.src('www/js/**/*.js')
    .pipe($.jscs());
});

gulp.task('clean', require('del').bind(null, ['docs']));

gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch('bower.json', ['useref']);
  gulp.watch('www/js/**/*.js', ['jshint', 'jscs']);
});

gulp.task('docs', ['clean'], function() {
  gulp.src('www/js/**/**')
    .pipe($.ngdocs.process())
    .pipe(gulp.dest('docs'));
});

gulp.task('test', function(done) {
  karma.start({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: true
  }, done);
});
