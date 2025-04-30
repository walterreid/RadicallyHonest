const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = "walterreid";
const REPO_NAME = "RadicallyHonest";
const API_KEY = process.env.API_KEY; // simple protection

app.post('/update-memory', async (req, res) => {
  if (req.headers['x-api-key'] !== API_KEY) {
    return res.status(403).send('Forbidden');
  }

  const { title, version, bodyText, commitMessage } = req.body;

  if (!title || !version || !bodyText || !commitMessage) {
    return res.status(400).send('Missing fields');
  }

  const today = new Date().toISOString().split('T')[0];
  const formattedUpdate = `\n\n## ${version} — ${title}\n${today}\n\n${bodyText}\n---\n`;

  try {
    await axios.post(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/dispatches`, {
      event_type: "memory_update",
      client_payload: {
        update_text: formattedUpdate,
        commit_message: commitMessage
      }
    }, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.everest-preview+json'
      }
    });
    res.send('Memory update dispatched');
  } catch (error) {
    console.error(error.response?.data || error);
    res.status(500).send(error.response?.data || 'Error dispatching memory update');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Memory Updater API running on port ${port}`));
