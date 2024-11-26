
export const goToPage = (pageNumber: number) => {
    const pageElement = document.getElementById(`page-${pageNumber}`);
    if (pageElement) {
        pageElement.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
};

export const deepEqual = (obj1: ObjectConstructor, obj2: ObjectConstructor) => {
    // Check if both are strictly equal
    if (obj1 === obj2) return true;

    // Check if either is null or not an object
    if (obj1 === null || obj2 === null || typeof obj1 !== "object" || typeof obj2 !== "object") {
        return false;
    }

    // Get keys of both objects
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Check if the number of keys is different
    if (keys1.length !== keys2.length) return false;

    // Check each key recursively
    for (const key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}

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

        const url = URL.createObjectURL(blob);

        // Create a link element to download the file
        const link = document.createElement('a');
        link.href = url;
        link.download = "captured.png";
        link.click();

        // Cleanup
        URL.revokeObjectURL(url);
        // Create a ClipboardItem and copy it to the clipboard
        const clipboardItem = new ClipboardItem({ [mimeType]: blob });
        await navigator.clipboard.write([clipboardItem]);

        console.log('Base64 image copied to clipboard!');

    } catch (err) {
        console.error('Failed to copy Base64 image to clipboard:', err);
    }
}