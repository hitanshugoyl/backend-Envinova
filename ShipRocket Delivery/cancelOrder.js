const axios = require('axios');
const auth =require('./auth');

const cancelOrder=async () =>{
  var data = JSON.stringify({
    "ids": [
      Order_id   // -> order id from given by shiprocket
    ]
  });

var res=(await auth.res());
console.log(res["token"]);
  var config = {
    method: 'post',
    url: 'https://apiv2.shiprocket.in/v1/external/orders/cancel',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':'Bearer '+ res["token"]
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
}
cancelOrder();
