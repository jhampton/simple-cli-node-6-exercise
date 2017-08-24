// App-scoping require (via https://gist.github.com/branneman/8048520)
// There are a lot of great options here, but I'm using this one because it
// has some interesting options for communicating local vs global modules, shadowing,
// etc.

global.appRequire = function(name) {
  return require(__dirname + "/" + name);
};

const funOptions = appRequire("app/options/options");
const funGUI = appRequire("app/gui/probability");

funOptions()
  .then(e => funGUI(e.colors, e.pick))
  .then(e => console.log(e))
  .catch(e => {
    console.log(e);
  });
