import React, { useEffect, useRef, useState } from 'react'
import Canvas, { CapturedImage } from '../components/Canvas'
//@ts-ignore
import emoji from './emoji.png'

export const Demo = () => {

    const [capturing, setCapturing] = useState(true);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [capturedImage, setCapturedImage] = useState<CapturedImage>({
        src: '',
        width: 100,
        height: 100,
    });

    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Draw the title (Hello my dear)
        ctx.font = '24px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('Hello my friend,', 20, 40); // x, y coordinates

        // Draw the paragraph (Lorem ipsum)
        ctx.font = '16px Arial';
        ctx.fillStyle = 'black';
        const loremText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`;
        
        const lineHeight = 20;
        const maxWidth = 460; // Maximum width for the text

        let line = '';
        let yPosition = 60; // Starting y position for the paragraph

        // Split the text into words and draw each line
        loremText.split(' ').forEach(word => {
            const testLine = line + word + ' ';
            const width = ctx.measureText(testLine).width;

            if (width > maxWidth) {
                ctx.fillText(line, 20, yPosition);
                line = word + ' ';
                yPosition += lineHeight;
            } else {
                line = testLine;
            }
        });

        // Draw the last line of text
        ctx.fillText(line, 20, yPosition);


        // Insert the image below the text
        const img = new Image(); // Create a new image element
        img.src = emoji; // Replace with your image path

        img.onload = () => {
            const imageWidth = 200; // Set desired width
            const imageHeight = 200; // Set desired height
            const imageYPosition = yPosition - 30; // Add some padding below the text
            const imageXPosition = 0; // Adjust as needed

            // Draw the image on the canvas
            ctx.drawImage(img, imageXPosition, imageYPosition, imageWidth, imageHeight);
        };
    }, []);
    return (
        <div>
            <button
                type='button'
                style={{ marginBottom: '1rem'}}
                onClick={() => setCapturing(!capturing)}
            >{capturing ? "Capture Enabled" : "Capture Disabled"}</button>
            <Canvas
                ref={canvasRef}
                drawingEnabled={capturing}
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
                    imageQuality: "low",
                }}
                onCaptureCanceled={() => setCapturing(false)}
                onImageCaptured={(img) => setCapturedImage(img)} 
                width={500}
                height={300}
                style={{
                    border: '1px dashed #989898'
                }}
            />
            <div style={{ padding: '1rem'}}>
                <p>Captured Image:</p>
                {
                    capturedImage.src &&
                    <img src={capturedImage.src} width={capturedImage.width} height={capturedImage.height} alt='captured image' style={{outline: "2px solid lime"}} />
                }
            </div>
        </div>
    )
}
