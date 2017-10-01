const gulp = require('gulp');
var gutil = require('gutil');
var argv = require('yargs').argv;
var del = require('del');
var exec = require('child_process').exec;
var git = require('gulp-git');
var install = require('gulp-install');
var karma = require('karma').Server;
var sequence = require('gulp-sequence')
var webpack = require('webpack');
var webpackConfig = require('./config/webpack.prod.js');

//Add paramteter "--docker" to build Docker image as part of build or commit task

//run "gulp commit -m "commit message" to test, build, and check-in to source control all in one step
//      Any failures along the way will be reported to the console and the process will stop

// run "gulp build" to test and build the application
//      This will not check-in to source control source control checkin

// run "gulp test" to discover and run all unit tests (spec.ts) files and display results
//      This will test the app without building or source control checkin

// run "gulp test-e2e" to discover and run all end to end tests (e2e-spec.ts) files and display results
//      This will test the app without building or source control checkin

//The remaining tasks are not usually run from the command prompt and used only inside of other tasks

var docker = {
    build: (argv.docker !== undefined), //If --docker is passed in as a paramater, build process will also build docker image
    repository: 'paulgilchrist', //Can be blank "" if only stored locally
    image: {
        name: 'angular2template', // Should not include tags.  Tags will auto-generate based on os and webserver
        os: 'windows', // Options are "windows" or "linux"
        webserver: 'node' // Options are "node" or "iis" if os=windows or only "node" if os=linux
    }
}

var gitRepo = {
    primary: 'dev',
    secondary: 'https://paulgilchrist.visualstudio.com/_git/AngularTemplate' //Set to null if there is no secondary repo
}

var paths = {
    source: "./src/",
    target: "./build/",
    css: [
        'node_modules/font-awesome/css/font-awesome.min.css',
    ],
    fonts: [
        'node_modules/bootstrap/fonts/*',
        'node_modules/font-awesome/fonts/*'
    ],
    js: [
        'node_modules/jquery/dist/jquery.min.js',
    ],
};

gulp.task('build', function (done) {
        sequence('test', ['copyFiles', 'pack'], 'packageInstall', 'docker-build', done);
})

gulp.task('commit', function (done) {
    //Don't waist time building if no commit message was passed in
    var commitMessage = argv.m;
    if(commitMessage === undefined) {
         gutil.log('Commit mMessage required: -m "commit message"');
    } else {
         sequence('build', 'git-checkin', 'git-push', 'docker-push', done);
        // Missing step git pull before push
    }
});

gulp.task('docker-build', function(done) {
    if(!docker.build) {
        gutil.log('Skipping Docker build step.  use "--docker" to include this step');
        done();
    } else {
        exec('docker build -f ' + getDockerFileName() + ' -t ' + getDockerImageFullName() + ' .', function(err, stdout, stderr) {
            if (err) {
                gutil.log(err);
            } else {
                gutil.log(stdout);
                done();
            }
        });
    }
});

gulp.task('docker-push', function(done) {
    if(!docker.build) {
        gutil.log('Skipping Docker push step.  use "--docker" to include this step');
        done();
    } else {
        exec('docker push ' + getDockerImageFullName(), function(err, stdout, stderr) {
            if (err) {
                gutil.log(err);
            } else {
                gutil.log(stdout);
                done();
            }
        });
    }
});

gulp.task('git-checkin', function (done) {
    var commitMessage = argv.m;
    if(commitMessage === undefined) {
         gutil.log('Commit mMessage required: -m "commit message"');
    } else {
         return gulp.src('.')
            .pipe(git.add())
            .pipe(git.commit(commitMessage));
    }
});

gulp.task('git-push', function (done) {
    git.push('origin', gitRepo.primary, function(err) {
        if(err) {
            gutil.log('[git-push] Error\n' + err);
        } else {
            if(gitRepo.secondary === null) {
                done();
            } else {
                exec('git push --repo=' + gitRepo.secondary, function(err, stdout, stderr) {
                    if (err) {
                        gutil.log('[git-push] Error pushing to secondary repository\n' + err);
                    } else {
                        gutil.log(stdout + stderr);
                        done();
                    }
                });
            }
        }
    });
});

gulp.task('clean', function () {
    return del.sync([paths.target + '**']);
});

gulp.task('copyRoot', function () {
    return gulp.src([paths.source + '*.*', '!' + paths.source + '*.ts']).pipe(gulp.dest(paths.target));
});

gulp.task('copyAppCss', function () {
    return gulp.src(paths.source + 'css/*.css').pipe(gulp.dest(paths.target + 'css'));
});

gulp.task('copyVendorCss', function () {
    return gulp.src(paths.css).pipe(gulp.dest(paths.target + 'css'));
});

gulp.task('copyVendorFonts', function () {
    return gulp.src(paths.fonts).pipe(gulp.dest(paths.target + 'fonts'));
});

gulp.task('copyVendorJs', function () {
    return gulp.src(paths.js).pipe(gulp.dest(paths.target + 'js'));
});

gulp.task('copyFiles', function (done) {
      sequence('clean', ['copyRoot', 'copyAppCss', 'copyVendorCss', 'copyVendorFonts', 'copyVendorJs'], done);
});

gulp.task('pack', function(done) {
   return webpack(webpackConfig, function(err, stats) {
       if(err || (stats.compilation.errors && stats.compilation.errors.length)) {
            gutil.log('[pack] Error\n' + stats.compilation.errors);
       } else {
            gutil.log('[pack] Completed\n' + stats.toString({
                assets: true,
                chunks: false,
                chunkModules: false,
                colors: true,
                hash: false,
                timings: false,
                version: false
            }));
            done();
       }
    });
});

gulp.task('packageInstall', function() {
    return gulp.src([paths.target + 'package.json']).pipe(install());
});

// Run test once and exit
gulp.task('test', function (done) {
    return karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function(err) {
        if (err) {
            //No need to log the error as Karma will have already logged it
        } else {
            done();
        }
    });
});

gulp.task('test-e2e', function (done) {
    var command = 'protractor protractor.config.js';
    //Local examples: gulp test-e2e --baseUrl http://localhost:3000
    //Dev environment example: gulp test-e2e --baseUrl https://angular2template.azurewebsites.net
    //Docker container example: gulp test-e2e --baseUrl http://<containerip>:<containerport>
    var baseUrl = argv.baseUrl;
    if(baseUrl !== undefined) {
        command += ' --baseUrl ' + baseUrl
    }
    exec(command, function(err, stdout, stderr) {
        gutil.log(stdout + stderr);
        if (!err) {
            done();
        }
    });
});

function getDockerFileName() {
    var dockerFileName = 'Dockerfile.';
    if(docker.image.os==='linux') {
        dockerFileName += 'node.linux';
    } else {
        if(docker.image.webserver==='node') {
            dockerFileName += 'node.nano';
        } else {
            dockerFileName += 'iis.nano';
        }
    }
    return dockerFileName;
};

function getDockerImageFullName() {
    var dockerImageName = docker.image.name;
    if(docker.repository !== '') {
        dockerImageName = docker.repository + '/' + docker.image.name;
    }
    if(docker.image.os==='linux') {
        dockerImageName += ':nodelinux';
    } else {
        if(docker.image.webserver==='node') {
            dockerImageName += ':nodenano';
        } else {
            dockerImageName += ':iisnano';
        }
    }
    return dockerImageName;
};
