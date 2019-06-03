import { fromEvent } from 'rxjs';
import { throttleTime, merge } from 'rxjs/operators';

import { RGBColor, FractionalRGBColor } from './color-models/rgbColor';
import { addFractionalRGBColors } from './colorFunctions';

//
// Find all of the input controls
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

const firstSwatch = getHTMLElement('first');
const secondSwatch = getHTMLElement('second');
const compositeSwatch = getHTMLElement('composite');

export function handleEvents(first: FractionalRGBColor, second: FractionalRGBColor) {
  //
  // Create and subscribe to Observables for range input control events
  //
  createRangeObservable(redOneRangeControl).subscribe(event => {
    const newValue = (event.target as HTMLInputElement).value;
    redOneNumberControl.value = newValue;
    first.red = parseFloat(newValue);
    if (!first.isValidColor()) {
      first.green = 1 - first.red;
      greenOneRangeControl.value = first.green.toString();
      greenOneNumberControl.value = first.green.toString();
    }

    refreshColorSwatches(first, second);
  });

  createRangeObservable(greenOneRangeControl).subscribe(event => {
    const newValue = (event.target as HTMLInputElement).value;
    greenOneNumberControl.value = newValue;
    first.green = parseFloat(newValue);
    if (!first.isValidColor()) {
      first.red = 1 - first.green;
      redOneRangeControl.value = first.red.toString();
      redOneNumberControl.value = first.red.toString();
    }

    refreshColorSwatches(first, second);
  });

  createRangeObservable(redTwoRangeControl).subscribe(event => {
    const newValue = (event.target as HTMLInputElement).value;
    redTwoNumberControl.value = newValue;
    second.red = parseFloat(newValue);
    if (!second.isValidColor()) {
      second.green = 1 - second.red;
      greenTwoRangeControl.value = second.green.toString();
      greenTwoNumberControl.value = second.green.toString();
    }

    refreshColorSwatches(first, second);
  });

  createRangeObservable(greenTwoRangeControl).subscribe(event => {
    const newValue = (event.target as HTMLInputElement).value;
    greenTwoNumberControl.value = newValue;
    second.green = parseFloat(newValue);
    if (!second.isValidColor()) {
      second.red = 1 - second.green;
      redTwoRangeControl.value = second.red.toString();
      redTwoNumberControl.value = second.red.toString();
    }

    refreshColorSwatches(first, second);
  });

  createRangeObservable(intensityRangeControl).subscribe(event => {
    const newValue = (event.target as HTMLInputElement).value;
    intensityNumberControl.value = newValue;
    refreshColorSwatches(first, second);
  });

  createRangeObservable(balanceRangeControl).subscribe(event => {
    refreshColorSwatches(first, second);
  });


  //
  // Reset balance and intensity range input controls
  //
  balanceRangeLabel.addEventListener('click', () => {
    balanceRangeControl.value = '0.5';
    refreshColorSwatches(first, second);
  });

  intensityRangeLabel.addEventListener('click', () => {
    intensityRangeControl.value = '50';
    intensityNumberControl.value = '50';
    refreshColorSwatches(first, second);
  });


  //
  // Listen for changes to the number input controls
  //
  redOneNumberControl.addEventListener('blur', event => {
    const newValue = Number((event.target as HTMLInputElement).value);
    if (isNaN(newValue) || newValue < 0 || newValue > 1) {
      first.red = 0;
      redOneNumberControl.value = '0';
      redOneRangeControl.value = '0';
    } else {
      first.red = newValue;
      redOneRangeControl.value = first.red.toString();
    }

    if (!first.isValidColor()) {
      first.green = 1 - first.red;
      greenOneRangeControl.value = first.green.toString();
      greenOneNumberControl.value = first.green.toString();
    }

    refreshColorSwatches(first, second);
  });

  greenOneNumberControl.addEventListener('blur', event => {
    const newValue = Number((event.target as HTMLInputElement).value);
    if (isNaN(newValue) || newValue < 0 || newValue > 1) {
      first.green = 0;
      greenOneNumberControl.value = '0';
      greenOneRangeControl.value = '0';
    } else {
      first.green = newValue;
      greenOneRangeControl.value = first.green.toString();
    }

    if (!first.isValidColor()) {
      first.red = 1 - first.green;
      redOneRangeControl.value = first.red.toString();
      redOneNumberControl.value = first.red.toString();
    }

    refreshColorSwatches(first, second);
  });

  redTwoNumberControl.addEventListener('blur', event => {
    const newValue = Number((event.target as HTMLInputElement).value);
    if (isNaN(newValue) || newValue < 0 || newValue > 1) {
      second.red = 0;
      redTwoNumberControl.value = '0';
      redTwoRangeControl.value = '0';
    } else {
      second.red = newValue;
      redTwoRangeControl.value = second.red.toString();
    }

    if (!second.isValidColor()) {
      second.green = 1 - second.red;
      greenTwoRangeControl.value = second.green.toString();
      greenTwoNumberControl.value = second.green.toString();
    }

    refreshColorSwatches(first, second);
  });

  greenTwoNumberControl.addEventListener('blur', event => {
    const newValue = Number((event.target as HTMLInputElement).value);
    if (isNaN(newValue) || newValue < 0 || newValue > 1) {
      second.green = 0;
      greenTwoNumberControl.value = '0';
      greenTwoRangeControl.value = '0';
    } else {
      second.green = newValue;
      greenTwoRangeControl.value = second.green.toString();
    }

    if (!second.isValidColor()) {
      second.red = 1 - second.green;
      redTwoRangeControl.value = second.red.toString();
      redTwoNumberControl.value = second.red.toString();
    }

    refreshColorSwatches(first, second);
  });

  intensityNumberControl.addEventListener('blur', event => {
    const newValue = (event.target as HTMLInputElement).value;
    intensityRangeControl.value = newValue;
    refreshColorSwatches(first, second);
  });


  //
  // Takes in an range input control and returns an Observable that listens to the mouseup and input events
  //
  function createRangeObservable(control: HTMLInputElement) {
    const mouseup$ = fromEvent(control, 'mouseup');
    const input$ = fromEvent(control, 'input').pipe(throttleTime(50));
    return input$.pipe(merge(mouseup$));
  }
}

export function initializeControls(first: FractionalRGBColor, second: FractionalRGBColor) {
  redOneRangeControl.value = first ? first.red.toString() : '';
  redOneNumberControl.value = first ? first.red.toString() : '';
  redTwoRangeControl.value = second ? second.red.toString() : '';
  redTwoNumberControl.value = second ? second.red.toString() : '';

  greenOneRangeControl.value = first ? first.green.toString() : '';
  greenOneNumberControl.value = first ? first.green.toString() : '';
  greenTwoRangeControl.value = second ? second.green.toString() : '';
  greenTwoNumberControl.value = second ? second.green.toString() : '';


  if (first && second) {
    refreshColorSwatches(first, second);
  }
}

//
// Colors in the swatches based on all of the current values of the colors being added, the color balance, and the intensity
//
export function refreshColorSwatches(first, second) {
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
export function updateElementBackground(el: HTMLElement, color: RGBColor | FractionalRGBColor, intensity?: number | string) {
  el.style.backgroundColor = color ? color.buildCSSColor(intensity) : 'transparent';
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
