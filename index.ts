import './style.css';

import { fromEvent } from 'rxjs';
import { throttleTime, merge } from 'rxjs/operators';

import { isNumber } from './guards';
import { RGBColor, FractionalRGBColor } from './color-models/rgbColor';
import { HSLColor } from './color-models/hslColor';
import { addRGBColors, addFractionalRGBColors } from './colorFunctions';

// var colorsJS: any = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'];
// colorsJS.push(0xff0000);
// console.log(`colorsJS: ${colorsJS}`);
// colorsJS = null;
// console.log(`colorsJS after reassignment: ${colorsJS || 'EMPTY'}`);

// const colorsTS: string[] = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'];
// //colorsTS.push(0xff0000);
// //colorsTS = null;

// let multipleTypesOfColor: Array<string | number> = [];
// multipleTypesOfColor.push(0xff0000);
// multipleTypesOfColor.push('orange');
// multipleTypesOfColor.push(0xffff00);
// multipleTypesOfColor.push('green');
// multipleTypesOfColor.push(0x0000ff);
// multipleTypesOfColor.push('violet');
// console.log(multipleTypesOfColor.map(c => isNumber(c) ? c.toString(16) : c).join(', '));

// let colorObjects = [];
// colorObjects.push(
//   { name: 'red', minWavelength: 647, maxWavelength: 700, buildCSSColor: () => name },
//   { name: 'orange', minWavelength: 585, maxWavelength: 647, buildCSSColor: () => name },
//   { name: 'yellow', minWavelength: 575, maxWavelength: 585, buildCSSColor: () => name },
//   { name: 'green', minWavelength: 491, maxWavelength: 575, buildCSSColor: () => name },
//   { name: 'blue', minWavelength: 424, maxWavelength: 491, buildCSSColor: () => name },
//   { name: 'violet', minWavelength: 400, maxWavelength: 424, buildCSSColor: () => name }
// );


//
// Get color swatch DOM elements
//
const redSwatch = getHTMLElement('red');
const greenSwatch = getHTMLElement('green');
const blueSwatch = getHTMLElement('blue');
const greenPlusRedSwatch = getHTMLElement('green-plus-red');
const redPlusBlueSwatch = getHTMLElement('red-plus-blue');
const bluePlusGreenSwatch = getHTMLElement('blue-plus-green');
const redPlusGreenPlusBlueSwatch = getHTMLElement('red-plus-green-plus-blue');
const firstSwatch = getHTMLElement('first');
const secondSwatch = getHTMLElement('second');
const compositeSwatch = getHTMLElement('composite');


//
// Get input controls
//
const intensityRangeControl = getHTMLInputElement('intensity');
const intensityRangeLabel = getHTMLInputElement('intensity-label');
const intensityNumberControl = getHTMLInputElement('intensity-number');
const balanceRangeControl = getHTMLInputElement('balance');
const balanceRangeLabel = getHTMLInputElement('balance-label');
const redOneRangeControl = getHTMLInputElement('first-red-range');
const greenOneRangeControl = getHTMLInputElement('first-green-range');
const redTwoRangeControl = getHTMLInputElement('second-red-range');
const greenTwoRangeControl = getHTMLInputElement('second-green-range');
const redOneNumberControl = getHTMLInputElement('first-red-number');
const greenOneNumberControl = getHTMLInputElement('first-green-number');
const redTwoNumberControl = getHTMLInputElement('second-red-number');
const greenTwoNumberControl = getHTMLInputElement('second-green-number');


//
// Create primary RGB color objects
//
const redColor = new RGBColor(255, 0, 0);
const greenColor = new RGBColor(0, 255, 0);
const blueColor = new RGBColor(0, 0, 255);


//
// Color in the swatches with the primary colors
//
updateElementBackground(redSwatch, redColor);
updateElementBackground(greenSwatch, greenColor);
updateElementBackground(blueSwatch, blueColor);


//
// Adding RGB Colors
//
const greenPlusRedRGBColor = addRGBColors(greenColor, redColor);
const redPlusBlueRGBColor = addRGBColors(redColor, blueColor);
const bluePlusGreenRGBColor = addRGBColors(blueColor, greenColor);
const redPlusGreenPlusBlueRGBColor = addRGBColors(addRGBColors(redColor, greenColor), blueColor);

updateElementBackground(greenPlusRedSwatch, greenPlusRedRGBColor);
updateElementBackground(redPlusBlueSwatch, redPlusBlueRGBColor);
updateElementBackground(bluePlusGreenSwatch, bluePlusGreenRGBColor);
updateElementBackground(redPlusGreenPlusBlueSwatch, redPlusGreenPlusBlueRGBColor);


//
// Create color objects to add together
//
const first = new FractionalRGBColor(0, 0);
const second = new FractionalRGBColor(1, 0);


