import axios from 'axios';

export default async function handler(req, res) {
  const url = 'https://raw.githubusercontent.com/walterreid/RadicallyHonest/main/system_prompt.md';
  try {
    const response = await axios.get(url);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching system prompt:', error.message);
    res.status(500).send('Error fetching system prompt');
  }
}
