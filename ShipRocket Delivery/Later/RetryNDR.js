var axios = require('axios');
var data = JSON.stringify({
  "action": "return",
  "comments": "The Byer does not want the product"
});

var config = {
  method: 'post',
  url: 'https://apiv2.shiprocket.in/v1/external/ndr/8805225468/action',
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
