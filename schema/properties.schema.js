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
});

exports.getSingleProperty = yup.object({
    propId: yup
        .number()
        .required("property id is required"),
});

exports.createProperty = yup.object({
    property_name: yup
        .string()
        .required("title is required"),
    property_address: yup
        .string()
        .required("address is required"),
    property_longitude: yup
        .string()
        .required("cordinates are required"),
    property_latitude: yup
        .string()
        .required("cordinates are required"),
    property_city: yup
        .string()
        .required("city is required"),
    property_state: yup
        .number()
        .required("state is required"),
    property_contry: yup
        .number()
        .required("country is required"),
    property_desc: yup
        .string()
        .required("description is required"),
    property_price: yup
        .number()
        .required("price is required"),
    property_mini_price: yup
        .number()
        .required("minimum price is required"),
})