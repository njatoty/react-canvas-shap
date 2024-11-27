import React from 'react';
import { CanvasSnapOptions, SnapshotProps } from './hooks';
export type CanvasSnapOptionsWithoutDrawingEnabled = Omit<CanvasSnapOptions, 'drawingEnabled'>;
type RectCoords = SnapshotProps['rectCoords'];
export type CapturedImage = {
    src: string;
    width: number;
    height: number;
    coordinates?: RectCoords;
};
export interface CanvasCustomProps {
    drawingEnabled?: boolean;
    option?: CanvasSnapOptionsWithoutDrawingEnabled;
    containerDivClassName?: string;
    onImageCaptured?: (image: CapturedImage) => void;
    onCaptureCanceled?: () => void;
}
export declare const Canvas: React.ForwardRefExoticComponent<React.CanvasHTMLAttributes<HTMLCanvasElement> & CanvasCustomProps & React.RefAttributes<HTMLCanvasElement>>;
export default Canvas;
//# sourceMappingURL=Canvas.d.ts.map