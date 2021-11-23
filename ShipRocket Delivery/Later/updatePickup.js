var axios = require('axios');
var data = JSON.stringify({
  "order_id": [
    16167171
  ],
  "pickup_location": "Delhi"
});

var config = {
  method: 'patch',
  url: 'https://apiv2.shiprocket.in/v1/external/orders/address/pickup',
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
