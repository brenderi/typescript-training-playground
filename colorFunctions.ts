import { RGBColor, FractionalRGBColor } from './color-models/rgbColor';

enum SlopeCategory {
    Positive = '+',
    Negative = '-',
    Zero = '0',
    Infinity = '∞'
}

export function addRGBColors(first: RGBColor, second: RGBColor) {
  const i1 = first.red + first.green + first.blue;
  const r1 = first.red / i1;
  const g1 = first.green / i1;
  const firstFractional = new FractionalRGBColor(r1, g1);

  const i2 = second.red + second.green + second.blue;
  const r2 = second.red / i2;
  const g2 = second.green / i2;
  const secondFractional = new FractionalRGBColor(r2, g2);

  const compositeFractional = addFractionalRGBColors(firstFractional, secondFractional);
  const intensity = Math.max(i1 + i2, 765);
  return new RGBColor(compositeFractional.red * intensity, compositeFractional.green * intensity, compositeFractional.blue * intensity);
}

export function addFractionalRGBColors(first: FractionalRGBColor, second: FractionalRGBColor, ratioSecondToFirst = 0.5) {
  let direction: SlopeCategory;
  const slope = (second.green - first.green) / (second.red - first.red);
  if (isNaN(slope)) {
    // The colors are the same so just return one
    return new FractionalRGBColor(first.red, first.green);
  }

  const hypotenuse = Math.sqrt((second.red - first.red) ** 2 + (second.green - first.green) ** 2);
  let fractionOfHypotenuse: number;
  if (!isFinite(slope)) {
    fractionOfHypotenuse = second.green >= first.green ? hypotenuse * ratioSecondToFirst : hypotenuse * (1 - ratioSecondToFirst);
    direction = SlopeCategory.Infinity;
  } else if (slope > 0) {
    fractionOfHypotenuse = second.red >= first.red && second.green > first.green ? hypotenuse * ratioSecondToFirst : hypotenuse * (1 - ratioSecondToFirst);
    direction = SlopeCategory.Positive;
  } else if (slope < 0) {
    fractionOfHypotenuse = second.red <= first.red && second.green > first.green ? hypotenuse * ratioSecondToFirst : hypotenuse * (1 - ratioSecondToFirst);
    direction = SlopeCategory.Negative;
  } else if (slope === 0 || slope === -0) {
    fractionOfHypotenuse = second.red >= first.red ? hypotenuse * ratioSecondToFirst : hypotenuse * (1 - ratioSecondToFirst);
    direction = SlopeCategory.Zero
  }
  
  const angleOfElevation = Math.atan(Math.abs((second.green - first.green) / (second.red - first.red)));
  const x = ((fractionOfHypotenuse) * Math.cos(angleOfElevation));
  const y = ((fractionOfHypotenuse) * Math.sin(angleOfElevation));

  let r: number;
  let g: number;
  switch (direction) {
    case SlopeCategory.Negative:
      r = Math.max(first.red, second.red) - x;
      g = Math.min(first.green, second.green) + y;
      break;
    case SlopeCategory.Positive:
      r = Math.min(first.red, second.red) + x;
      g = Math.min(first.green, second.green) + y;
      break;
    case SlopeCategory.Zero:
      r = Math.min(first.red, second.red) + x;
      g = first.green;
      break;
    case SlopeCategory.Infinity:
      r = first.red;
      g = Math.min(first.green, second.green) + y;
      break;
    default:
      throw new Error('Invalid direction');
      break;
  }

  r = parseFloat(parseFloat(r.toString()).toFixed(2));
  g = parseFloat(parseFloat(g.toString()).toFixed(2));
  return new FractionalRGBColor(r, g);
}