//
// Initialize controls and color in the swatches
//
redOneRangeControl.value = first.red.toString();
redOneNumberControl.value = first.red.toString();
redTwoRangeControl.value = second.red.toString();
redTwoNumberControl.value = second.red.toString();

greenOneRangeControl.value = first.green.toString();
greenOneNumberControl.value = first.green.toString();
greenTwoRangeControl.value = second.green.toString();
greenTwoNumberControl.value = second.green.toString();

refreshColorSwatches();


//
// Create and subscribe to Observables for range input control events
//
createRangeObservable(redOneRangeControl).subscribe(event => {
  const newValue = (event.target as HTMLInputElement).value;
  redOneNumberControl.value = newValue;
  first.red = parseFloat(newValue);
  refreshColorSwatches();
});

createRangeObservable(greenOneRangeControl).subscribe(event => {
  const newValue = (event.target as HTMLInputElement).value;
  greenOneNumberControl.value = newValue;
  first.green = parseFloat(newValue);
  refreshColorSwatches();
});

createRangeObservable(redTwoRangeControl).subscribe(event => {
  const newValue = (event.target as HTMLInputElement).value;
  redTwoNumberControl.value = newValue;
  second.red = parseFloat(newValue);
  refreshColorSwatches();
});

createRangeObservable(greenTwoRangeControl).subscribe(event => {
  const newValue = (event.target as HTMLInputElement).value;
  greenTwoNumberControl.value = newValue;
  second.green = parseFloat(newValue);
  refreshColorSwatches();
});

createRangeObservable(intensityRangeControl).subscribe(event => {
  const newValue = (event.target as HTMLInputElement).value;
  intensityNumberControl.value = newValue;
  refreshColorSwatches();
});

createRangeObservable(balanceRangeControl).subscribe(event => {
  refreshColorSwatches();
});


//
// Reset balance and intensity range input controls
//
balanceRangeLabel.addEventListener('click', () => {
  balanceRangeControl.value = '0.5';
  refreshColorSwatches();
});

intensityRangeLabel.addEventListener('click', () => {
  intensityRangeControl.value = '50';
  intensityNumberControl.value = '50';
  refreshColorSwatches();
});


//
// Listen for changes to the number input controls
//
redOneNumberControl.addEventListener('blur', event => {
  const newValue = (event.target as HTMLInputElement).value;
  first.red = parseFloat(newValue);
  redOneRangeControl.value = newValue;
  refreshColorSwatches();
});

greenOneNumberControl.addEventListener('blur', event => {
  const newValue = (event.target as HTMLInputElement).value;
  first.green = parseFloat(newValue);
  greenOneRangeControl.value = newValue;
  refreshColorSwatches();
});

redTwoNumberControl.addEventListener('blur', event => {
  const newValue = (event.target as HTMLInputElement).value;
  second.red = parseFloat(newValue);
  redTwoRangeControl.value = newValue;
  refreshColorSwatches();
});

greenTwoNumberControl.addEventListener('blur', event => {
  const newValue = (event.target as HTMLInputElement).value;
  second.green = parseFloat(newValue);
  greenTwoRangeControl.value = newValue;
  refreshColorSwatches();
});

intensityNumberControl.addEventListener('blur', event => {
  const newValue = (event.target as HTMLInputElement).value;
  intensityRangeControl.value = newValue;
  refreshColorSwatches();
});


//
// Takes in an range input control and returns an Observable that listens to the mouseup and input events
//
function createRangeObservable(control: HTMLInputElement) {
  const mouseup$ = fromEvent(control, 'mouseup');
  const input$ = fromEvent(control, 'input').pipe(throttleTime(50));
  return input$.pipe(merge(mouseup$));
}


//
// Colors in the swatches based on all of the current values of the colors being added, the color balance, and the intensity
//
function refreshColorSwatches() {
  const fraction = parseFloat(balanceRangeControl.value);
  updateElementBackground(firstSwatch, first, intensityRangeControl.value);
  updateElementBackground(secondSwatch, second, intensityRangeControl.value);
  updateElementBackground(
    compositeSwatch,
    addFractionalRGBColors(first, second, fraction),
    intensityRangeControl.value
  );
}


//
// Sets the background color of the element passed in and sets the description of that element to the value of the background-color style
//
function updateElementBackground(el: HTMLElement, color: RGBColor | FractionalRGBColor, intensity?: number | string) {
  el.style.backgroundColor = color.buildCSSColor(intensity);
  document.getElementById(`${el.id}-csscolor`).textContent = el.style.backgroundColor;
}


//
// Returns an HTMLElement based on the provided id
//
function getHTMLElement(id: string): HTMLElement {
  return document.getElementById(id) as HTMLElement;
}


//
// Returns an HTMLInputElement based on the provided id
//
function getHTMLInputElement(id: string): HTMLInputElement {
  return document.getElementById(id) as HTMLInputElement;
}