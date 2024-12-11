/// <reference types="react" />
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
    position?: "auto" | "top-right" | "bottom-right" | "top-left" | "bottom-left" | "top-center" | "bottom-center";
} | {
    show: false;
});
type Cursor = 'auto' | 'default' | 'none' | 'context-menu' | 'help' | 'pointer' | 'progress' | 'wait' | 'cell' | 'crosshair' | 'text' | 'vertical-text' | 'alias' | 'copy' | 'move' | 'no-drop' | 'not-allowed' | 'all-scroll' | 'zoom-in' | 'zoom-out' | 'ew-resize' | 'ns-resize' | 'nesw-resize' | 'nwse-resize' | 'col-resize' | 'row-resize' | 'copy' | 'grab' | 'grabbing';
export type CanvasSnapOptions = {
    drawingEnabled: boolean;
    rect?: {
        outterBackgroundColor?: string;
        borderColor?: string;
        borderStyle?: "dashed" | "dotted" | "solid";
        borderWidth?: number;
    };
    isGrayscale?: boolean;
    helperText?: HelperText<boolean>;
    cursor?: Cursor;
    copyImageToClipBoard?: boolean;
    imageQuality?: "low" | "medium" | "high";
};
export type SnapshotProps = {
    isCanceled: boolean;
    capturedImage: string | null;
    rectCoords: {
        x: number;
        y: number;
        height: number;
        width: number;
    } | null;
};
export type RectCoords = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare const useCanvasSnap: (ref: React.RefObject<HTMLCanvasElement> | null, callBack?: ((snapshot: SnapshotProps) => void) | undefined, option?: CanvasSnapOptions) => {
    canvasRef: import("react").RefObject<HTMLCanvasElement>;
};
export default useCanvasSnap;
//# sourceMappingURL=hooks.d.ts.map