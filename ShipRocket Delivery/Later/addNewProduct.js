var axios = require('axios');
var data = JSON.stringify({
  "name": "Batman",
  "category_code": "default",
  "type": "Single",
  "qty": "10",
  "sku": "bat1234"
});

var config = {
  method: 'post',
  url: 'https://apiv2.shiprocket.in/v1/external/products',
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
