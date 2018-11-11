//React doesn't like kebaab case, and the API uses it, so I made this. Doesn't catch numbers and stuff in variable names, but doesn;t need to for now
export function camelToKebab(object) {
    let newObject = Object.keys(object).reduce((accObject, currentPropertyName) => {
        let words = currentPropertyName.match(/(^[^A-Z]+)|([A-Z][^A-Z]+)/g);

        let newPropertyName = words.reduce((newString, word, index) => {
            if (index !== 0) {
                newString += "-";
            }

            newString += word;

            return newString.toLowerCase();
        }, "");

        accObject[newPropertyName] = object[currentPropertyName];

        return accObject;
    }, {});

    //Return a copy
    return Object.assign({}, newObject);
}

//Do NOT try this at home. Despite appearances, it's much harder to convert a kebab back into a camel than the other way around
export function kebabToCamel(object) {
    let newObject = Object.keys(object).reduce((accObject, currentPropertyName) => {
        let words = currentPropertyName.match(/(^[^-]+)|(-[^-]+)/g);

        let newPropertyName = words.reduce((newString, word, index) => {
            if (index !== 0) {
                word = word[1].toUpperCase() + word.slice(2);
            }

            newString += word;

            return newString;
        }, "");

        accObject[newPropertyName] = object[currentPropertyName];

        return accObject;
    }, {});

    //Return a copy
    return Object.assign({}, newObject);
}