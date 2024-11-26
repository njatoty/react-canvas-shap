import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { deepEqual } from './methods';

type HelperText<T extends boolean> = {
    show: T
} & ({
    show: true;
    value?: string;
    backgroundColor?: string;
    textColor?: string;
    fontSize?: number;
    fontFamily?: string;
    padding?: number;
    textHeight?: number;
    position?: "top-right" | "bottom-right" | "top-left" | "bottom-left" | "top-center" | "bottom-center"
} | {
    show: false
})

export type CanvasDrawingOptions = {
    drawingEnabled: boolean;
    rect?: {
        outterbackgroundColor?: string;
        borderColor?: string;
        borderStyle?: "dashed" | "dotted" | "solid",
        borderWidth?: number
    }
    isGrayscale?: boolean;
    dpr?: number;
    scale?: number;
    helperText?: HelperText<boolean>
}

export type SnapshotProps = {
    isCanceled: boolean;
    capturedImage: string | null;
    rectCoords: {
        x: number;
        y: number;
        height: number;
        width: number;
    }
}

export const useCanvasSnap = (
    ref: React.RefObject<HTMLCanvasElement> | null, // Optional ref parameter
    callBack?: (snapshot: SnapshotProps) => void,
    option: CanvasDrawingOptions = {
        drawingEnabled: false,
        isGrayscale: false,
    }
) => {
    const canvasRef = ref ?? useRef<HTMLCanvasElement>(null);
    const [layerCanvas, setLayerCanvas] = useState<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const initialRecCoords = useMemo(() => ({
        width: 0, height: 0,
        x: 0, y: 0
    }), []);
    const [rectCoords, setRectCoords] = useState(initialRecCoords); // To store rect dimensions

    const [defaultOption, setDefaultOption] = useState<CanvasDrawingOptions>(option);

    useEffect(() => {
        if (!deepEqual(option as unknown as ObjectConstructor, defaultOption as unknown as ObjectConstructor)) {
            setDefaultOption(option);
        }
    }, [option, defaultOption]);

    const clearLayerCanvas = useCallback(() => {
        if (!layerCanvas) return;
        // Clear the canvas
        const ctx = layerCanvas.getContext('2d');
        ctx?.clearRect(0, 0, layerCanvas.width, layerCanvas.height);
        setRectCoords(initialRecCoords);
    }, [layerCanvas]);

    // create layer canvas
    useEffect(() => {

        const currentCanvas = canvasRef.current;

        if (currentCanvas) {

            // init coords 
            setRectCoords(initialRecCoords);

            // check if layer exists yet
            [...(currentCanvas.parentElement?.children || [])].forEach(child => {
                if (child.tagName === 'CANVAS' && child.classList.contains('drawer-layer')) {
                    currentCanvas.parentElement?.removeChild(child);
                }
            })

            if (!defaultOption.drawingEnabled) {

                return;
            }

            const layer = currentCanvas.cloneNode(true) as HTMLCanvasElement;
            layer.className = 'drawer-layer';
            layer.style.position = 'absolute';
            layer.style.cursor = 'crosshair';
            layer.style.inset = '0';
            layer.style.zIndex = '10';

            setLayerCanvas(layer);

            currentCanvas.after(layer);
        }

    }, [canvasRef, defaultOption.drawingEnabled, defaultOption.scale, initialRecCoords]);


    // Method to capture image inside the rect
    const captureRectAsImage = useCallback(() => {

        if (!rectCoords || !canvasRef.current) return null;

        const { x: startX, y: startY, width, height } = rectCoords;

        // Create a new canvas for the cropped area
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = Math.abs(width);
        tempCanvas.height = Math.abs(height);
        const tempCtx = tempCanvas.getContext('2d');

        // Apply grayscale filter
        if (tempCtx) {

            if (defaultOption.isGrayscale)
                tempCtx.filter = 'grayscale(100%)';

            // Copy the area inside the rectangle
            tempCtx?.drawImage(
                canvasRef.current,
                startX,
                startY,
                Math.abs(width),
                Math.abs(height),
                0,
                0,
                Math.abs(width),
                Math.abs(height)
            );

            if (defaultOption.isGrayscale)
                // Reset the filter to avoid affecting subsequent drawings
                tempCtx.filter = 'none';
        }

        // Convert to data URL
        return tempCanvas.toDataURL('image/png');

    }, [rectCoords, canvasRef, defaultOption.isGrayscale]);


    useEffect(() => {

        if (!layerCanvas) return;

        const ctx = layerCanvas.getContext('2d');

        if (!ctx) return;

        if (!defaultOption.drawingEnabled) {
            // Clear the layerCanvas
            ctx.clearRect(0, 0, layerCanvas.width, layerCanvas.height);
            return;
        };

        const handleMouseDown = (event: MouseEvent) => {

            const rect = layerCanvas.getBoundingClientRect();

            // Adjust for both scaling and DPR
            const scaleX = (layerCanvas.width / rect.width) / (defaultOption.dpr || 1);
            const scaleY = (layerCanvas.height / rect.height) / (defaultOption.dpr || 1);

            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;

            setRectCoords(prev => ({ ...prev, x, y }));
            setIsDrawing(true);
        };

        const handleMouseMove = (event: MouseEvent) => {
            if (!isDrawing) return;

            const rect = layerCanvas.getBoundingClientRect();

            // Adjust for both scaling and DPR
            const scaleX = (layerCanvas.width / rect.width) / (defaultOption.dpr || 1);
            const scaleY = (layerCanvas.height / rect.height) / (defaultOption.dpr || 1);

            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;

            const width = x - rectCoords.x;
            const height = y - rectCoords.y;

            // Update the rectangle dimensions
            setRectCoords((prev) => ({
                ...prev,
                width,
                height,
            }));

            // Clear the canvas
            ctx.clearRect(0, 0, layerCanvas.width, layerCanvas.height);

            // Draw a dark semi-transparent overlay
            ctx.fillStyle = defaultOption.rect?.outterbackgroundColor || 'rgba(0, 0, 0, 0.2)';
            ctx.fillRect(0, 0, layerCanvas.width, layerCanvas.height);

            const lineWidth = defaultOption.rect?.borderWidth || 4;

            // Cut out the rectangle (sharp area)
            ctx.clearRect(rectCoords.x, rectCoords.y, width, height);

            // Apply border style
            if (defaultOption.rect?.borderStyle === 'dashed') {
                ctx.setLineDash([lineWidth * 2, lineWidth]); // Dash pattern: 6px dash, 4px gap
            } else if (defaultOption.rect?.borderStyle === 'dotted') {
                ctx.setLineDash([lineWidth, lineWidth]); // Dot pattern: 2px dash, 2px gap
            } else {
                ctx.setLineDash([]); // Solid line (normal)
            }

            ctx.strokeStyle = defaultOption.rect?.borderColor || 'green'; // Border color
            ctx.lineWidth = lineWidth; // Border thickness

            // Draw the border outside the cleared rectangle
            ctx.strokeRect(
                rectCoords.x - (lineWidth / 2), // Shift left by half the border width
                rectCoords.y - (lineWidth / 2), // Shift up by half the border width
                width + lineWidth, // Increase width to include the border
                height + lineWidth // Increase height to include the border
            );

            // draw text if set
            if (!defaultOption.helperText || defaultOption.helperText.show) {

                // Add text with a background at the bottom-right corner of the rectangle
                const text = defaultOption.helperText?.value || "Press Enter to submit, Escape to cancel";

                ctx.font = `${defaultOption.helperText?.fontSize || 16}px ${defaultOption.helperText?.fontFamily || 'Arial'}`; // Customize font and size
                ctx.textBaseline = "bottom"; // Align text to the bottom
                ctx.textAlign = "right"; // Align text to the right

                // Measure the text dimensions
                const textMetrics = ctx.measureText(text);
                const padding = defaultOption.helperText?.padding || 8; // Padding around the text
                const textWidth = textMetrics.width;
                const textHeight = defaultOption.helperText?.fontSize || 16; // Approximation of text height
                const marginY = textHeight * 2 + padding;

                // Background color
                ctx.fillStyle = defaultOption.helperText?.backgroundColor || "rgba(36, 172, 71, 0.9)"; // Semi-transparent black

                const position = defaultOption.helperText?.position || 'bottom-right';
                let textY = 0, rectY = 0, textX = 0, rectX = 0;
                const [yPosition, xPosition] = position.split('-');

                switch (yPosition) {
                    case 'top':
                        rectY = rectCoords.y - marginY;
                        textY = rectCoords.y - textHeight;
                        break;
                    case 'bottom':
                        rectY = rectCoords.y + height - textHeight - padding * 2 + marginY;
                        textY = rectCoords.y + height + (marginY) - padding;
                        break;
                }

                switch (xPosition) {
                    case 'left':
                        rectX = rectCoords.x;
                        textX = rectCoords.x + textWidth + padding;
                        break;
                    case 'right':
                        rectX = rectCoords.x + width - textWidth - padding * 2;
                        textX = rectCoords.x + width - padding;
                        break;
                    case 'center': default:
                        rectX = rectCoords.x + (width - textWidth) / 2 - padding * 2;
                        textX = rectCoords.x + (width + textWidth) / 2 - padding;
                        break;

                }


                ctx.fillRect(
                    rectX, // x position for background
                    rectY, // y position top for background
                    textWidth + padding * 2, // Background width
                    textHeight + padding * 2 // Background height
                );

                // Text color
                ctx.fillStyle = defaultOption.helperText?.textColor || "white";
                ctx.fillText(
                    text,
                    textX, // x position for text inside the background
                    textY // y position for text inside the background
                );
                // Reset dashed pattern for other drawings
                ctx.setLineDash([]);
            }

        };

        const handleMouseUp = () => {
            setIsDrawing(false);
        };

        // press enter
        const handlePressKey = (e: KeyboardEvent) => {
            // prevent default behaviour
            e.preventDefault();
            if (rectCoords.height === 0 || rectCoords.width === 0) return;

            if (e.key === 'Enter') {
                // create snapshot
                const snapshot: SnapshotProps = {
                    isCanceled: false,
                    capturedImage: captureRectAsImage(),
                    rectCoords: rectCoords
                }

                // return calback
                if (callBack) callBack(snapshot);

                setIsDrawing(false);
            }

            // to cancel drawing
            if (e.key === 'Escape') {
                clearLayerCanvas();
            }
        }

        // Add event listeners
        layerCanvas.addEventListener('mousedown', handleMouseDown);
        layerCanvas.addEventListener('mousemove', handleMouseMove);
        layerCanvas.addEventListener('mouseup', handleMouseUp);
        document.body.addEventListener("keydown", handlePressKey, { passive: false });

        // Cleanup event listeners
        return () => {
            layerCanvas.removeEventListener('mousedown', handleMouseDown);
            layerCanvas.removeEventListener('mousemove', handleMouseMove);
            layerCanvas.removeEventListener('mouseup', handleMouseUp);
            // remove key press
            document.body.removeEventListener("keydown", handlePressKey);
        };

    }, [layerCanvas, isDrawing, rectCoords, defaultOption, captureRectAsImage, callBack, clearLayerCanvas]);



    return { canvasRef };
};

export default useCanvasSnap;
