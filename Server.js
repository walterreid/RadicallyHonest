const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = "walterreid";
const MEMORY_REPO_NAME = "RadicallyHonest";
const API_KEY = process.env.API_KEY; // simple protection

// === Existing POST route: Update Memory ===
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
    await axios.post(`https://api.github.com/repos/${REPO_OWNER}/${MEMORY_REPO_NAME}/dispatches`, {
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

const fetchFileFromGithub = async (path) => {
  const url = `https://raw.githubusercontent.com/${REPO_OWNER}/${MEMORY_REPO_NAME}/main/${path}`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3.raw' // still valid, but fallback needed
    }
  });

  if (typeof response.data === 'string') {
    // raw mode worked as expected
    return response.data;
  }

  if (response.data.content && response.data.encoding === 'base64') {
    return Buffer.from(response.data.content, 'base64').toString('utf8');
  }

  throw new Error('Unexpected response format');
};



app.get('/system_prompt', async (req, res) => {
  try {
    const data = await fetchFileFromGithub('system_prompt.md');
    res.type('text/plain').send(data);
  } catch (error) {
    console.error(error.response?.data || error);
    res.status(500).send('Error fetching system prompt');
  }
});

app.get('/origin_story', async (req, res) => {
  try {
    const data = await fetchFileFromGithub('origin_story.md');
    res.type('text/plain').send(data);
  } catch (error) {
    console.error(error.response?.data || error);
    res.status(500).send('Error fetching origin story');
  }
});

app.get('/living_memory', async (req, res) => {
  try {
    const data = await fetchFileFromGithub('Radically_Honest_Living_Memory_v1.txt');
    res.type('text/plain').send(data);
  } catch (error) {
    console.error(error.response?.data || error);
    res.status(500).send('Error fetching living memory');
  }
});

app.get('/uniqueness_function', async (req, res) => {
  try {
    const data = await fetchFileFromGithub('Radically_Honest_Uniqueness_Function_v1.txt');
    res.type('text/plain').send(data);
  } catch (error) {
    console.error(error.response?.data || error);
    res.status(500).send('Error fetching uniqueness function');
  }
});

// === Server startup ===
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Memory Updater API running on port ${port}`));
