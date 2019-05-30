export class HSLColor {
  hue: number;
  saturation: number;
  lightness: number;

  isValidHue = () => this.hue >= 0 && this.hue <= 360;
  isValidSaturation = () => this.saturation >= 0 && this.saturation <= 100;
  isValidLightness = () => this.lightness >= 0 && this.lightness <= 100;
  isValidColor = () => this.isValidHue() && this.isValidSaturation() && this.isValidLightness();

  buildCSSColor = () => `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;

  constructor(h, s, l) {
    this.hue = h;
    this.saturation = s;
    this.lightness = l;
  }
}