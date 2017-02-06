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
var env = args.prod? "production":"development";


//java scripts path
//TODO, create bundle for js files
//var specs = 'client/app/src/js/spec/*.js';
//var scripts = ['client/app/src/framework/**/*.js'];
//var bundle = 'bin/js/**/*.js';

//Style elements path
var cssPath = 'public/client/app/assets/sass';

var sassFiles = cssPath + '/*.scss';

gulp.task("sass", function(){
	log("Generate CSS files " + (new Date()).toString());
    gulp.src(sassFiles)
		.pipe(sass({ style: 'expanded' }))
					.pipe(autoprefixer("last 3 version","safari 5", "ie 8", "ie 9"))
		.pipe(gulp.dest(cssPath))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest(cssPath));
});

gulp.task('default', ['sass'] , function(){
    //Watch files changes in dev and also run nodemon
    if(env = "development"){
        gulp.watch(sassFiles, ['sass']);
        nodemon({
            script:'app.js',
            ext:'js',
            env:{
                PORT:process.env.PORT || 8081,
                NODE_ENV: process.env.NODE_ENV || env
            },
            ignore:['./node_modules/**']
        })
        .on('restart', function(){
                console.log("Restarting api..");
        })
    }
});
