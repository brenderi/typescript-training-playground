import './style.css';

import { isNumber } from './guards';
import { RGBColor, FractionalRGBColor } from './color-models/rgbColor';
import { HSLColor } from './color-models/hslColor';
import { addRGBColors, addFractionalRGBColors } from './colorFunctions';
import {
  handleEvents,
  initializeControls,
  updateElementBackground,
  refreshColorSwatches
} from './domManager';

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
const redSwatch = document.getElementById('red') as HTMLElement;
const greenSwatch = document.getElementById('green') as HTMLElement;
const blueSwatch = document.getElementById('blue') as HTMLElement;
const greenPlusRedSwatch = document.getElementById('green-plus-red') as HTMLElement;
const redPlusBlueSwatch = document.getElementById('red-plus-blue') as HTMLElement;
const bluePlusGreenSwatch = document.getElementById('blue-plus-green') as HTMLElement;
const redPlusGreenPlusBlueSwatch = document.getElementById('red-plus-green-plus-blue') as HTMLElement;

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
// Subscribe to and listen for events
//
handleEvents(first, second);


//
// Set initial values based on the first and second color object
//
initializeControls(first, second);
