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


  function scroll(n, offset, func1, func2){
    return new Waypoint({
      element: document.getElementById(n),
      handler: function(direction) {
        direction == 'down' ? func1() : func2();
      },
      //start 75% from the top of the div
      offset: offset
    });
  };


new scroll('step1', '75%', f3, f4);
new scroll('step2', '75%', f4, f5);
new scroll('step3', '75%', f5, f3);
