const hubspot = require('@hubspot/api-client');

export default function auth(req, res) {
  const hubspotClient = new hubspot.Client();
  console.log(JSON.parse(req.body), JSON.parse(req.body).code);
  console.log(
    'authorization_code',
    JSON.parse(req.body).code,
    process.env.REDIRECT_URI,
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
  );
  return hubspotClient.oauth.tokensApi
    .createToken(
      'authorization_code',
      JSON.parse(req.body).code,
      process.env.REDIRECT_URI,
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET
    )
    .then((auth) => {
      res.json(auth);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}
