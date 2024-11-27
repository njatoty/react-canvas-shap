import React from 'react';
import { CanvasDrawingOptions } from './hooks';
export type CanvasDrawingOptionsWithoutDrawingEnabled = Omit<CanvasDrawingOptions, 'drawingEnabled'>;
export type CapturedImage = {
    src: string;
    width: number;
    height: number;
};
export interface CanvasCustomProps {
    drawingEnabled?: boolean;
    option?: CanvasDrawingOptionsWithoutDrawingEnabled;
    containerDivClassName?: string;
    onImageCaptured?: (image: CapturedImage) => void;
    onCaptureCanceled?: () => void;
}
export declare const Canvas: React.ForwardRefExoticComponent<React.CanvasHTMLAttributes<HTMLCanvasElement> & CanvasCustomProps & React.RefAttributes<HTMLCanvasElement>>;
export default Canvas;
//# sourceMappingURL=Canvas.d.ts.map