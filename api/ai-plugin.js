import axios from 'axios/dist/node/axios.cjs';

export default async function handler(req, res) {
  const data = '{ "api": { "type": "openapi", "url": "https://v0-radical-s9.vercel.app/openapi.yaml", "has_user_authentication": false }}';
  res.setHeader('Content-Type', 'text/plain');
  res.send(data);
}
