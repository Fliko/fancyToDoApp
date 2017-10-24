process.env.NODE_ENV = 'test'
// Register babel so that it will transpile ES6 to ES5 before our tests run.
require('babel-register')()

const { configure } =require( 'enzyme');
const Adapter = require('enzyme-adapter-react-16');
configure({ adapter: new Adapter() });

const { JSDOM } = require('jsdom');

const jsdom = new JSDOM(`<body><div id="app">
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDhwZPT5v10wYdgqyuIbtUXuI1Hc83MOn0&libraries=places"></script>
</div></body>`, { runScripts: "dangerously", resources: "usable" });
jsdom.window.document.body.children.length === 2
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);
