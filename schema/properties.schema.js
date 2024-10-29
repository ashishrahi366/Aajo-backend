const yup = require("yup");

exports.getLongLatProperty = yup.object({
    latitude: yup
        .number()
        .required('Latitude is required')
        .min(-90, 'Latitude must be greater than or equal to -90')
        .max(90, 'Latitude must be less than or equal to 90'),
    longitude: yup
        .number()
        .required('Longitude is required')
        .min(-180, 'Longitude must be greater than or equal to -180')
        .max(180, 'Longitude must be less than or equal to 180')
})