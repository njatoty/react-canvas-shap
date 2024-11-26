import { useEffect, useRef, useState } from 'react'
import Canvas from '../components/Canvas'

export const Testing = () => {

    const [capturing, setCapturing] = useState(true)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas dimensions
        canvas.width = 500;
        canvas.height = 300;

        // Draw the title (Hello my dear)
        ctx.font = '24px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('Hello my dear', 20, 40); // x, y coordinates

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
    }, []);
    return (
        <div>
            <button type='button' onClick={() => setCapturing(!capturing)}>{capturing ? "Capture Enabled" : "Capture Disabled"}</button>
            <Canvas
                ref={canvasRef}
                drawingEnabled={capturing}
                option={{
                    imageQuality: "low",
                }}
                onCaptureCanceled={() => setCapturing(false)}
                onImageCaptured={(img) => console.log(img)} 
                width={800}
                height={600}
            />
        </div>
    )
}
