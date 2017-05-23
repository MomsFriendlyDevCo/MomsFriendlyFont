var ghPages = require('gulp-gh-pages');
var gulp = require('gulp');
var fontcustom = require('gulp-fontcustom');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');

gulp.task('default', ['build']);
gulp.task('build', function(cb) {
	runSequence('build:fontcustom', 'build:correctCSSPaths', cb)
});

gulp.task('build:fontcustom', ()=>
	gulp.src('./svg')
		.pipe(fontcustom({
			font_name: 'moms-friendly-font',
			'css-selector': '.mf-{{glyph}}'
		}))
		.pipe(gulp.dest('./dist'))
);

gulp.task('build:correctCSSPaths', ()=>
	gulp.src(['./dist/*.css', './dist/*.scss'])
		.pipe(replace('./moms-friendly-font', '/fonts/moms-friendly-font'))
		.pipe(gulp.dest('./dist'))
);


gulp.task('gh-pages', ['build'], function() {
	rimraf.sync('./gh-pages');

	return gulp.src([
		'./LICENSE',
		'./dist/**/*',
	], {base: __dirname})
		.pipe(rename(function(path) {
			if (path.basename == 'moms-friendly-font-preview') { // Change main file to index.html
				path.basename = 'index';
				path.dirname = '.';
			} else if (path.dirname == 'dist') { // Move all demo files into root
				path.dirname = '.';
			}
			return path;
		}))
		.pipe(ghPages({
			cacheDir: 'gh-pages',
			push: false, // Change to false for dryrun (files dumped to cacheDir)
		}))
});
