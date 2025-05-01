import axios from 'axios/dist/node/axios.cjs';

export default async function handler(req, res) {
  const { API_KEY, GITHUB_TOKEN } = process.env;
  const REPO_OWNER = 'walterreid';
  const MEMORY_REPO_NAME = 'RadicallyHonest';

  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const apiKeyHeader = req.headers['x-api-key'];
  const validKey = process.env.API_KEY;
  
  console.log("[Auth Check] Header received:", apiKeyHeader);
  console.log("[Auth Check] Env key expected:", validKey);
  
  if (!validKey || !apiKeyHeader || apiKeyHeader !== validKey) {
    console.warn("[Auth Check] ❌ FAILED");
    return res.status(403).send('Forbidden: Invalid API Key');
  } else {
    console.log("[Auth Check] ✅ PASSED");
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
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json'
        }
      }
    );
    res.status(200).send('Memory update dispatched');
  } catch (error) {
    // Improved logging block
    console.error('Dispatch error:', {
      status: error.response?.status,
      headers: error.response?.headers,
      data: error.response?.data,
      message: error.message
    });
    res.status(500).send(error.response?.data || 'Error dispatching memory update');
  }
}
