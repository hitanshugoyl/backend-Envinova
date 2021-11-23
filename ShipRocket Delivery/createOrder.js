const axios = require('axios');
const auth =require('./auth');
const order=async ()=>{
let data = JSON.stringify({
  "order_id": "12345678900",
  "order_date": "2021-10-10 00:30",
  "pickup_location": "MOHALI",
  "billing_customer_name": "Vishal",
  "billing_last_name": "Gupta",
  "billing_address": "House 111",
  "billing_address_2": "Near Hokage House",
  "billing_city": "New Delhi",
  "billing_pincode": "110076",
  "billing_state": "Delhi",
  "billing_country": "India",
  "billing_email": "phpvishal@gmail.com",
  "billing_phone": "9540608104",
  "shipping_is_billing": true,
  "shipping_customer_name": "",
  "shipping_last_name": "",
  "shipping_address": "",
  "shipping_address_2": "",
  "shipping_city": "",
  "shipping_pincode": "",
  "shipping_country": "",
  "shipping_state": "",
  "shipping_email": "",
  "shipping_phone": "",
  "order_items": [
    {
      "name": "TShirt",
      "sku": "tshirt",
      "units": 10,
      "selling_price": "900",
      "discount": "",
      "tax": "",
      "hsn": 441122
    }
  ],
  "payment_method": "Prepaid",
  "shipping_charges": 0,
  "giftwrap_charges": 0,
  "transaction_charges": 0,
  "total_discount": 0,
  "sub_total": 9000,
  "length": 10,
  "breadth": 15,
  "height": 20,
  "weight": 2.5
});

var res=(await auth.res());
console.log(res["token"]);
  var config = {
    method: 'post',
    url: 'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',

    headers: {
      'Content-Type': 'application/json',
      'Authorization':'Bearer '+ res["token"]
    },
    data : data
  }

  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  })
}

order()
