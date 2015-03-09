/* jshint node:true */
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var path = require('path');

gulp.task('templates', function() {
  return gulp.src([
    '.bowerrc',
    '.editorconfig',
    '.jscsrc',
    '.jshintrc',
    '.yo-rc.json',
    '.gitignore',
    'bower.json',
    'config.xml',
    'ionic.project',
    'package.json',
    'wire.dep',
    'gulpfile.js',
    'www/css/main.css',
    'www/css/vendor.css',
    'www/fonts/**/*',
    'www/img/ionic.png',
    'www/js/app.js',
    'www/js/controllers/main.js',
    'www/templates/main.html',
    'www/templates/nav.html',
    'www/index.html',
    'test/karma.conf.js',
    'test/spec/controllers/main.js',
    'hooks/**/*',
    'plugins/**/*',
    'scss/**/*'
  ], {base: '.'})
  .pipe($.rename(function(file) {
    if (file.basename[0] === '.') {
      file.basename = '_' + file.basename.slice(1);
    }
  }))
  .pipe($.if('*.js', $.replace(/scaffoldLionic/g, '<%= appname %>')))
  .pipe($.if('*.html', $.replace(/scaffoldLionic/g, '<%= appname %>')))
  .pipe(gulp.dest('gen/templates/app'));
});

gulp.task('scripts', ['templates'], function() {
  var appDir = path.join(process.cwd(), 'gen/templates/app/');

  return gulp.src(appDir + 'index.html')
    .pipe($.inject(gulp.src(appDir + 'scripts/**/*.js'), {
      starttag: '<!-- build:js({.tmp,app}) scripts/scripts.js -->',
      endtag: '<!-- endbuild -->',
      relative: true
    }))
    .pipe(gulp.dest(appDir));
});

gulp.task('clean', require('del').bind(null, ['gen']));

gulp.task('gen', ['templates', 'scripts'],
  function() {
  return gulp.src('gen/**/*').pipe($.size({title: 'gen', gzip: true}));
});

gulp.task('generate', ['clean'], function() {
  gulp.start('gen');
});

gulp.start('generate');
