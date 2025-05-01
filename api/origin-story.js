import axios from 'axios/dist/node/axios.cjs';

export default async function handler(req, res) {
  const url = 'https://raw.githubusercontent.com/walterreid/RadicallyHonest/main/origin_story.md';
  try {
    const response = await axios.get(url);
    res.setHeader('Content-Type', 'text/plain');
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching origin story:', error.message);
    res.status(500).send('Error fetching origin story');
  }
}
