import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import useCanvasSnap, { CanvasDrawingOptions, SnapshotProps } from './hooks';

export type CanvasDrawingOptionsWithoutDrawingEnabled = Omit<CanvasDrawingOptions, 'drawingEnabled'>;

type RectCoords = SnapshotProps['rectCoords'];

export type CapturedImage = {
  src: string,
  width: number,
  height: number,
  coordinates?: RectCoords// Accessing the rectCoords type directly
  
}
export interface CanvasCustomProps {
  drawingEnabled?: boolean;
  option?: CanvasDrawingOptionsWithoutDrawingEnabled;
  containerDivClassName?: string;
  onImageCaptured?: (image: CapturedImage) => void;
  onCaptureCanceled?: () => void;
}

// Define the props to extend React's intrinsic elements for the canvas
type CanvasProps = React.CanvasHTMLAttributes<HTMLCanvasElement> & CanvasCustomProps;

export const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(({
  drawingEnabled=false,
  containerDivClassName='',
  onImageCaptured,
  onCaptureCanceled,
  option,
  ...props
}, ref) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingEnabled = useMemo(() => !!drawingEnabled, [drawingEnabled]);

  // Expose the canvas ref to parent using forwardRef
  useImperativeHandle(ref, () => canvasRef.current!);

  useCanvasSnap(canvasRef, (snapshot) => {
    // get captured image
    const { isCanceled, capturedImage, rectCoords } = snapshot;

    if (capturedImage && rectCoords) {

      const base64 = capturedImage!;
      const { width, height } = rectCoords;
      onImageCaptured?.({
        src: base64,
        width: width,
        height: height,
        coordinates: rectCoords
      });

    }

    // canceled
    if (isCanceled) onCaptureCanceled?.();

  }, {
    ...option,
    drawingEnabled: isDrawingEnabled
  });


  return (
    <div style={{ position: 'relative'}} className={containerDivClassName}>
      <canvas className='react-canvas-snap_canvas' ref={canvasRef} {...props} />
    </div>
  )
});

Canvas.displayName = "Canvas";

export default Canvas;
