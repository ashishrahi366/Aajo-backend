const yup = require("yup");

exports.createUser = yup.object({
    user_fullName: yup
        .string()
        .required('First name is required')
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be less than 50 characters'),

    user_username: yup
        .string(),

    user_dob: yup
        .string()
        .required("date of birth is required"),

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

    user_confirmPassword: yup
        .string()
        .oneOf([yup.ref('user_password'), null], 'Passwords must match') // Ensure passwords match
        .required('Please confirm your password'),

    user_pnumber: yup
        .string()
        .required('Phone number is required')
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),

    user_address: yup
        .string()
        .required('Address is required'),

    user_city: yup
        .string(),
    // .required('City is required'),

    user_zipcode: yup
        .string(),
    // .required('Zipcode is required'),

    user_isHost: yup
        .boolean()
        .required('Host status is required')
        .oneOf([true, false], 'Host status must be true or false'),

    doc_type: yup
        .number()
        .required('document type is required'),

    doc_number: yup
        .number()
        .required('document number is required'),

});

exports.updateUser = yup.object({
    user_id: yup
        .number()
        .required('user id is required'),

    user_fullName: yup
        .string()
        // .required('First name is required')
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be less than 50 characters'),

    // user_lname: yup
    //     .string()
    //     // .required('Last name is required')
    //     .min(2, 'Last name must be at least 2 characters')
    //     .max(50, 'Last name must be less than 50 characters'),

    user_pnumber: yup
        .string()
        // .required('Phone number is required')
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),

    user_address: yup
        .string(),
    // .required('Address is required'),

    user_city: yup
        .string(),
    // .required('City is required'),

    // user_zipcode: yup
    //     .string(),
    // // .required('Zipcode is required')
});
exports.login = yup.object({
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
});
exports.profilePicDelete = yup.object({
    user_id: yup
        .string()
        .required("user id is required")
});
