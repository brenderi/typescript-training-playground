export class HexColor {
  red: number;
  green: number;
  blue: number;

  isValidColor = () =>
    this.red >= 0x00 && this.red <= 0xff &&
    this.green >= 0x00 && this.green <= 0xff &&
    this.blue >= 0x00 && this.blue <= 0xff;

  buildCSSColor = () => `#${this.getHexString(this.red)}${this.getHexString(this.green)}${this.getHexString(this.blue)}`;

  private getHexString = (v: number) => {
    let stringRepresentation = v.toString(16);
    return stringRepresentation.length === 1 ? `0${stringRepresentation}` : stringRepresentation;
  }

  constructor(r, g, b) {
    this.red = r;
    this.green = g;
    this.blue = b;
  }
}