const axios = require('axios');
const app = require('express')();
export default function auth(req, res) {
  const body = {
    grant_type: 'authorization_code',
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
    code: req.body.code,
  };
  axios
    .post('https://api.hubapi.com/oauth/v1/token', body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(error.response.status).json(error.response.data);
    });
}
