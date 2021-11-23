const axios = require('axios');

var data = JSON.stringify({
  "email": "balkarsandhu999@gmail.com",
  "password": "Sandhu#123"
});

var config = {
  method: 'post',
  url: 'https://apiv2.shiprocket.in/v1/external/auth/login',
  headers: {
    'Content-Type': 'application/json'
  },
  data : data
};

const res =async  ()=>{
   let response=(await axios(config)).data;
   return response;
}
res();
module.exports={res};
