# typescript-training-playground

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/typescript-training-playground)

## Activity: Adding Colors

### CSS Colors

There are multiple ways to specify a color in CSS:

- hex: `#f0f0f0`
- red, green, blue: `rgb(127, 127, 127)`
- hue, saturation, lightness: `hsl(200, 80%, 92%)`

(There is also an alpha channel for colors, but that will be ignored in this activity.)

The goal of this activity is to use classes, interfaces, and functions to create objects that represent colors and describe how they combine.

1. A starter template for this activity is available on StackBlitz at <https://stackblitz.com/edit/typescript-training-playground-starter>. Fork this project using the button in the toolbar. This project contains all of the HTML and CSS required for the view and the code that wires up the range and number `<input>` controls.

2. Add a class to the color-models folder in separate TS files for each of the ways to represent a color:

   - [ ] HEX
   - [ ] RGB
   - [ ] HSL

3. Add a function to each class that validates whether the color is valid.

4. Add a function to each class that will output a CSS color. Consider using a template string.

Now that we can represent colors in different ways, what does the algorithm look like to add two colors together? Let's start with the three colors that make up all of the Daktronics full-color displays: red, green, and blue.

5. Using the class created as part of step (2), create full intensity RGB representations of these colors:
   
   - [ ] red
   - [ ] green
   - [ ] blue

6. Set the corresponding color swatches in the HTML view to the string produced by the function written in step (4).

### Combining CSS Colors

Looking at the RGB representations of red, green, and blue, what would you expect the combinations of those full intensity colors to be?
   - [ ] red and green
   - [ ] green and blue
   - [ ] blue and red
   - [ ] red and green and blue
   
7. Write a function that takes in two colors and returns the value you are expecting. What are some potential limitations of that function?

### A Little Bit of Math

The HEX and RGB formats are explicit about the primary components of CSS colors and visible light: red, green, and blue.
A color can be represented as a combination: 

`C = rR + gG + bB` where `r`, `g`, and `b` are the intensities of red, green, and blue.

The total intensity of the color is then `r + g + b`. For CSS, the maximum intensity is `255 * 3 = 765`.

If we normalize the intensity (i.e. make it equal to 1), then `r`, `g`, and `b` are the fractions of red, green, and blue in the color.
For example, the named CSS color "salmon" is `rgb(250, 128, 114)`. The total intensity of this color is `250 + 128 + 114 = 492`. The color fractions are then:

```math
r = 250/492 ≈ 0.5081
g = 128/492 ≈ 0.2602
b = 114/492 ≈ 0.2317
```

So about 51% red, 26% green, and 23% blue at an intensity of 64% (`492/765 * 100`) will produce the salmon color.

This way of describing colors produces the color triangle:

![Color Triangle](color-triangle.jpg)

The fraction of red is on the horizontal axis and the fraction of green is on the vertical axis. The blue component of a color is calculated from the rule that all three fractions add up to 1. This means that any color falls within the triangle bounded by the x-axis, y-axis, and the line `1 - x`.

When adding two colors together, the resulting color is found by drawing a line between the two points representing those colors. To find the sum, select any point along that line. If the two colors are combined equally, then the resulting color is at the midpoint of that line. More of one color means the result is closer to that color than the other.
