const model = require("../models");

const properties = [
    { "latitude": 28.493670264313025, "longitude": 77.40905396593139 },
    { "latitude": 28.493421645877618, "longitude": 77.40704901296544 },
    { "latitude": 28.497254281658094, "longitude": 77.41067664708068 },
    { "latitude": 28.497107210920156, "longitude": 77.40825347919804 },
    { "latitude": 28.492816532215237, "longitude": 77.40757434207553 },
    { "latitude": 28.495592528283737, "longitude": 77.40930631607087 },
    { "latitude": 28.495779905101205, "longitude": 77.41035975496571 },
    { "latitude": 28.497392323865288, "longitude": 77.4105494733159 },
    { "latitude": 28.496774797046214, "longitude": 77.41039872177174 },
    { "latitude": 28.495767718515452, "longitude": 77.40751342416773 },
    { "latitude": 28.49455188739455, "longitude": 77.40909784161366 },
    { "latitude": 28.494268982272963, "longitude": 77.40829779597871 },
    { "latitude": 28.49523585959043, "longitude": 77.40752285844756 },
    { "latitude": 28.493383224146925, "longitude": 77.41039435381806 },
    { "latitude": 28.49688762667398, "longitude": 77.40761367864421 },
    { "latitude": 28.49341945573599, "longitude": 77.40872919672863 },
    { "latitude": 28.49404704742526, "longitude": 77.40699779691501 },
    { "latitude": 28.496682379387956, "longitude": 77.40683959145228 },
    { "latitude": 28.497500243154956, "longitude": 77.41057258303726 },
    { "latitude": 28.497125300613366, "longitude": 77.40740265528011 },
    { "latitude": 28.497727824125583, "longitude": 77.4085113442835 },
    { "latitude": 28.496864528736392, "longitude": 77.40936162816094 },
    { "latitude": 28.493115585850088, "longitude": 77.41053392943076 },
    { "latitude": 28.497118193955163, "longitude": 77.41057938730896 }
  ]


const addProperty = async (req, res) => {
    const data = properties.map((p, i) => {
        // console.log(p)
        // console.log(i)
        let obj = {

            property_name: `Demo_${i + 49}`,
            property_address: "test_address",
            property_longitude: p.longitude,
            property_latitude: p.latitude,
            property_city: "Chandigarh",
            property_desc: "test_desc",
            property_price: i + 100,
            property_mini_price: 100 - i,
        };
        return obj;
    });
    console.log(data, "data")
    try {
        await model.tbl_properties.bulkCreate(data)
        // return 
    } catch (error) {
        console.log(error)
    }
};



module.exports = {
    addProperty
}