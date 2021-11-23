var axios = require('axios');
var data = JSON.stringify({
  "order_id": "99711997",
  "order_date": "2019-08-05",
  "channel_id": "76893",
  "pickup_customer_name": "Deadpool",
  "pickup_last_name": "Chimichanga",
  "pickup_address": "Home",
  "pickup_address_2": "DDA",
  "pickup_city": "Delhi",
  "pickup_state": "New Delhi",
  "pickup_country": "India",
  "pickup_pincode": "110002",
  "pickup_email": "deadpool@red.com",
  "pickup_phone": "9999999999",
  "pickup_isd_code": "91",
  "pickup_location_id": 41514,
  "shipping_customer_name": "Jax",
  "shipping_last_name": "Doe",
  "shipping_address": "Castle",
  "shipping_address_2": "Bridge",
  "shipping_city": "Mumbai",
  "shipping_country": "India",
  "shipping_pincode": "220022",
  "shipping_state": "Maharashtra",
  "shipping_email": "jax@tank.com",
  "shipping_isd_code": "91",
  "shipping_phone": "8888888888",
  "order_items": [
    {
      "sku": "ball123",
      "name": "Tennis Ball",
      "units": 1,
      "selling_price": 10,
      "discount": 0,
      "hsn": "4412"
    }
  ],
  "payment_method": "Prepaid",
  "total_discount": "0",
  "sub_total": 10,
  "length": 10,
  "breadth": 15,
  "height": 20,
  "weight": 1
});

var config = {
  method: 'post',
  url: 'https://apiv2.shiprocket.in/v1/external/orders/create/return',
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
