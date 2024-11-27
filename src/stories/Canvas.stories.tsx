import Canvas from "../components/Canvas";

export default {
    component: Canvas,
    title: "Canvas",
}

export const Default = {
    args: {
        width: 800,
        height: 400,
        drawingEnabled: true,
        option: {
            rect: {
                borderColor: 'orange',
                borderStyle: 'normal',
                borderWidth: 1,
                outterBackgroundColor: 'rgba(0, 255, 0, 0.1)'
            },
            helperText: {
                show: false,
                backgroundColor: 'black',
                textColor: 'white',
                position: 'bottom-right',
                fontSize: 12
            },
        },
        style: {
            border: "2px solid red"
        },
        onImageCaptured: (img: string) => console.log(img)
    }
}