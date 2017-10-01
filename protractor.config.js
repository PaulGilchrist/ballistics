// Protractor uses selenium-webdriver
// These tests show...
//     Both Angular and non-Angular testing
//     iFrame testing (WYSIWYG)
//     Modal testing
//     Separate Windows testing (PDF)
//
// Even if not testing an Angular application, Protractor is easier to setup than a native Selenium server
//
// Must first install Chrome browser
// npm install -g protractor
// webdriver-manager update
//
// This next section is not needed bu follows the protractor tutorial
//    webdriver-manager start
//    WebDriver server will be at http://localhost:4444/wd/hub and accessable remotly
//    exports.config = {
//        params: {
//            runAllTests: true,
//        },
//        seleniumAddress: 'http://localhost:4444/wd/hub',
//        framework: 'jasmine',
//        specs: ['./src/**/*.e2e-spec.js' ],
//    }
//
// Make sure the server being tested (baseUrl) is running.
// Two ways to run:
//     protractor protractor.config.js
//     gulp test-e2e
//
// Hardest part of test automation is finding the right DOM element.
//     Suggest adding id or name tags to elements you know will need testing
//     XPath is not reliable enough

// Best way to test that element was found
//     svg.getAttribute('innerHTML')
//         .then((text) => {
//             console.log('inner HTML: ' + text);
//         },
//         (err) => {
//             console.log('ERROR: ' + err);
//         });
//
// Changes below this line that differ from https://github.com/angular/quickstart/blob/master/protractor.config.js
//    specs: ['./src/**/*.e2e-spec.js' ],
//    baseUrl: 'https://angular2template.azurewebsites.net',
//    onPrepare
//        browser.driver.manage().window().maximize();
//        browser.get('/home');

var fs = require('fs');
var path = require('canonical-path');
var _ = require('lodash');

exports.config = {
    params: {
      runAllTests: true,
    },

    directConnect: true,

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
      'browserName': 'chrome'
    },

    // Framework to use. Jasmine is recommended.
    framework: 'jasmine',

    // Spec patterns are relative to this config file
    specs: ['./src/**/*.e2e-spec.js' ],


    // For angular2 tests
    useAllAngular2AppRoots: true,

    // Base URL for application server
    baseUrl: 'https://angular2template.azurewebsites.net',

    // doesn't seem to work.
    // resultJsonOutputFile: "foo.json",

    onPrepare: function() {
        // browser.ignoreSynchronization = true;

        browser.driver.manage().window().maximize();
        browser.get('/home');

        // browser.manage().logs().get('browser').then(function(browserLogs) {
        //    // browserLogs is an array of objects with level and message fields
        //    browserLogs.forEach(function(log){
        //       if (log.level.value > 900) { // it's an error log
        //         console.log('Browser console error!');
        //         console.log(log.message);
        //       }
        //    });
        // });

        //// SpecReporter
        //var SpecReporter = require('jasmine-spec-reporter');
        //jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'none'}));
        //// jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));

        // debugging
        // console.log('browser.params:' + JSON.stringify(browser.params));
        jasmine.getEnv().addReporter(new Reporter( browser.params )) ;
    },

    jasmineNodeOpts: {
        defaultTimeoutInterval: 60000,
        // defaultTimeoutInterval: 10000,
        includeStackTrace: false,
        isVerbose: false,
        print: function() {},
        showTiming: true,
        showColors: true
    }
};

// Custom reporter
function Reporter(options) {
  var _defaultOutputFile = path.resolve(process.cwd(), './_test-output', 'protractor-results.txt');
  options.outputFile = options.outputFile || _defaultOutputFile;

  initOutputFile(options.outputFile);
  options.appDir = options.appDir ||  './';
  var _root = { appDir: options.appDir, suites: [] };
  log('AppDir: ' + options.appDir, +1);
  var _currentSuite;

  this.suiteStarted = function(suite) {
    _currentSuite = { description: suite.description, status: null, specs: [] };
    _root.suites.push(_currentSuite);
    log('Suite: ' + suite.description, +1);
  };

  this.suiteDone = function(suite) {
    var statuses = _currentSuite.specs.map(function(spec) {
      return spec.status;
    });
    statuses = _.uniq(statuses);
    var status = statuses.indexOf('failed') >= 0 ? 'failed' : statuses.join(', ');
    _currentSuite.status = status;
    log('Suite ' + _currentSuite.status + ': ' + suite.description, -1);
  };

  this.specStarted = function(spec) {

  };

  this.specDone = function(spec) {
    var currentSpec = {
      description: spec.description,
      status: spec.status
    };
    if (spec.failedExpectations.length > 0) {
      currentSpec.failedExpectations = spec.failedExpectations;
    }

    _currentSuite.specs.push(currentSpec);
    log(spec.status + ' - ' + spec.description);
  };

  this.jasmineDone = function() {
    outputFile = options.outputFile;
    //// Alternate approach - just stringify the _root - not as pretty
    //// but might be more useful for automation.
    // var output = JSON.stringify(_root, null, 2);
    var output = formatOutput(_root);
    fs.appendFileSync(outputFile, output);
  };

  function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (directoryExists(dirname)) {
      return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
  }

  function directoryExists(path) {
    try {
      return fs.statSync(path).isDirectory();
    }
    catch (err) {
      return false;
    }
  }

function initOutputFile(outputFile) {
    ensureDirectoryExistence(outputFile);
    var header = "Protractor results for: " + (new Date()).toLocaleString() + "\n\n";
    fs.writeFileSync(outputFile, header);
  }

  // for output file output
  function formatOutput(output) {
    var indent = '  ';
    var pad = '  ';
    var results = [];
    results.push('AppDir:' + output.appDir);
    output.suites.forEach(function(suite) {
      results.push(pad + 'Suite: ' + suite.description + ' -- ' + suite.status);
      pad+=indent;
      suite.specs.forEach(function(spec) {
        results.push(pad + spec.status + ' - ' + spec.description);
        if (spec.failedExpectations) {
          pad+=indent;
          spec.failedExpectations.forEach(function (fe) {
            results.push(pad + 'message: ' + fe.message);
          });
          pad=pad.substr(2);
        }
      });
      pad = pad.substr(2);
      results.push('');
    });
    results.push('');
    return results.join('\n');
  }

  // for console output
  var _pad;
  function log(str, indent) {
    _pad = _pad || '';
    if (indent == -1) {
      _pad = _pad.substr(2);
    }
    console.log(_pad + str);
    if (indent == 1) {
      _pad = _pad + '  ';
    }
  }

}
