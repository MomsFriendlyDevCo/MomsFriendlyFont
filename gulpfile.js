var gulp = require('gulp');
var fontcustom = require('gulp-fontcustom');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');

gulp.task('default', ['build']);
gulp.task('build', function(cb) {
	runSequence('fontcustom', 'correctPaths', cb)
});

gulp.task('fontcustom', function() {
	gulp.src('./svg')
		.pipe(fontcustom({
			font_name: 'moms-friendly-font',
			'css-selector': '.mf-{{glyph}}'
		}))
		.pipe(gulp.dest('./dist'))
});

gulp.task('correctPaths', function() {
	gulp.src(['./dist/*.css', './dist/*.scss'])
		.pipe(replace('./moms-friendly-font', '/fonts/moms-friendly-font'))
		.pipe(gulp.dest('./dist'))
});
