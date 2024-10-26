const yup = require("yup");

exports.createUser = yup.object({
    user_fname: yup
        .string()
        .required('First name is required')
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be less than 50 characters'),
        
    user_lname: yup
        .string()
        // .required('Last name is required')
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must be less than 50 characters'),
        
    user_username: yup
        .string(),
        // .required('Username is required')
        // .min(3, 'Username must be at least 3 characters')
        // .max(20, 'Username must be less than 20 characters'),
        
    user_email: yup
        .string()
        .email('Must be a valid email')
        .required('Email is required'),
        
    user_password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-zA-Z]/, 'Password must contain both uppercase and lowercase letters')
        .matches(/\d/, 'Password must contain at least one number'),
        
    user_pnumber: yup
        .string()
        .required('Phone number is required')
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
        
    user_address: yup
        .string()
        .required('Address is required'),
        
    user_city: yup
        .string()
        .required('City is required'),
        
    user_zipcode: yup
        .string()
        .required('Zipcode is required')
        // .matches(/^\d{5}$/, 'Zipcode must be exactly 5 digits')
});
