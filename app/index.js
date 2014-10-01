'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var SimpleModuleGenerator = yeoman.generators.Base.extend({
  initializing: function() {
    this.pkg = require('../package.json');
  },

  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the incredible SimpleModule generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'moduleName',
      message: 'node.js module name:',
      default: path.basename(process.cwd())
    }, {
      type: 'input',
      name: 'moduleDesc',
      message: 'Module description'
    }, {
      type: 'input',
      name: 'keywords',
      message: 'Module keywords',
      filter: function(value) {
        if (typeof value === 'string') {
          value = value.split(',');
        }
        return value
          .map(function(val) {
            return val.trim();
          })
          .filter(function(val) {
            return val.length > 0;
          })
      }
    }, {
      type: 'input',
      name: 'githubName',
      message: 'Your github username:'
    }, {
      type: 'input',
      name: 'author',
      message: 'Author name:'
    }];

    this.prompt(prompts, function(props) {
      this.moduleName = this._.slugify(props.moduleName);
      this.moduleVarName = this._.camelize(props.moduleName);
      this.moduleDesc = props.moduleDesc;
      this.keywords = props.keywords;
      this.githubName = props.githubName;
      this.author = props.author;

      done();
    }.bind(this));
  },

  writing: {
    app: function() {
      this.src.copy('index.js', 'index.js');
      this.src.copy('test.js', 'test.js');
      this.template('_package.json', 'package.json');
    },

    projectfiles: function() {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
      this.src.copy('travis.yml', '.travis.yml');
      this.src.copy('gitignore', '.gitignore');
      this.template('LICENSE', 'LICENSE');
      this.template('README.md', 'README.md');
    }
  },

  end: function() {
    this.installDependencies();
  }
});

module.exports = SimpleModuleGenerator;
