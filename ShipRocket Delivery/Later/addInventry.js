var axios = require('axios');
var data = JSON.stringify({
  "data": [
    {
      "order_id": 14124005,
      "order_product_id": 43737767570843,
      "quantity": "1",
      "action": "add"
    }
  ]
});

var config = {
  method: 'patch',
  url: 'https://apiv2.shiprocket.in/v1/external/orders/fulfill',
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
