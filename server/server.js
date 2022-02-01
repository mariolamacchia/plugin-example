const axios = require('axios');
const app = require('express')();
app.use(require('body-parser').json());

app.post('oauth-verify', (req, res) => {
  const body = {
    grant_type: 'authorization_code',
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
    code: req.body.code,
  };
  axios.post('https://api.hubapi.com/oauth/v1/token', body).then((response) => {
    res.json(response.data);
  });
});
