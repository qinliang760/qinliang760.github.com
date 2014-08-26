'use strict';
var chalk = require('chalk');
var util = require('util');
var path = require('path');
var compareVersion = require('compare-version');
var yeoman = require('yeoman-generator');
var pkgName = require('pkg-name');
var multiline = require('multiline');

var JqueryGenerator = module.exports = function JqueryGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

/*  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });*/

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
  this.compareVersion = compareVersion;
};

util.inherits(JqueryGenerator, yeoman.generators.NamedBase);

JqueryGenerator.prototype.askFor = function askFor() {
  var cb = this.async();
  var log = this.log;

  // welcome message
  var welcome = this.yeoman + multiline.stripIndent(function () {/*
    _Project Name_ should not contain "jquery" or "js" and should be a unique ID not already in use at plugins.jquery.com.

    _Project title_ should be a human-readable title, and doesn't need to contain the word "jQuery", although it may.

    For example, a plugin titled "Awesome Plugin" might have the name "awesome-plugin".

    For more information, please see the following documentation:

    Naming Your Plugin      http://plugins.jquery.com/docs/names/
    Publishing Your Plugin  http://plugins.jquery.com/docs/publish/
    Package Manifest        http://plugins.jquery.com/docs/package-manifest/
  */});

  log(welcome);

  var prompts = [{
    name: 'name',
    message: 'Project Plugin Name',
    default: this.appname/*,
    filter: function (input) {
      var done = this.async();

      pkgName(input, function (err, available) {
        if (!available.bower && !available.npm) {
          log.info(chalk.yellow(input) + ' already exists on npm and Bower. You might want to use another name.');
        }
        else {
          if (!available.bower) {
            log.info(chalk.yellow(input) + ' already exists on Bower. You might want to use another name.');
          }

          if (!available.npm) {
            log.info(chalk.yellow(input) + ' already exists on npm. You might want to use another name.');
          }
        }

        done(input);
      });
    }*/
  }, {
    name: 'description',
    default: 'A jQuery plugin for what.'
  }, {
    name: 'author_name'
  }, {
    name: 'version',
    default:'0.1.0'
  }, {
    name: 'bugs'
  }, {
    name: 'license',
    default: 'MIT'
  }];

  var nameToMessage = function (name) {
    return name.split('_').map(
      function (x) { return this._.capitalize(x); }.bind(this)
    ).join(' ') + ':';
  }.bind(this);

  // Generate prompt messages if only the name is defined.
  prompts.map(function (entry) {
    if (entry.message === undefined) {
      entry.message = nameToMessage(entry.name);
    }
    return entry;
  }.bind(this));

  this.currentYear = (new Date()).getFullYear();

  this.prompt(prompts, function (props) {
    this.props = props;
    // For easier access in the templates.
    this.slugname = this._.slugify(props.name);
    cb();
  }.bind(this));

};

JqueryGenerator.prototype.source = function source() {
  this.pluginPath='jquery.' + this.slugname + '.js';
  this.mkdir(this.pluginPath);
  this.mkdir("plugins");

  var jsPath=this.pluginPath+'/js',
      cssPath=this.pluginPath+'/css';

  this.mkdir(jsPath);
  this.mkdir(cssPath);
  //this.copy('src/jshintrc', this.pluginPath+'/src/.jshintrc');
  this.copy('js/jquery-1.7.2.min.js', 'plugins/jquery-1.7.2.min.js');
  this.copy('js/jquery.namespace.js', 'plugins/jquery.namespace.js');
  this.copy('js/core.js', 'plugins/core.js');

  this.copy('css/reset.css', 'plugins/reset.css');
  this.copy('css/base.css', 'plugins/base.css');  

  this.template('src/moudle.js', jsPath+'/jquery.' + this.slugname + '.js');
  this.template('src/moudle.css', cssPath+'/jquery.' + this.slugname + '.css');
  this.template('src/moudle.html', this.pluginPath+'/index.html');

};
/*JqueryGenerator.prototype.test = function test() {
  this.mkdir('test');
  this.copy('test/jshintrc', 'test/.jshintrc');
  this.template('test/name_test.js', 'test/jquery.' + this.slugname + '_test.js');
  this.template('test/name.html', 'test/jquery.' + this.slugname + '.html');
};*/
JqueryGenerator.prototype.projectfiles = function projectfiles() {
  //this.copy('editorconfig', '.editorconfig');
  //this.copy('jshintrc', '.jshintrc');
  //this.copy('gitignore', '.gitignore');
  //this.copy('travis.yml', '.travis.yml');

  //this.template('README.md');
  //this.template('Gruntfile.js');
  //this.template('_bower.json', 'bower.json');
  //this.template('_name.jquery.json', this.slugname + '.jquery.json');
  //this.template('_package.json', 'package.json');
  this.template('bowerrc', '.bowerrc');
  //this.copy('CONTRIBUTING.md', 'CONTRIBUTING.md');
};
