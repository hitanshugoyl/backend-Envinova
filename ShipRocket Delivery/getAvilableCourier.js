var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://apiv2.shiprocket.in/v1/external/courier/serviceability/',
  headers: {
    'Content-Type': 'application/json'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
