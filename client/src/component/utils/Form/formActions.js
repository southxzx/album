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

    return error; // Error là 1 mảng gồm 2 phần tử: bool + message

}

export const update = (element, formdata, formname) => {

    // Chuyển data sang newForm
    const newFormdata = {
        ...formdata
    }
    // ID của element: mail, password, name,...
    const newElement = {
        ...formdata[element.id]
    }
    
    // Lấy value
    newElement.value = element.event.target.value;

    // Blur: Di chuyển chuột ra khỏi form => validate 
    if (element.blur) {
        let validData = validate(newElement, formdata);

        // validData = [true,'message'] trả về từ error
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;
    // Update element
    newFormdata[element.id] = newElement;

    return newFormdata;

}

// Generate data
export const generateData =  (formdata, formname) => {
    let dataToSubmit = {};

    // Đẩy data vào dataToSubmit dạng json
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