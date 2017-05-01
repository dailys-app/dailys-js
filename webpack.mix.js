let mix = require('laravel-mix');

// Compile the js.
mix
    .webpackConfig(
        {
            output: {
                library: "dailys-js",
                libraryTarget: "umd"
            }
        }
    ).js('src/index.js', 'dist/');