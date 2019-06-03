import { logging } from '../decorators';

export class RGBColor {
  red: number;
  green: number;
  blue: number;

  isValidColor = () =>
    this.red >= 0 && this.red <= 255 &&
    this.green >= 0 && this.green <= 255 &&
    this.blue >= 0 && this.blue <= 255;

  buildCSSColor(i: number | string) { return `rgb(${this.red}, ${this.green}, ${this.blue})`; }

  constructor(r, g, b) {
    this.red = r;
    this.green = g;
    this.blue = b;
  }
}

export class FractionalRGBColor {
  private _red: number;
  private _green: number;

  public get red() {
    return this._red;
  }

  public set red(value: number) {
      this._red = parseFloat(value.toFixed(4));
      this.blue = parseFloat((1 - this._red - this._green).toFixed(4));
      if (this.blue < 0) {
        this.blue = 0;
      }
  }

  public get green() {
    return this._green;
  }

  public set green(value: number) {
      this._green = parseFloat(value.toFixed(4));
      this.blue = parseFloat((1 - this._red - this._green).toFixed(4));
      if (this.blue < 0) {
        this.blue = 0;
      }
  }

  blue: number;

  isValidColor = () => this.red + this.green + this.blue === 1;

  buildCSSColor(i: number | string) {
    if (typeof i === 'string') {
      i = parseFloat(i);
    }

    if (i === undefined || i === null || isNaN(i)) {
      // Default to max intensity
      i = 100;
    }

    return `rgb(
      ${Math.min(Math.floor(this.red * i / 100 * 765), 255)},
      ${Math.min(Math.floor(this.green * i / 100 * 765), 255)},
      ${Math.min(Math.floor(this.blue * i / 100 * 765), 255)}
    )`;
  }

  constructor(r: number, g: number) {
    this.red = r;
    this.green = g;
  }
}
