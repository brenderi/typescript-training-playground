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
// Get range input controls
//
const intensityControl = document.getElementById('intensity') as HTMLInputElement;
const intensityLabel = document.getElementById('intensity-label') as HTMLInputElement;
const balanceControl = document.getElementById('balance') as HTMLInputElement;
const balanceLabel = document.getElementById('balance-label') as HTMLInputElement;
const redOneControl = document.getElementById('red-one') as HTMLInputElement;
const greenOneControl = document.getElementById('green-one') as HTMLInputElement;
const redTwoControl = document.getElementById('red-two') as HTMLInputElement;
const greenTwoControl = document.getElementById('green-two') as HTMLInputElement;

//
// Create color objects to add together
//
const first = new FractionalRGBColor(0, 0);
const second = new FractionalRGBColor(1, 0);

//
// Initialize controls and color in the swatches
//
redOneControl.value = first.red.toString();
greenOneControl.value = first.green.toString();
redTwoControl.value = second.red.toString();
greenTwoControl.value = second.green.toString();
refreshColorSwatches();

//
// Create and subscribe to Observables for range input control events
//
createRangeObservable(redOneControl).subscribe((event: Event) => {
  first.red = parseFloat((event.target as HTMLInputElement).value);
  refreshColorSwatches();
});

createRangeObservable(greenOneControl).subscribe((event: Event) => {
  first.green = parseFloat((event.target as HTMLInputElement).value);
  refreshColorSwatches();
});

createRangeObservable(redTwoControl).subscribe((event: Event)  => {
  second.red = parseFloat((event.target as HTMLInputElement).value);
  refreshColorSwatches();
});

createRangeObservable(greenTwoControl).subscribe((event: Event)  => {
  second.green = parseFloat((event.target as HTMLInputElement).value);
  refreshColorSwatches();
});

createRangeObservable(intensityControl).subscribe((event: Event)  => {
  refreshColorSwatches()
});

createRangeObservable(balanceControl).subscribe((event: Event)  => {
  refreshColorSwatches();
});


//
// Reset balance and intensity range input controls
//
balanceLabel.addEventListener('click', () => {
  balanceControl.value = '0.5';
  refreshColorSwatches();
});

intensityLabel.addEventListener('click', () => {
  intensityControl.value = '50';
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
  const fraction = parseFloat(balanceControl.value);
  updateElementBackground(firstSwatch, first, intensityControl.value);
  updateElementBackground(secondSwatch, second, intensityControl.value);
  updateElementBackground(compositeSwatch, addFractionalRGBColors(first, second, fraction), intensityControl.value);
}

//
// Sets the background color of the element passed in and sets the description of that element to the value of the background-color style
//
function updateElementBackground(el: HTMLElement, color: RGBColor | FractionalRGBColor, intensity?: number | string) {
  el.style.backgroundColor = color.buildCSSColor(intensity);
  document.getElementById(`${el.id}_csscolor`).textContent = el.style.backgroundColor;
}
