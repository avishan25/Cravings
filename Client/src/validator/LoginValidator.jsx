import {z} from "zod";
 const LoginSchema =z.object({

    
    email:z.string().trim().min(1,"email is required").email("Invalid email address"),
   
    password:z.string().trim().min(6,"Passwprd must be atleast 6 char")

})

export default LoginSchema