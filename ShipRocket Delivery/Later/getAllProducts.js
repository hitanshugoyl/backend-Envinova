var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://apiv2.shiprocket.in/v1/external/products',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {{token}}'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
