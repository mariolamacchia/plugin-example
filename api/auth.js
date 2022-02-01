const hubspot = require('@hubspot/api-client');

export default function auth(req, res) {
  const hubspotClient = new hubspot.Client();
  console.log(req);
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
