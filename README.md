# react-canvas-snap

`react-canvas-snap` is a React library that allows you to easily capture a specific region of a canvas using the mouse cursor. It enables users to draw a selection box on the canvas with their mouse and capture the content within the selected area.

# Demo
![Demo of the app](https://media.giphy.com/media/W5I3xZO4HQprE4eFZP/giphy.gif)

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

```bash
import Canvas from 'react-canvas-snap';
```

## Example Usage

```bash
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

```bash
import { useCanvasSnap } from 'react-canvas-snap';
```
To use the useCanvasSnap hook from react-canvas-snap, you can follow the different usage patterns based on whether you want to pass a ref to it or not.

### 1. Without Using Ref:

If you don't want to manually handle the ref, you can simply pass null to the hook. It will return a ref that you can assign to your canvas element.


```bash
  const { canvasRef } = useCanvasSnap(null);
```
### 2. Using a Ref Manually:
If you prefer to use your own ref, you can create one using useRef and pass it to useCanvasSnap. This allows you to have more control over the ref.

```bash
// Create your own ref with useRef
const canvasRef = useRef(null);

// Pass the ref to useCanvasSnap
useCanvasSnap(canvasRef);
```

## Full usage of hook

``` bash
import React from 'react';
import { useCanvasSnap } from 'react-canvas-snap';

const MyComponent = () => {
    const [drawinEnabled, setDrawingEnabled] = useState(false);

    const option = {
        drawingEnabled: true,
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

    const { canvasRef } useCanvasSnap(null, handleSnapshot, option);

    return (
        <div style={{ position: 'relative'}}>
            <canvas ref={canvasRef} width={400} height={400} />
        </div>
    )
};
    
```