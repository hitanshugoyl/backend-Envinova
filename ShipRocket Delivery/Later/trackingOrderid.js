var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://apiv2.shiprocket.in/v1/external/courier/track?order_id=123&channel_id=12345',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
