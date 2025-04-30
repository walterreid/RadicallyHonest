import axios from 'axios';

export default async function handler(req, res) {
  const { API_KEY, GITHUB_TOKEN } = process.env;
  const REPO_OWNER = 'walterreid';
  const MEMORY_REPO_NAME = 'RadicallyHonest';

  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  if (req.headers['x-api-key'] !== API_KEY) {
    return res.status(403).send('Forbidden: Invalid API Key');
  }

  const { title, version, bodyText, commitMessage } = req.body;

  if (!title || !version || !bodyText || !commitMessage) {
    return res.status(400).send('Missing required fields');
  }

  const today = new Date().toISOString().split('T')[0];
  const formattedUpdate = `\n\n## ${version} — ${title}\n${today}\n\n${bodyText}\n---\n`;

  const payload = {
    event_type: 'memory_update',
    client_payload: {
      update_text: formattedUpdate,
      commit_message: commitMessage
    }
  };

  try {
    await axios.post(
      `https://api.github.com/repos/${REPO_OWNER}/${MEMORY_REPO_NAME}/dispatches`,
      payload,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json'
        }
      }
    );
    res.status(200).send('Memory update dispatched');
  } catch (error) {
    console.error('GitHub dispatch failed:', error.response?.data || error.message);
    res.status(500).send(error.response?.data || 'Error dispatching memory update');
  }
}
