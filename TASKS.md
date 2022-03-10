**please follow those requirement as we mention in conversation**
# Detailed specifications

The editor starts with a blank canvas, and the scene does not have to be persisted between page reloads.

The viewport is split between a canvas that takes all the available space and a control panel (remember that a browser’s window can be resized).

## Control Panel

The control panel exposes:

- an "add rectangle" button;
- a "duration" field;
- a "play animation" button;
- a "download project" button.

### Add shape button

When clicked, a new rectangular shape is added to the scene and displayed on the canvas.

Position, rotation and dimensions of the shape are random. The rectangles must use all the available space of the canvas, and be visible.

The color of added shape must be random.

### Duration field

The duration field expects a number, in seconds.

The duration can't be empty.

### Play animation button

When clicked, all the shapes of the scene rotate 360****°**** clockwise around their center in a smooth animation.

The animation respects the duration entered by the user.

### Download project button

This button allows the user to download a .json file containing the scene's data.

## Canvas

The canvas area must be a `` element.

On the canvas, the only interaction available to the user is to click shapes.

A shape changes color when clicked.

The new color is random.

Final
- Add a button to import projects exported with the “Download project” button.

Use this library: http://fabricjs.com/docs/

And and attchaed zip code to start