/**
 * Options
 * 
 * This is the CLI Parameter handling function
 * 
 * @returns Promise that resolves with an object containing the parameters
 */

//  INCLUDES
const options = require("commander");
const otherAppRequire = appRequire("app/gui/config");

// Command-Line Options
// TODO: Better array detection for options (REGEX + Underscore isArrayLikeObject?)
const funOptions = [
  {
    name: "colors",
    short: "-c, --colors [colors]",
    desc:
      "A comma-separated list of colors from which to choose (no spaces, please)",
    required: true,
    coerce: e => e.split(",").filter(v => v.length),
    valid: e => e && e.length
  },
  {
    name: "pick",
    short: "-p, --pick <pick>",
    desc: "The number of items to pick from the container",
    required: true,
    valid: e => e && !isNaN(e) && parseInt(e)
  }
];

module.exports = function() {
  // Set our version
  // TODO - get this dynamically from package.json
  options.version("1.0.0");

  // Add our options from funOptions
  for (funOption of funOptions) {
    options.option(funOption.short, funOption.desc, funOption.coerce);
  }

  // TODO: Provide a more useful help
  // options.outputHelp(() => {});

  // Parse after all options and help have been set.
  options.parse(process.argv);

  // Validate options
  let valid = true;
  let validMessages = [];
  for (funOption of funOptions) {
    if (funOption.required && !funOption.valid(options[funOption.name])) {
      valid = false;
      validMessages.push({
        param: funOption.name,
        message: `Please provide the ${funOption.short} parameter: ${funOption.desc}`
      });
    }
  }

  return new Promise((resolve, reject) => {
    if (valid) {
      resolve(
        funOptions.reduce((p, c) => {
          p[c.name] = options[c.name];
          return p;
        }, {})
      );
    }

    reject(
      validMessages.reduce((previous, current) => {
        return `${previous}\n${current.param}\t\t${current.message}`;
      }, "The following parameters are required:")
    );
  });
};
