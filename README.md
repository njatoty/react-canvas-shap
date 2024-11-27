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

export default YourComponent;