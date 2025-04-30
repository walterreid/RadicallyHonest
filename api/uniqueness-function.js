import axios from 'axios';

export default async function handler(req, res) {
  const url = 'https://raw.githubusercontent.com/walterreid/RadicallyHonest/main/Radically_Honest_Uniqueness_Function_v1.txt';
  try {
    const response = await axios.get(url);
    res.setHeader('Content-Type', 'text/plain');
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching uniqueness function:', error.message);
    res.status(500).send('Error fetching uniqueness function');
  }
}
