var axios = require('axios');
var data = JSON.stringify({
  "shipment_id": "",
  "courier_id": "",
  "status": ""
});

var config = {
  method: 'post',
  url: 'https://apiv2.shiprocket.in/v1/external/courier/assign/awb',
  headers: {
    'Content-Type': 'application/json'
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
