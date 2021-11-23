var axios = require('axios');
var data = JSON.stringify({
  "awbs": [
    "788830567028",
    "788829354408"
  ]
});

var config = {
  method: 'post',
  url: 'https://apiv2.shiprocket.in/v1/external/courier/track/awbs',
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
