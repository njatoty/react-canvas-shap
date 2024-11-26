import React from 'react';
type HelperText<T extends boolean> = {
    show: T;
} & ({
    show: true;
    value?: string;
    backgroundColor?: string;
    textColor?: string;
    fontSize?: number;
    fontFamily?: string;
    padding?: number;
    textHeight?: number;
    position?: "top-right" | "bottom-right" | "top-left" | "bottom-left" | "top-center" | "bottom-center";
} | {
    show: false;
});
type CanvasDrawingOptions = {
    rect?: {
        outterbackgroundColor?: string;
        borderColor?: string;
        borderStyle?: "dashed" | "dotted" | "solid";
        borderWidth?: number;
    };
    isGrayscale?: boolean;
    dpr?: number;
    scale?: number;
    helperText?: HelperText<boolean>;
};
export interface CanvasCustomProps {
    drawingEnabled?: boolean;
    option?: CanvasDrawingOptions;
    containerDivClassName?: string;
    onCaptured?: (base64: string) => void;
    onCanceled?: () => void;
}
export declare const Canvas: React.ForwardRefExoticComponent<React.CanvasHTMLAttributes<HTMLCanvasElement> & CanvasCustomProps & React.RefAttributes<HTMLCanvasElement>>;
export default Canvas;
//# sourceMappingURL=Canvas.d.ts.map