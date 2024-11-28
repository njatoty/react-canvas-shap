import { CanvasSnapOptions } from "./hooks";

// Method to copy image to clipboard
export const copyBase64ImageToClipboard = async (base64String: string, mimeType = 'image/png') => {
    try {

        // Remove data URL scheme if present
        const base64Data = base64String.replace(/^data:.+;base64,/, '');
        const byteCharacters = atob(base64Data); // Decode Base64 string
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: mimeType });
        // Create a ClipboardItem and copy it to the clipboard
        const clipboardItem = new ClipboardItem({ [mimeType]: blob });
        await navigator.clipboard.write([clipboardItem]);

        console.log('Base64 image copied to clipboard!');

    } catch (err) {
        console.error('Failed to copy Base64 image to clipboard:', err);
    }
}

// to merge object to keep some values not changed
export const mergeSnapOptions = (
    target: CanvasSnapOptions,
    source: CanvasSnapOptions
): CanvasSnapOptions => {
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            
            const typedKey = key as keyof CanvasSnapOptions;

            // Check if the value is an object and not an array
            if (
                source[typedKey] &&
                typeof source[typedKey] === 'object' &&
                !Array.isArray(source[typedKey])
            ) {
                // Recursively merge objects
                target[typedKey] = mergeSnapOptions(
                    target[typedKey] as CanvasSnapOptions,
                    source[typedKey] as CanvasSnapOptions
                ) as never;
            } else {
                // For primitives or arrays, directly assign the value
                target[typedKey] = source[typedKey] as never;
            }
        }
    }
    return target;
};

