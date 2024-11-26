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
export type CanvasDrawingOptions = {
    drawingEnabled: boolean;
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
export type SnapshotProps = {
    isCanceled: boolean;
    capturedImage: string | null;
    rectCoords: {
        x: number;
        y: number;
        height: number;
        width: number;
    };
};
export declare const useCanvasSnap: (ref: React.RefObject<HTMLCanvasElement> | null, callBack?: (snapshot: SnapshotProps) => void, option?: CanvasDrawingOptions) => {
    canvasRef: import("react").RefObject<HTMLCanvasElement>;
};
export default useCanvasSnap;
//# sourceMappingURL=hooks.d.ts.map