const { generateLess } = require('./src/helper');
const { css_class_prefix, breakpoints } = require('./src/config');
const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;

module.exports = {
    mode:"production",
    entry: './src/index.js',
    output: {
        filename: 'breakpoints.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        fallback: {
          fs: false
        }
    },

    plugins: [
        {
            apply:( compiler )=>{
                
                compiler.hooks.afterEmit.tap( 'AfterEmitPlugin', (compilation)=>{
                    
                    fs.writeFile('src/css.less', generateLess( css_class_prefix, breakpoints ) ,(err, data)=>{
                        if( err ) console.error("compilation err : ", err );

                        exec(' lessc src/css.less  dist/breakpoints.css ', ( err, stdout, stderr )=>{
                            if (stdout) process.stdout.write(stdout);
                            if (stderr) process.stderr.write(stderr);

                            // Minify
                            exec(' lessc dist/breakpoints.css --clean-css="--s1 --advanced"  dist/breakpoints.min.css ', ( err, stdout, stderr )=>{
                                if (stdout) process.stdout.write(stdout);
                                if (stderr) process.stderr.write(stderr);
                            });
                        });

                        
                    })
                })
            }
        }
    ]
};