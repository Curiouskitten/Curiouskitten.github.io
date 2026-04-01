export default async function handler(req, res) {
  const { code } = req.query;
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code,
      }),
    });

    const data = await response.json();
    const token = data.access_token;

    if (token) {
      const script = `
        <script>
        (function() {
          function receiveMessage(e) {
            console.log("receiveMessage %o", e);
            if (e.data !== "authorizing:github") return;
            window.opener.postMessage(
              'authorization:github:success:{"token":"${token}","provider":"github"}',
              e.origin
            );
          }
          window.addEventListener("message", receiveMessage, false);
          window.opener.postMessage("authorizing:github", "*");
        })()
        </script>`;
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(script);
    } else {
      res.status(200).send('Error: no token received from GitHub');
    }
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
}
