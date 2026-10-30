const reporter = require("cucumber-html-reporter");
const fs = require("fs");
const path = require("path");
const jsonFile = path.resolve("reports/cucumber-report.json");

if (!fs.existsSync(jsonFile)) {
  console.error("Report JSON not found. Run tests first.");
  process.exit(1);
}

reporter.generate({
  theme: "bootstrap",
  jsonFile,
  output: path.resolve("reports/cucumber-html-report.html"),
  reportSuiteAsScenarios: true,
  launchReport: false,
  metadata: {
    Project: "Simple Playwright Cucumber Framework",
    Browser: "Chromium",
    Platform: process.platform
  }
});
console.log("Created reports/cucumber-html-report.html");