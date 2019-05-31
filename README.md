# typescript-training-playground

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/typescript-training-playground)

## Introduction

There are multiple ways to specify a color in CSS:

- hex: `#f0f0f0`
- red, green, blue: `rgb(127, 127, 127)`
- hue, saturation, lightness: `hsl(200, 80%, 92%)`

(There is also alpha channel, but that will be ignored for this activity.)

The hex and rgb formats are explicit about the common components of CSS colors and visible light: red, green, and blue.
A color can be represented as a combination: `C = rR + gG + bB` where r, g, and b are the intensities of red, green, and blue.
The total intensity of the color is then `I = r + g + b`.
If we normalize the intensity (i.e. make it equal to 1), then r, g, and b are the fractions of red, green, and blue in the color.
For example, the named CSS color "salmon" is `rgb(250, 128, 114)`. The total intensity of this color is `250 + 128 + 114 = 492`. The color fractions are:

```math
r = 250/492 ≈ 0.5081
g = 128/492 ≈ 0.2602
b = 114/492 ≈ 0.2317
```

So about 51% red, 26% green, and 23% blue at an intensity of 64% (`492/765 * 100`) will produce the salmon color.
