
const { src, dest, watch, series, parallel } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const server = require('gulp-webserver');


// Setup paths to assets
const projectName = ".";
const files = { 
    inputPath: projectName + '/app/',
    ouputPath: projectName + '/dist/'
}

// Sass task: compiles the style.scss file into style.css
function scssTask(){    
    return src(files.inputPath + '*.scss')
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass()) // compile SCSS to CSS
        .pipe(postcss([cssnano()])) // PostCSS plugins
        .pipe(rename('app.min.css'))
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest(files.ouputPath + 'css')
    ); // put final CSS in dist folder
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask(){
    return src([
        files.inputPath + '*.js'
        //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
        ])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(dest(files.ouputPath + 'js')
    );
}

// Basic Webserver 
function serverTask(){
    return src(['.'])
        .pipe(server({
            fallback: 'index.html',
            defaultFile: 'index.html',
            port: 80,
            livereload: true,
            directoryListing: false,
            open: true
        })
    );
}

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask(){
    watch([files.inputPath + '*.scss', files.inputPath + '*.js'],
        {interval: 500, usePolling: true}, //Makes docker work
        series(
            parallel(scssTask, jsTask),
        )
    );    
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(
    parallel(scssTask, jsTask, serverTask), 
    watchTask
);