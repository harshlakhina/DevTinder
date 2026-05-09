const validator=require("validator");

function validateSignup(req){
    const {firstName,lastName,emailId,password,age,gender,about}=req.body;

    if(!firstName || !lastName){
        throw new Error("firstName and lastName is required");
    }
    else if(!age){
        throw new Error("Age is required")
    }
    else if( !gender){
        throw new Error ("Gender is required")
    }
    else if (!about){
        throw new Error ("About is required")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("email is invalid");
    }

    else if(!validator.isStrongPassword(password)){
        throw new Error("please enter a strong password");
    }  
}

function validateEditProfileData(req){

    const allowedFields=["firstName","lastName","skills","about","age","gender","photoUrl"];
    const isEditAllowed=Object.keys(req.body).every((field)=>allowedFields.includes(field));

    return isEditAllowed 
}

module.exports={
    validateSignup,
    validateEditProfileData
}
