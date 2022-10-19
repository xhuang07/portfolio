import scrollama from "scrollama"; // or...
const scrollama = require("scrollama");

// instantiate the scrollama
const scroller = scrollama();

// setup the instance, pass callback functions
scroller
  .setup({
    step: ".step",
  })
  .onStepEnter((response) => {
    // { element, index, direction }
  })
  .onStepExit((response) => {
    // { element, index, direction }
  });

  