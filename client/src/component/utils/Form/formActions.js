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
    console.log(newFormdata);

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