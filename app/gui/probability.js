/**
 * Executes the probability of getting color combinations given:
 * - A list of colors (strings)
 * - How many items will be chosen.
 * 
 * Assumptions:
 * - There is an equal distribution of colors at the start of every run
 * 
 * @returns A unicorn emoji 🦄 upon completion
 */

//INCLUDES
const CLI = require("clui"),
  clc = require("cli-color");

module.exports = function(colors, pick) {
  CLI.Clear();
  return new Promise((resolve, reject) => {
    const Line = CLI.Line,
      LineBuffer = CLI.LineBuffer;

    const outputBuffer = new LineBuffer({
      x: 0,
      y: 0,
      width: "console",
      height: "console"
    });

    const message = new Line(outputBuffer)
      .column(
        `The chances of getting color combinations from ${colors.join(",")}:`,
        "console",
        [clc.white]
      )
      .fill()
      .store();

    const blankLine = new Line(outputBuffer).fill().store();

    // ================= Work Goes Here ...

    // // For each color, calculate the probability of getting certain combinations
    // let numberOfColors = colors.length;
    // colors.forEach(color => {
    //   let line = new Line(outputBuffer)
    //     .column(`${color}`, 20, [clc[color] ? clc[color] : clc.white])
    //     .column(CLI.Gauge(3, 10, 20, 0, "###"))
    //     .fill()
    //     .store();
    // });

    outputBuffer.output();

    resolve("🦄");
  });
};
