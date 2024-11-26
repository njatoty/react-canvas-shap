import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import useCanvasSnap from './hooks';

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

type CanvasDrawingOptions = {
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

export interface CanvasCustomProps {
  drawingEnabled?: boolean;
  option?: CanvasDrawingOptions;
  containerDivClassName?: string;
  onCaptured?: (base64: string) => void;
  onCanceled?: () => void;
}

// Define the props to extend React's intrinsic elements for the canvas
type CanvasProps = React.CanvasHTMLAttributes<HTMLCanvasElement> & CanvasCustomProps;

export const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(({
  drawingEnabled=false,
  containerDivClassName='',
  onCaptured,
  onCanceled,
  ...props
}, ref) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Expose the canvas ref to parent using forwardRef
  useImperativeHandle(ref, () => canvasRef.current!);

  useCanvasSnap(canvasRef, (snapshot) => {
    // get captured image
    const base64 = snapshot.capturedImage!;
    onCaptured?.(base64);

    // canceled
    if (snapshot.isCanceled) onCanceled?.();

  }, {
    ...props.option,
    drawingEnabled: drawingEnabled
  });


  return (
    <div style={{ position: 'relative'}} className={containerDivClassName}>
      <canvas ref={canvasRef} {...props} />
    </div>
  )
});

Canvas.displayName = "Canvas";

export default Canvas;
