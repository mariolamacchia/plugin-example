const hubspot = require('@hubspot/api-client');

export default function auth(req, res) {
  const hubspotClient = new hubspot.Client();
  console.log(req);
  console.log(req.body);
  console.log(typeof req.body);
  console.log(JSON.parse(req.body));
  console.log(JSON.parse(req.body).code);
  console.log(req.body.code);
  return hubspotClient.oauth.tokensApi
    .createToken(
      'authorization_code',
      req.body.code,
      process.env.REDIRECT_URI,
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET
    )
    .then((response) => {
      res.json(response.body);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}
