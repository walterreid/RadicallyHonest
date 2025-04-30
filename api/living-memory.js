import axios from 'axios';

export default async function handler(req, res) {
  const REPO_OWNER = 'walterreid';
  const MEMORY_REPO_NAME = 'RadicallyHonest';

  const url = `https://raw.githubusercontent.com/${REPO_OWNER}/${MEMORY_REPO_NAME}/main/Radically_Honest_Living_Memory_v1.txt`;

  try {
    const response = await axios.get(url);
    res.setHeader('Content-Type', 'text/plain');
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching Living Memory:', error.message);
    res.status(500).send('Error fetching Living Memory');
  }
}
