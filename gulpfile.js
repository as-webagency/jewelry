var { src, dest, watch, series } = require( 'gulp' ),
    browserSync = require( 'browser-sync' ).create(),
    cleanCSS = require('gulp-clean-css'),
    minify = require('gulp-minify'),
    tinypng = require('gulp-tinypng-compress');

// Static server
function bs() {
    browserSync.init({
        server: {
            baseDir: "./src/"
        }
    });
    watch( "./src/*.html" ).on( 'change', browserSync.reload );
    watch( "./src/css/*.css" ).on( 'change', browserSync.reload );
    watch( "./src/js/*.js" ).on( 'change', browserSync.reload );
}

// CSS
function buildCSS( done ) {
    src( './src/css/**.css' )
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(dest( './dist/css/' ));
    done();
}

// JS
function buildJS( done ) {
    src( './src/js/**.js' )
        .pipe(minify({
            ext:{
                src:'.min.js',
                min:'.js'
            }
        }))
        .pipe(dest( './dist/js/' ));
    done();
}

// fonts
function fonts( done ) {
    src( './src/fonts/**' )
        .pipe(dest( './dist/fonts/' ));
    done();
}

// Image
function imagemini( done ) {
    src( './src/image/**/**' )
        .pipe(tinypng({
            key: '3GY9jGdpWdJtkS0gBY34DMPsd5mx5MnS'
        }))
        .pipe(dest( './dist/image/' ));
    done();
}

function html( done ) {
    src( './src/*.html' )
        .pipe(dest( './dist/' ));
    done();
}

exports.serve = bs;
exports.build = series( buildCSS, buildJS, fonts, imagemini, html );