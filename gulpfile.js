/**************************************************

 TASK RUNNER CONFIG - EVERY TIME YOU EDIT THIS, IT
 REQUIRES TO STOP GULP AND REDO GULP WATCH

 ---------------------------------------------------
 REQUIREMENTS:
 Keep your modules updated by typing 'npm install' in the root of your project
 Node will automatically download the updated packages in the node_modules folder, by scanning
 the package.json file. If a package requires some dependencies, Node will download dependencies too.
 ---------------------------------------------------

 **************************************************/

var keepDebug     = true;         // If true keeps console.log and debugger statements in the distribution files
var consoleOption = {theme: ''};
var theme 		  =  consoleOption.theme ? consoleOption.theme :'custom_pkg';  // Skin name
var js 			  = {};
var framework	  = {};
var css 		  = {};
var magento 	  = {};
var external 	  = {};
var xml           = {};


/* Magento core */
magento.source  = [
    'js/prototype/prototype.js',
    'js/prototype/validation.js',

    'js/varien/js.js',
    'js/varien/form.js',
    /* 'js/varien/menu.js', */
    'js/varien/product.js',
    'js/varien/configurable.js',

    'js/lib/ccard.js',

    'js/scriptaculous/builder.js',
    'js/scriptaculous/effects.js',
    'js/scriptaculous/controls.js',
    'js/scriptaculous/slider.js',

    'js/mage/cookies.js',
    'js/mage/translate.js',

    'js/calendar/calendar.js',
    'js/calendar/calendar-setup.js',

    'js/onestepcheckout/onestepcheckout.js',
    'js/onestepcheckout/window.js',

    'js/globalcollect/payment.js',
    'js/awrma/aw_rma.js',
];

/* Frameworks */
framework.folder = 'js/core/';
framework.source = [
    'js/core/dev/_framework/jquery.min.js',
    'js/core/dev/_framework/foundation.min.js',
    'js/core/dev/_framework/underscore.min.js',
    'js/core/dev/_framework/page.js'
];
framework.dest   = 'dist/';

/* Javascript */
js.folder        = 'js/core/';
js.source        = [
    //'js/core/dev/_framework/_plugins/**/*.js',

    'js/core/dev/_framework/_plugins/bowser.min.js',
    'js/core/dev/_framework/_plugins/fastclick.js',
    //'js/core/dev/_framework/_plugins/jquery.matchHeight.js',
    'js/core/dev/_framework/_plugins/resize-manager.js',
    'js/core/dev/_framework/_plugins/jquery.unveil.js',
    // 'js/core/dev/_framework/_plugins/fake-placeholder.js',
    // 'js/core/dev/_framework/_plugins/jquery.slimscroll.min.js',
    // 'js/core/dev/_framework/_plugins/jquery.placeholder.js',

    'js/core/dev/_framework/_plugins/photoswipe.min.js',
    'js/core/dev/_framework/_plugins/photoswipe-ui-default.min.js',

    'js/core/dev/_framework/_plugins/showmore.js',
    'js/core/dev/_framework/_plugins/slick.min.js',
    'js/core/dev/_framework/_plugins/TweenMax.min.js',
    'js/core/dev/_framework/_plugins/menu-organizer.js',
    'js/core/dev/_framework/_plugins/tga-tabs.js',

    'js/core/dev/_partials/homepage.js',
    'js/core/dev/_partials/listing.js',
    //'js/core/dev/_partials/pin-slider.js',
    'js/core/dev/_partials/product-view.js',
    'js/core/dev/_partials/checkout.js',
    'js/core/dev/_partials/widgets.js',
    //'js/core/dev/_partials/corporate.js',

    'js/core/dev/main.js'
];
js.dest          = 'dist/';

/* CSS & SCSS */
css.folder       = 'skin/frontend/'+ theme +'/custom_theme/';
css.source       = '';
css.dest         = 'css/';

/* Externals */
external.folder  = 'js/tbuy/';
external.source  = 'dev/';
external.dest    = 'dist/';

/* XML */
xml.watcher      = [
    'app/design/frontend/'+ theme +'/custom_theme/layout/**/*.xml',
    'app/design/frontend/base/default/layout/**/*.xml'
];

/* Load modules */
var
    gulp 		 = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass 		 = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    rename 		 = require('gulp-rename'),
    concat 		 = require('gulp-concat'),
    notify 		 = require('gulp-notify'),
    livereload 	 = require('gulp-livereload'),
    plumber      = require('gulp-plumber'),
    debug        = require('gulp-debug'),
    clean        = require('gulp-clean');

// Application CSS builder
// For unminified CSS files use: outputStyle: 'expanded'
gulp.task('appCSS', function() {

    return gulp
        .src( css.folder + 'scss/*.scss' )
        .pipe( plumber() )
        .pipe( sourcemaps.init() )
        .pipe( sass( { includePath: 'node_modules/sass-list-maps', outputStyle: 'expanded' } ))
        .pipe( autoprefixer(['last 15 versions','> 1%','ie 8','ie 7'] , {cascade:true} ))
        .pipe( sourcemaps.write('./') )
        .pipe( gulp.dest( css.folder + css.dest ) );

});

// Frameworks builder
gulp.task('appFramework', function() {

    return gulp
        .src( framework.source )
        .pipe( plumber() )

        .pipe( concat('framework.min.js') )
        .pipe( gulp.dest( framework.folder + framework.dest ) );

});

// Application builder
gulp.task('appJS', function() {

    return gulp
        .src( js.source )
        .pipe( plumber() )
        .pipe( concat('app.min.js') )
        .pipe( gulp.dest( js.folder + js.dest ) );

});

// Magento's core builder
gulp.task('magentoJS', function() {

    return gulp
        .src( magento.source )
        .pipe( plumber() )

        .pipe( concat('magento-core.min.js') )
        .pipe( gulp.dest( js.folder + js.dest ) );

});

// Tbuy externals builder
gulp.task('externalJS', function() {

    return gulp
        .src( external.folder + external.source + '**/*.js' )
        .pipe( plumber() )
        .pipe( concat('tbuy-externals.min.js') )
        .pipe( gulp.dest( external.folder + external.dest ) );

});

// Clean the cache
gulp.task('cleanCache', function() {

    return gulp
        .src( [ 'var/cache' ] )
        .pipe( clean({ force: true }))
        .pipe( notify( { message: 'Cache clean executed' }) );

});

// Execute a watch on those files, then start the related task
gulp.task('watch',['magentoJS', 'externalJS', 'appFramework', 'appJS', 'appCSS'], function() {

    // Watch .scss files
    gulp.watch( css.folder + css.source + 'scss/**/*.scss', [ 'appCSS' ] );

    // Watch .js files
    gulp.watch( [ js.folder + 'dev/**/*.js' ], [ 'appFramework', 'appJS' ] );

    gulp.watch( [ external.folder + external.source + '**/*.js' ], [ 'magentoJS', 'externalJS' ]);

    // Watch .xml files
    gulp.watch( xml.watcher, [ 'cleanCache' ] );

    // Create LiveReload server
    livereload.listen();

    // Livereload on destination folder change
    gulp.watch(
        [
            js.folder + js.dest + '**/*.js',
            css.folder + css.dest + '**/*.css'
        ]
    )
        .on( 'change', livereload.changed );

});

gulp.task('default',['watch']);