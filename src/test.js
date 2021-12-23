import './assets/style.css';
import $ from 'jquery';


function getComponent() {
  // Lodash, now imported by this script
  return import("lodash")
    .then(({ default: _ }) => {
      const element = document.createElement("div");

      element.innerHTML = _.join(["Hello", "webpack"], " ");
      console.log(process.env);
      return element;
    })
    .catch((error) => "An error occurred while loading the component");
}

const button = document.createElement("button");

button.innerHTML = "Click me ";

button.onclick = () => {
  getComponent().then((component) => {
    document.body.appendChild(component);
  });
};

document.body.appendChild(button);

const getInfo = () => {
  console.log("Javascript!");
  console.log($);
};

export default getInfo;