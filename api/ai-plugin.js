import axios from 'axios/dist/node/axios.cjs';

export default async function handler(req, res) {
  const data = {
    schema_version: "v1",
    name_for_human: "Radically Honest Memory",
    name_for_model: "radically_honest",
    description_for_human: "Access and manage the Radically Honest GPT's memory and system configuration.",
    description_for_model: "Provides endpoints to retrieve and update the Radically Honest GPT's living memory, origin story, uniqueness function, and system prompt.",
    auth: {
      type: "none"
    },
    api: {
      type: "openapi",
      url: "https://v0-radical-s9.vercel.app/api/openapi",
      "is_user_authenticated": false
    }
  };

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(data);
}
