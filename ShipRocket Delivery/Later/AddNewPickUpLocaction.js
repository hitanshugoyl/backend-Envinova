var axios = require('axios');
var data = JSON.stringify({
  "pickup_location": "Home",
  "name": "Deadpool",
  "email": "deadpool@chimichanga.com",
  "phone": "9777777779",
  "address": "Mutant Facility, Sector 3 ",
  "address_2": "",
  "city": "Pune",
  "state": "Maharshtra",
  "country": "India",
  "pin_code": "110022"
});

var config = {
  method: 'post',
  url: 'https://apiv2.shiprocket.in/v1/external/settings/company/addpickup',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {{token}}'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
