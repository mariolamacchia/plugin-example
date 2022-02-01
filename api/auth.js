const hubspot = require('@hubspot/api-client');

export default function auth(req, res) {
  const hubspotClient = new hubspot.Client();
  return hubspotClient.oauth.defaultApi
    .createToken(
      'authorization_code',
      req.query.code,
      process.env.REDIRECT_URI,
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET
    )
    .then((response) => {
      res.json(response.body);
    })
    .catch((error) => {
      res.status(500).json(error.response);
    });
}
