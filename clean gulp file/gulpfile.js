var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('compress', function (cb) {
  pump([
        gulp.src('lib/*.js'),
        uglify(),
        gulp.dest('main/js')
    ],
    cb
  );
});


var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

//sass
gulp.task('sass', function(){
	return gulp.src('sass/*.scss')
	.pipe(sass())
	.pipe(autoprefixer(autoprefixerOptions))
	.pipe(gulp.dest('main/css'))

});



//webserver
gulp.task('webserver', function(){
	return gulp.src('main')
	.pipe(webserver({
		port: 4000,
		livereload: true,
		open: true
	}));

});

//watch
gulp.task('watch', function(){
	gulp.watch('sass/*.scss', ['sass']);
})


//default task
gulp.task('default', ['sass', 'webserver', 'watch', 'compress']);
