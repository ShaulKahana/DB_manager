
const isTypeID = (value) => {
    try {
        if (isNaN(Number(value))) {
            return console.error("The answer must be of type 'number'");
        }
        if (value.length != 9) {
            return console.error("The id number must be only 9 digit");
        }
        return value;
    }
    catch (err) {
        console.error("The value is incorect", `${err}`);
    }
};

const isTypeGender = (value) => {
    try {
        if (value!="Male" && value!="Female") {
            return console.error("The answer must be 'Male' or 'Female'");
        }
        return value;
    }
    catch (err) {
        console.error("The value is incorect", `${err}`);
    }
};

const isTypeNumber = (value, length) => {
    try {
        if (isNaN(Number(value))) {
            return console.error("The answer must be of type 'number'");
        }
        const newValue = checkLength(value, length);
        if (newValue) {
            return newValue;
        }
    }
    catch (err) {
        console.error("The value is incorect", `${err}`);
    }
};

const isTypeString = (value, length) => {
    try {
        if(value.match(/([^A-Z])([^a-z ]+)/g) != null) {
            return console.error("The answer must be of type 'string'");
        }
        const newValue = checkLength(value, length);
        if (newValue) {
            return newValue;
        }
    }
    catch (err) {
        console.error("The value is incorect", `${err}`);
    }
};


const checkLength = (value, length) => {    
    if (!value) {
        return;
    }
    if (value.length > length) {
        console.error(`The value cant be more then ${length} CHARACTERS long!`);
        return;
    }
    return value;
};

export const check = (type, value, length) => {
    switch (type) {
        case "id":
            return isTypeID(value);
        case "string":
            return isTypeString(value, length);
        case "number":
            return isTypeNumber(value, length);
        case "gender":
            return isTypeGender(value);
    }
};