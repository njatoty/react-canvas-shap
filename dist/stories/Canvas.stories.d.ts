declare const _default: {
    component: import("react").ForwardRefExoticComponent<import("react").CanvasHTMLAttributes<HTMLCanvasElement> & import("../components/Canvas").CanvasCustomProps & import("react").RefAttributes<HTMLCanvasElement>>;
    title: string;
};
export default _default;
export declare const Default: {
    args: {
        width: number;
        height: number;
        drawingEnabled: boolean;
        option: {
            rect: {
                borderColor: string;
                borderStyle: string;
                borderWidth: number;
                outterBackgroundColor: string;
            };
            helperText: {
                show: boolean;
                backgroundColor: string;
                textColor: string;
                position: string;
                fontSize: number;
            };
        };
        style: {
            border: string;
        };
        onCaptured: (img: string) => void;
    };
};
//# sourceMappingURL=Canvas.stories.d.ts.map