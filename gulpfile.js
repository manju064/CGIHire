var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	$ = require('gulp-load-plugins')(),
    util = require("gulp-util"),
    sass = require("gulp-sass"),
    autoprefixer = require('gulp-autoprefixer'),//https://www.npmjs.org/package/gulp-autoprefixer
	minifycss = require('gulp-minify-css'),//https://www.npmjs.org/package/gulp-minify-css
	rename = require('gulp-rename'),//https://www.npmjs.org/package/gulp-rename
	log = util.log,
	stylish = require('jshint-stylish'),
    args = require('yargs').argv;

console.log(args);
var prod = args.prod;

//java scripts path
//TODO, create bundle for js files
//var specs = 'client/app/src/js/spec/*.js';
//var scripts = ['client/app/src/framework/**/*.js'];
//var bundle = 'bin/js/**/*.js';

//Style elements path
var sassFiles = 'public/client/app/assets/sass/*.scss';

gulp.task("sass", function(){
	log("Generate CSS files " + (new Date()).toString());
    gulp.src(sassFiles)
		.pipe(sass({ style: 'expanded' }))
					.pipe(autoprefixer("last 3 version","safari 5", "ie 8", "ie 9"))
		.pipe(gulp.dest("bin/css"))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('bin/css'));
});

gulp.task('default', ['sass'] , function(){
    gulp.watch(sassFiles, ['sass']);
	nodemon({
        script:'app.js',
        ext:'js',
        env:{
            PORT:8082,
			NODE_ENV:'development'
        },
        ignore:['./node_modules/**']
    })
    .on('restart', function(){
            console.log("Restarting api..");
    })
});
