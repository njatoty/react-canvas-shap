import Canvas from "../components/Canvas";

export default {
    component: Canvas,
    title: "Canvas",
}

export const Default = {
    args: {
        width: 400,
        height: 400,
        drawingEnabled: true,
        option: {
            rect: {
                borderColor: 'blue',
                borderStyle: 'dashed',
                borderWidth: 2,
                outterBackgroundColor: 'rgba(0, 255, 0, 0.1)'
            },
            helperText: {
                show: true,
                backgroundColor: 'black',
                textColor: 'white',
                position: 'top-right',
                fontSize: 12
            }
        },
        style: {
            border: "2px solid red"
        },
        onCaptured: (img: string) => console.log(img)
    }
}