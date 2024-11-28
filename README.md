# react-canvas-snap

`react-canvas-snap` is a React library that allows you to easily capture a specific region of a canvas using the mouse cursor. It enables users to draw a selection box on the canvas with their mouse and capture the content within the selected area.

# Demo
![Demo of the app](https://media.giphy.com/media/5rg1MC07zIem72QOOo/giphy.gif)

## Features

- Allows users to capture a specific region of a canvas.
- Interactive selection area with the mouse cursor.
- Easy to integrate into React applications.

## Installation

To install the library, run:

```bash
npm install react-canvas-snap
```

## Usage
After installing the library, you can import the Canvas component and use it to capture a specific region of the canvas.

### Import the Component

```js
import { Canvas } from 'react-canvas-snap';
```

## Example Usage

```js
<Canvas
    ref={yourCanvasRef} 
    drawingEnabled={true} 
    option={{
        rect: {
            borderColor: '#F14236',
            borderStyle: 'dashed',
            borderWidth: 1
        },
        helperText: {
            show: true,
            value: 'Demo Capture (Enter: to capture | Esc: to cancel)',
            padding: 3,
            fontSize: 10,
            backgroundColor: '#F14236',
            textColor: '#fff'
        },
        imageQuality: "high", 
    }}
    onCaptureCanceled={() => setCapturing(false)}
    onImageCaptured={(img) => setCapturedImage(img)} 
    width={500}
    height={300}
    style={{
        border: '1px dashed #989898'
    }}
/>
```

## Using hook

To import the hook, use:

```js
import { useCanvasSnap } from 'react-canvas-snap';
```
To use the useCanvasSnap hook from react-canvas-snap, you can follow the different usage patterns based on whether you want to pass a ref to it or not.

### 1. Without Using *`Ref`*:

If you don't want to manually handle the ref, you can simply pass null to the hook. It will return a ref that you can assign to your canvas element.


```js
const { canvasRef } = useCanvasSnap(null);
```
### 2. Using a *`Ref`* Manually:
If you prefer to use your own ref, you can create one using useRef and pass it to useCanvasSnap. This allows you to have more control over the ref.

```js
// Create your own ref with useRef
const canvasRef = useRef(null);

// Pass the ref to useCanvasSnap
useCanvasSnap(canvasRef);
```

### 3. Full usage of *`useCanvasSnap`* hook

``` js
import React from 'react';
import { useCanvasSnap } from 'react-canvas-snap';

const MyComponent = () => {
    const [drawingEnabled, setDrawingEnabled] = useState(true);

    const option = {
        drawingEnabled: drawingEnabled,
        rect: {
            borderColor: '#F14236',
            borderStyle: 'dashed',
            borderWidth: 1
        },
        helperText: {
            show: true,
            value: 'Demo Capture (Enter: to capture | Esc: to cancel)',
            padding: 3,
            fontSize: 10,
            backgroundColor: '#F14236',
            textColor: '#fff'
        },
        imageQuality: "high", 
    }

    const handleSnapshot = (snapshot) => {
        
        const { isCanceled, capturedImage, rectCoords } = snapshot;

        // capture is canceled
        if (isCanceled) {
            setDrawingEnabled(false);
            // add your logic
        }

        if (capturedImage && rectCoords) {
            // get image base64
            console.log(capturedImage);
            // you can also get the rect coordinates (x, y, width and height)
            console.log(rectCoords)
        }
    };

    const { canvasRef } = useCanvasSnap(null, handleSnapshot, option);

    return (
        <div style={{ position: 'relative'}}>
            <canvas ref={canvasRef} width={400} height={400} />
        </div>
    )
};
```

## Drawing Functionality with Key Presses

The canvas drawing tool supports key press events to enhance user interaction:

1. **Disable Drawing with Escape Key**
   - If drawing is enabled and you want to stop the drawing action, you can press the **Escape** key.
   - This will **disable the drawing mode** on the canvas, and no further drawing can be done until drawing is re-enabled.

2. **Capture Image with Enter Key**
   - After completing a drawing (drawing a rectangle), you can press the **Enter** key.
   - This will **trigger the snapshot callback** and provide the current image of the canvas as a snapshot.

### Example Usage:

- **Press `Escape`**: Disables drawing, preventing further changes on the canvas.
- **Press `Enter`**: Captures the drawn content and provides the image through the snapshot callback.

You can check out `handleSnapshot` on **Full hook usage**.

# Canvas Snap Options

The `CanvasSnapOptions` type allows you to customize the drawing behavior on the canvas. Below is a detailed explanation of each option and its usage.


| Option                          | Type                                                      | Description                                                                                  | Example/Usage                                            | Default Value           |
|----------------------------------|-----------------------------------------------------------|----------------------------------------------------------------------------------------------|----------------------------------------------------------|-------------------------|
| `drawingEnabled`                 | `boolean`                                                 | Enables or disables drawing on the canvas. If set to `false`, drawing is disabled.            | `drawingEnabled: true`                                    | `false`                 |
| `rect`                           | `object`                                                  | Customizes the rectangle's appearance when drawing a rectangle.                               | See `rect` options below                                  | `{}` (empty object)     |
| `isGrayscale`                    | `boolean`                                                 | If set to `true`, the canvas will be rendered in grayscale.                                   | `isGrayscale: true`                                       | `false`                 |
| `helperText`                     | `HelperText`                                     | Optionally adds helper text on the canvas. If provided, it will show or hide based on the boolean value. | See `helperText`. | `{ show: true, backgroundColor: '#F14236', textColor: '#fff', position: 'bottom-right', fontSize: 10, padding: 2 }` |
| `cursor`                         | `Cursor`                                                  | Customizes the cursor appearance on the canvas.                                               | `cursor: 'crosshair'`                                     | `'crosshair'`           |
| `copyImageToClipBoard`           | `boolean`                                                 | If `true`, it allows copying the drawn image to the clipboard.                               | `copyImageToClipBoard: true`                              | `true`                  |
| `imageQuality`                   | `string`                           | Controls the quality of the exported image. Higher quality may result in larger file sizes. Options include `low`, `medium`, or `high`.   | `imageQuality: 'high'`                                    | `'high'`                |

### Rect Options
The `rect` option has the following customizable properties:

| Option                          | Type                                                      | Description                                                                                  | Example/Usage                                            | Default Value           |
|----------------------------------|-----------------------------------------------------------|----------------------------------------------------------------------------------------------|----------------------------------------------------------|-------------------------|
| `outterBackgroundColor`     | `string`                                                  | The background color of the rectangle outside the border.                                    | `outterBackgroundColor: '#f0f0f0'`             | `'rgba(0, 0, 0, 0.1)'`  |
| `borderColor`               | `string`                                                  | The color of the rectangle's border.                                                          | `borderColor: 'black'`                          | `'#F14236'`             |
| `borderStyle`               | `string`                                                  | The style of the rectangle's border. Options include `dashed`, `dotted`, or `solid`.         | `borderStyle: 'dotted'`                         | `'dashed'`              |
| `borderWidth`               | `number`                                                  | The width of the rectangle's border in pixels.                                                | `borderWidth: 2`                                | `1`                     |


### HelperText Options
The `helperText` option has the following customizable properties:

| Option                          | Type                                                      | Description                                                                                  | Example/Usage                                            | Default Value           |
|----------------------------------|-----------------------------------------------------------|----------------------------------------------------------------------------------------------|----------------------------------------------------------|-------------------------|
| `show`                          | `boolean`                                                 | If `true`, displays helper text.                                                              | `show: true`                                              | `true`                  |
| `value`                         | `string`                                                  | The helper text to display.                                                                    | `value: 'Use the brush tool!'`                            | `Press Enter to submit, Escape to cancel`             |
| `backgroundColor`               | `string`                                                  | The background color of the helper text.                                                      | `backgroundColor: '#F14236'`                              | `'#F14236'`             |
| `textColor`                     | `string`                                                  | The text color of the helper text.                                                            | `textColor: '#fff'`                                       | `'#fff'`                |
| `fontSize`                      | `number`                                                  | The font size of the helper text.                                                             | `fontSize: 10`                                            | `10`                    |
| `fontFamily`                    | `string`                                                  | The font family of the helper text.                                                           | `fontFamily: 'Arial'`                                     | `undefined`             |
| `padding`                       | `number`                                                  | The padding around the helper text.                                                           | `padding: 2`                                              | `2`                     |
| `textHeight`                    | `number`                                                  | The height of the helper text box.                                                            | `textHeight: 20`                                          | `undefined`             |
| `position`                      | `string` | The position of the helper text on the canvas.<br>Option include `top-right`, `bottom-right`, `top-left`, `bottom-left`, <br> `top-center` or `bottom-center`       | `position: 'bottom-right'`                              | `'bottom-right'`        |


## Acknowledgments
Thanks to the open-source community for their contributions that helped shape this library.

## Contact
For any questions or feedback, feel free to reach out on [GitHub](https://github.com/njatoty).

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.