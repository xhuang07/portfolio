/**
 * @license
 * Lodash (Custom Build) lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
 * Build: `lodash include="throttle"`
 */
;(function(){function t(){}function e(t){return null==t?t===l?d:y:I&&I in Object(t)?n(t):r(t)}function n(t){var e=$.call(t,I),n=t[I];try{t[I]=l;var r=true}catch(t){}var o=_.call(t);return r&&(e?t[I]=n:delete t[I]),o}function r(t){return _.call(t)}function o(t,e,n){function r(e){var n=d,r=g;return d=g=l,x=e,v=t.apply(r,n)}function o(t){return x=t,O=setTimeout(c,e),T?r(t):v}function i(t){var n=t-h,r=t-x,o=e-n;return w?k(o,j-r):o}function f(t){var n=t-h,r=t-x;return h===l||n>=e||n<0||w&&r>=j}function c(){
    var t=D();return f(t)?p(t):(O=setTimeout(c,i(t)),l)}function p(t){return O=l,S&&d?r(t):(d=g=l,v)}function s(){O!==l&&clearTimeout(O),x=0,d=h=g=O=l}function y(){return O===l?v:p(D())}function m(){var t=D(),n=f(t);if(d=arguments,g=this,h=t,n){if(O===l)return o(h);if(w)return O=setTimeout(c,e),r(h)}return O===l&&(O=setTimeout(c,e)),v}var d,g,j,v,O,h,x=0,T=false,w=false,S=true;if(typeof t!="function")throw new TypeError(b);return e=a(e)||0,u(n)&&(T=!!n.leading,w="maxWait"in n,j=w?M(a(n.maxWait)||0,e):j,S="trailing"in n?!!n.trailing:S),
    m.cancel=s,m.flush=y,m}function i(t,e,n){var r=true,i=true;if(typeof t!="function")throw new TypeError(b);return u(n)&&(r="leading"in n?!!n.leading:r,i="trailing"in n?!!n.trailing:i),o(t,e,{leading:r,maxWait:e,trailing:i})}function u(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}function f(t){return null!=t&&typeof t=="object"}function c(t){return typeof t=="symbol"||f(t)&&e(t)==m}function a(t){if(typeof t=="number")return t;if(c(t))return s;if(u(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;
    t=u(e)?e+"":e}if(typeof t!="string")return 0===t?t:+t;t=t.replace(g,"");var n=v.test(t);return n||O.test(t)?h(t.slice(2),n?2:8):j.test(t)?s:+t}var l,p="4.17.5",b="Expected a function",s=NaN,y="[object Null]",m="[object Symbol]",d="[object Undefined]",g=/^\s+|\s+$/g,j=/^[-+]0x[0-9a-f]+$/i,v=/^0b[01]+$/i,O=/^0o[0-7]+$/i,h=parseInt,x=typeof global=="object"&&global&&global.Object===Object&&global,T=typeof self=="object"&&self&&self.Object===Object&&self,w=x||T||Function("return this")(),S=typeof exports=="object"&&exports&&!exports.nodeType&&exports,N=S&&typeof module=="object"&&module&&!module.nodeType&&module,E=Object.prototype,$=E.hasOwnProperty,_=E.toString,W=w.Symbol,I=W?W.toStringTag:l,M=Math.max,k=Math.min,D=function(){
    return w.Date.now()};t.debounce=o,t.throttle=i,t.isObject=u,t.isObjectLike=f,t.isSymbol=c,t.now=D,t.toNumber=a,t.VERSION=p,typeof define=="function"&&typeof define.amd=="object"&&define.amd?(w._=t, define(function(){return t})):N?((N.exports=t)._=t,S._=t):w._=t}).call(this);

// This function will run a throttled script every 300 ms
var checkHeader = _.throttle(() => { 
    console.log('checkHeader');

    // Detect scroll position
    let scrollPosition = Math.round(window.scrollY);

    // If we've scrolled 100px, add "sticky" class to the header
    if (scrollPosition > 50){
        document.querySelector('header').classList.add('sticky');
    }
    // If not, remove "sticky" class from header
    else {
        document.querySelector('header').classList.remove('sticky');
    }
}, 300);

// Run the checkHeader function every time you scroll
window.addEventListener('scroll', checkHeader);


//cursor
const updateProperties = (elem, state) => {
    elem.style.setProperty('--x', `${state.x}px`)
    elem.style.setProperty('--y', `${state.y}px`)
    elem.style.setProperty('--width', `${state.width}px`)
    elem.style.setProperty('--height', `${state.height}px`)
    elem.style.setProperty('--radius', state.radius)
    elem.style.setProperty('--scale', state.scale)
  }
  
  document.querySelectorAll('.cursor').forEach(cursor => {
    let onElement
  
    const createState = e => {
      const defaultState = {
        x: e.clientX,
        y: e.clientY,
        width: 40,
        height: 40,
        radius: '50%'
      }
  
      const computedState = {}
  
      if (onElement != null) {
        const { top, left, width, height } = onElement.getBoundingClientRect()
        const radius = window.getComputedStyle(onElement).borderTopLeftRadius
        // computedState.x = left + width / 2
        // computedState.y = top + height / 2
        // computedState.width = width
        // computedState.height = height
        // computedState.radius = radius
      }
  
      return {
        ...defaultState,
        ...computedState
      }
    }
  
    document.addEventListener('mousemove', e => {
      const state = createState(e)
      updateProperties(cursor, state)
    })
  
    document.querySelectorAll('a, button').forEach(elem => {
      elem.addEventListener('mouseenter', () => (onElement = elem))
      elem.addEventListener('mouseleave', () => (onElement = undefined))
    })
  })
  
  // Enable hidden nav bar
  {
    const nav = document.querySelector(".nav");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", ()=>{
      if (lastScrollY < window.scrollY){
        document.querySelector('nav').classList.add('nav--hidden');
      }else {
        document.querySelector('nav').classList.remove("nav--hidden");
      }
      lastScrollY = window.scrollY
    })
  }


