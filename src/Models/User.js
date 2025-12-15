const validators=require("validator");
const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        minlength:3,
        maxlength:50,
        required:true
    },

    lastName:{
        type:String,
         minlength:3,
         maxlength:15
    },

    emailId:{
        type:String,
        unique:true,
        lowercase:true,
        tirm:true,
        required:true,
        validate(value){
            if(!validators.isEmail(value)) 
                throw new Error("Invalid Email Address : "+ value);
           }
    },

    password:{
        type:String,
        trim:true,
        required:true,
        validate(value){
            if(!validators.isStrongPassword(value)) 
                throw new Error("Please enter a strong password : "+ value);
            }
    },

    gender:{
        type:String,
        validate(value){
          if(!["Male","female","others"].includes(value)){
            throw new Error("please enter a valid gender");
          }
        }
    },

    age:{
        type:Number,
        min:18
    },

    skills:{
        type:[String],
    },

    about:{
        type:String
    } ,

    photoUrl:{
        type:String,
        default:"https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-image-illustration-285843601.jpg",
        validate(value){
            if(!validators.isURL(value)) 
                throw new Error("Please enter a valid photo URL : "+ value);
           }
    }

},
{timestamps:true}
);

module.exports=mongoose.model("user",userSchema);