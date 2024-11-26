
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
