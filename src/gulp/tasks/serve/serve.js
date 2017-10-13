const webserver = require('gulp-webserver');

module.exports = (gulp, PATH, $) => {
  return () => {
    gulp.src(`${ PATH.dist }/`)
        .pipe(webserver({
            fallback: '/',
            livereload: false,
            open: false,
            port: `${ PATH.port }`,
            host: '0.0.0.0',
            directoryListing: {
                enable: true,
                path: `${ PATH.dist }/`
            }
        }));
  }
}