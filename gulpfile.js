'use strict'

var gulp 			= require('gulp'),
	config 			= require('./scripts/gulp/gulp.config'),
	requireDir		= require('require-dir'),
	requireSequence	= require('run-sequence');
	
gulp.task('release', ['clean'], function (callback) {
	runSequence('default', 'package', callback)
});
gulp.task('default', function (callback) {
	runSequence(
		'clean', 
		'build', 
		'bundle:vendor',
		"minify",
		'copy:mock-data',
		'inject:min',
		callback)
});
gulp.task('dev', function (callback) {
	runSequence(
		'clean', 
		'build', 
		'bundle:vendor',
		'copy:mock-data',
		'inject:min',
		callback)
});
ulp.task('dev:run', function (callback) {
	runSequence(
		'dev', 
		'browser-sync', 
		'watch:client',
		'watch:server',
		callback);
});


var env = process.env.NODE_ENV || 'development'
/*
var defaultTasks = ['clean', 'jshint', 'csslint','serve','watch'] // initialize with development settings
if (env === 'production') { var defaultTasks = ['clean', 'cssmin', 'uglify', 'serve', 'watch'];}
if (env === 'test')       { var defaultTasks = ['env:test', 'karma:unit', 'mochaTest'];}
*/
// read gulp directory contents for the tasks...
require('require-dir')('./gulp')
console.log('Invoking gulp -', env)
gulp.task('default', ['clean'], function (defaultTasks) {
  // run with paramater
  gulp.start(env)
})