// Timer counter
var startDateTime = new Date(2018,2,26,2,1,0,0); // YYYY (M-1) D H m s (start time and date from DB)
var startStamp = startDateTime.getTime();

var newDate = new Date();
var newStamp = newDate.getTime();

var timer;

function updateClock() {
    newDate = new Date();
    newStamp = newDate.getTime();
    var diff = Math.round((newStamp-startStamp)/1000);
    
    var year = Math.floor(diff/(24*60*60*365));
    diff = diff-(year*24*60*60*365);
    var month = Math.floor(diff/(24*60*60*31));
    diff = diff-(month*24*60*60*31);  
    var d = Math.floor(diff/(24*60*60));
    diff = diff-(d*24*60*60);
    var h = Math.floor(diff/(60*60));
    diff = diff-(h*60*60);
    var m = Math.floor(diff/(60));
    diff = diff-(m*60);
    var s = diff;
    
    // document.getElementById("time-elapsed").innerHTML = year+ "year(s)" + d +" day(s), "+h+" hour(s), "+m+" minute(s), "+s+" second(s) working";
    document.getElementById("time-elapsed").innerHTML = year+ "yrs " + month+"mos " + d+"ds " + s+"s of";
    // document.getElementById("time-elapsed").innerHTML = year+ "yrs " + month+"mos " + s+"s of";

}

setInterval(updateClock, 1000);


//Scroll animation effect
function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);



// Scroll dots animation

easyScrollDots({
  'fixedNav': true, // Set to true if you have a fixed nav.
  'fixedNavId': 'myNav', // Set to the id of your navigation element if 'fixedNav' is true (easyScrollDots will measure the height of the element).
  'fixedNavUpward': true, // Set to true if your nav is only sticky when the user is scrolling up (requires 'fixedNav' to be true and 'fixedNavId' to be a value).
  'offset': 30 // Set to the amount of pixels you wish to offset the scroll amount by (any positive number).
});


// Local time 
