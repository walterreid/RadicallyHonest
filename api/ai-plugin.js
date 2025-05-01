import axios from 'axios/dist/node/axios.cjs';

export default async function handler(req, res) {
  const data = '"api": { \
    "type": "openapi", \
    "url": "https://v0-radical-s9.vercel.app/openapi.yaml" \
  }'
  res.setHeader('Content-Type', 'text/plain');
  res.send(data);
}
