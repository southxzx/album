export const validate = (element, formdata = []) => {
    let error = [true,''];

    // Check email có valid hay không
    if (element.validation.email){
        const valid = /\S+@\S+\.\S+/.test(element.value);
        const message = `${!valid ? 'The email is invalid' : ''}`;
        error = !valid ? [valid,message] : error;
    }

    // Check phải nhập kí tự vào các field
    if (element.validation.required){
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'This field is required' : ''}`;
        error = !valid ? [valid,message] : error;
    }

    return error;

}

export const update = (element, formdata, formname) => {

    const newFormdata = {
        ...formdata
    }
    const newElement = {
        ...formdata[element.id]
    }

    newElement.value = element.event.target.value;

    if (element.blur) {
        let validData = validate(newElement, formdata);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;
    newFormdata[element.id] = newElement;

    return newFormdata;

}

// Generate data
export const generateData =  (formdata, formname) => {
    let dataToSubmit = {};

    for (let key in formdata){
        dataToSubmit[key] = formdata[key].value;
    }

    return dataToSubmit;
}

// Check the form is valid or not
export const isFormValid = (formdata, formname) => {

    let formIsValid = true;

    for (let key in formdata){
        formIsValid = formdata[key].valid && formIsValid;
    }

    return formIsValid;

}