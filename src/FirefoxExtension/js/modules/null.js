const isNullOrEmpty = (obj) => {

    if (!obj) {
        return true;
    }

    for (var i in obj) {
        return false;
    }

    return true;
}


const arrayIsEmpty = (array) => {
        
    if(Array.isArray(array) && !array.length){
        return true; 
    }

    return false;
}

const arrayIsNotEmpty = (array) => {
        
    if(Array.isArray(array) && array.length){
        return true; 
    }

    return false;
}

const arrayIsNullOrEmpty = (array) => {

    if (isNullOrEmpty(array) || arrayIsEmpty(array)) {
        return true;
    }

    return false;
}

export { isNullOrEmpty, arrayIsNullOrEmpty, arrayIsNotEmpty, arrayIsEmpty }