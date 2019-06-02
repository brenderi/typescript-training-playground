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
const redSwatch = document.getElementById('rgb_red') as HTMLElement;
const greenSwatch = document.getElementById('rgb_green') as HTMLElement;
const blueSwatch = document.getElementById('rgb_blue') as HTMLElement;
const greenPlusRedSwatch = document.getElementById('rgb_green+red') as HTMLElement;
const redPlusBlueSwatch = document.getElementById('rgb_red+blue') as HTMLElement;
const bluePlusGreenSwatch = document.getElementById('rgb_blue+green') as HTMLElement;
const redPlusGreenPlusBlueSwatch = document.getElementById('rgb_red+green+blue') as HTMLElement;
const firstSwatch = document.getElementById('first') as HTMLElement;
const secondSwatch = document.getElementById('second') as HTMLElement;
const compositeSwatch = document.getElementById('composite') as HTMLElement;

//
// Create primary RGB color objects
//
const redRGBColor = new RGBColor(255, 0, 0);
const greenRGBColor = new RGBColor(0, 255, 0);
const blueRGBColor = new RGBColor(0, 0, 255);

//
// Color in the swatches with the primary colors
//
updateElementBackground(redSwatch, redRGBColor);
updateElementBackground(greenSwatch, greenRGBColor);
updateElementBackground(blueSwatch, blueRGBColor);

//
// Adding RGB Colors
//
const greenPlusRedRGBColor = addRGBColors(greenRGBColor, redRGBColor);
const redPlusBlueRGBColor = addRGBColors(redRGBColor, blueRGBColor);
const bluePlusGreenRGBColor = addRGBColors(blueRGBColor, greenRGBColor);
const redPlusGreenPlusBlueRGBColor = addRGBColors(addRGBColors(redRGBColor, greenRGBColor), blueRGBColor);

updateElementBackground(greenPlusRedSwatch, greenPlusRedRGBColor);
updateElementBackground(redPlusBlueSwatch, redPlusBlueRGBColor);
updateElementBackground(bluePlusGreenSwatch, bluePlusGreenRGBColor);
updateElementBackground(redPlusGreenPlusBlueSwatch, redPlusGreenPlusBlueRGBColor);

//
// Get input controls
//
const intensityRangeControl = document.getElementById('intensity') as HTMLInputElement;
const intensityRangeLabel = document.getElementById('intensity-label') as HTMLInputElement;
const intensityNumberControl = document.getElementById('intensity-number') as HTMLInputElement;
const balanceRangeControl = document.getElementById('balance') as HTMLInputElement;
const balanceRangeLabel = document.getElementById('balance-label') as HTMLInputElement;
const redOneRangeControl = document.getElementById('red-one-range') as HTMLInputElement;
const greenOneRangeControl = document.getElementById('green-one-range') as HTMLInputElement;
const redTwoRangeControl = document.getElementById('red-two-range') as HTMLInputElement;
const greenTwoRangeControl = document.getElementById('green-two-range') as HTMLInputElement;
const redOneNumberControl = document.getElementById('red-one-number') as HTMLInputElement;
const greenOneNumberControl = document.getElementById('green-one-number') as HTMLInputElement;
const redTwoNumberControl = document.getElementById('red-two-number') as HTMLInputElement;
const greenTwoNumberControl = document.getElementById('green-two-number') as HTMLInputElement;

//
// Create color objects to add together
//
const first = new FractionalRGBColor(0, 0);
const second = new FractionalRGBColor(1, 0);

//
// Initialize controls and color in the swatches
//
redOneRangeControl.value = first.red.toString();
greenOneRangeControl.value = first.green.toString();
redTwoRangeControl.value = second.red.toString();
greenTwoRangeControl.value = second.green.toString();
redOneNumberControl.value = first.red.toString();
greenOneNumberControl.value = first.green.toString();
redTwoNumberControl.value = second.red.toString();
greenTwoNumberControl.value = second.green.toString();
refreshColorSwatches();

//
// Create and subscribe to Observables for range input control events
//
createRangeObservable(redOneRangeControl).subscribe((event: Event) => {
  first.red = parseFloat((event.target as HTMLInputElement).value);
  refreshColorSwatches();
});

createRangeObservable(greenOneRangeControl).subscribe((event: Event) => {
  first.green = parseFloat((event.target as HTMLInputElement).value);
  refreshColorSwatches();
});

createRangeObservable(redTwoRangeControl).subscribe((event: Event)  => {
  second.red = parseFloat((event.target as HTMLInputElement).value);
  refreshColorSwatches();
});

createRangeObservable(greenTwoRangeControl).subscribe((event: Event)  => {
  second.green = parseFloat((event.target as HTMLInputElement).value);
  refreshColorSwatches();
});

createRangeObservable(intensityRangeControl).subscribe((event: Event)  => {
  refreshColorSwatches()
});

createRangeObservable(balanceRangeControl).subscribe((event: Event)  => {
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
  updateElementBackground(compositeSwatch, addFractionalRGBColors(first, second, fraction), intensityRangeControl.value);
}

//
// Sets the background color of the element passed in and sets the description of that element to the value of the background-color style
//
function updateElementBackground(el: HTMLElement, color: RGBColor | FractionalRGBColor, intensity?: number | string) {
  el.style.backgroundColor = color.buildCSSColor(intensity);
  document.getElementById(`${el.id}_csscolor`).textContent = el.style.backgroundColor;
}
