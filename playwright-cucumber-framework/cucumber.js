module.exports = {
  default: {
    requireModule: ["ts-node/register"],
    require: ["features/support/**/*.ts", "features/step-definitions/**/*.ts"],
    paths: ["features/**/*.feature"],
    format: ["progress", "json:reports/cucumber-report.json"],
    publishQuiet: true,
    parallel: 1,
    timeout: 60000
  }
};