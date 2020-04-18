export const objectsAreEqual = (obj1, obj2) => {
    let isEqual = true;
    
    for (let key in obj1) {
        if (key === 'text') continue;
        isEqual = obj1[key] === obj2[key] && isEqual;
    }

    return isEqual;
}
