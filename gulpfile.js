// load plugins
var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins({ pattern: ['*'] });

// set variables
now     = plugins.dateformat(new Date(), "yyyy-mm-dd, HH:MM");
pkg     = require('./package.json');
banner  = ['/*!',
        ' * ChromaCSS, (c) 2016 Neonpastell GmbH',
        ' * <%= pkg.homepage %>',
        ' *',
        ' * @version <%= pkg.version %>',
        ' * @date <%= this.now %>',
        ' */',
        ''].join('\n');

// compile website
gulp.task('css:docs', function() {
    return gulp.src('./docs/scss/*.scss')
        .pipe(plugins.sass( {outputStyle:'expanded', indentWidth:4} ))
        .pipe(plugins.autoprefixer('last 2 version'))
        .pipe(plugins.header(banner, { pkg : pkg }))
        //.pipe(plugins.cleanCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('./docs/css/'))
        .pipe(plugins.notify({ message: 'docs.css compiled' }));
});


// compile chroma
gulp.task('css:dev', function() {
    return gulp.src('./scss/*.scss')
        .pipe(plugins.sass( {outputStyle:'expanded', indentWidth:4} ))
        .pipe(plugins.autoprefixer('last 6 version'))
        .pipe(plugins.header(banner, { pkg : pkg }))
        .pipe(plugins.rename('chroma.css'))
        .pipe(gulp.dest('./css/'))
        .pipe(plugins.notify({ message: 'chroma.css compiled' }));
});

gulp.task('css:dist', function() {
    return gulp.src('./scss/*.scss')
        .pipe(plugins.sass( {outputStyle:'expanded', indentWidth:4} ))
        .pipe(plugins.autoprefixer('last 6 version'))
        .pipe(plugins.header(banner, { pkg : pkg }))
        .pipe(plugins.cleanCss({compatibility: 'ie8'}))
        .pipe(plugins.rename('chroma.min.css'))
        .pipe(gulp.dest('./css/'))
        .pipe(plugins.notify({ message: 'chroma.min.css compiled' }));
});



// version bumping
gulp.task('bump',       function() { bump_version('patch') });
gulp.task('bump:patch', function() { bump_version('patch') });
gulp.task('bump:minor', function() { bump_version('minor') });
gulp.task('bump:major', function() { bump_version('major') });
function bump_version(type) {
    gulp.src('./package.json').pipe(plugins.bump({key: 'version', type:type, indent: 4})).pipe(gulp.dest('./'));
    gulp.src('./bower.json').pipe(plugins.bump({key: 'version', type:type, indent: 4})).pipe(gulp.dest('./'));
}




// watch tasks
gulp.task('watch', function() {
    gulp.watch('./docs/scss/**/*.scss', ['css:docs']);
    plugins.livereload.listen();
    gulp.watch([
            './docs/css/styles.css', 
            './docs/**/*.html'
        ]).on('change', plugins.livereload.changed);
});



gulp.task('default',     ['css:docs', 'css:dev', 'css:dist', 'watch']);
gulp.task('dist',        ['css:docs', 'css:dev', 'css:dist']);