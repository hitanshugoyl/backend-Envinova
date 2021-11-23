var axios = require('axios');
const auth =require('./auth');
(async () =>{
  let res=await auth.res();
  var config = {
    method: 'get',
    url: 'https://apiv2.shiprocket.in/v1/external/courier/serviceability/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+res["token"]
    },
  };

  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
})();
