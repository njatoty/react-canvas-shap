import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import useCanvasSnap, { CanvasDrawingOptions } from './hooks';

export type CanvasDrawingOptionsWithoutDrawingEnabled = Omit<CanvasDrawingOptions, 'drawingEnabled'>;

export interface CanvasCustomProps {
  drawingEnabled?: boolean;
  option?: CanvasDrawingOptionsWithoutDrawingEnabled;
  containerDivClassName?: string;
  onImageCaptured?: (base64: string) => void;
  onCaptureCanceled?: () => void;
}

// Define the props to extend React's intrinsic elements for the canvas
type CanvasProps = React.CanvasHTMLAttributes<HTMLCanvasElement> & CanvasCustomProps;

export const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(({
  drawingEnabled=false,
  containerDivClassName='',
  onImageCaptured,
  onCaptureCanceled,
  ...props
}, ref) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingEnabled = useMemo(() => !!drawingEnabled, [drawingEnabled]);

  // Expose the canvas ref to parent using forwardRef
  useImperativeHandle(ref, () => canvasRef.current!);

  useCanvasSnap(canvasRef, (snapshot) => {
    // get captured image
    const base64 = snapshot.capturedImage!;
    onImageCaptured?.(base64);

    // canceled
    if (snapshot.isCanceled) onCaptureCanceled?.();

  }, {
    ...props.option,
    drawingEnabled: isDrawingEnabled
  });


  return (
    <div style={{ position: 'relative'}} className={containerDivClassName}>
      <canvas ref={canvasRef} {...props} />
    </div>
  )
});

Canvas.displayName = "Canvas";

export default Canvas;
