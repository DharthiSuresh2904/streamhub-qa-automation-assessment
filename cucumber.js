module.exports = {
 default: { require: ['support/world.js','support/hooks.js','step-definitions/**/*.js'],
 format: ['progress','html:reports/cucumber-report.html','json:reports/cucumber-report.json'],
 publishQuiet: true, parallel: 0 }
};
