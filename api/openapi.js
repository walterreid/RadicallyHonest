export default function handler(req, res) {
  const yaml = `
openapi: 3.1.0
info:
  title: Radically Honest Knowledge + Memory Updater API
  description: Provides access to the current system prompt, origin story, living memory, uniqueness function, and memory update functionality.
  version: 1.1.1
servers:
  - url: https://v0-radical-s9.vercel.app
paths:
  /api/update-memory:
    post:
      summary: Dispatch a memory update event to GitHub
      operationId: updateMemory
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - title
                - version
                - bodyText
                - commitMessage
              properties:
                title:
                  type: string
                version:
                  type: string
                bodyText:
                  type: string
                commitMessage:
                  type: string
      responses:
        "200":
          description: Successfully dispatched
        "400":
          description: Missing fields
        "403":
          description: Forbidden (Invalid API key)
        "500":
          description: Server error
  /api/system-prompt:
    get:
      summary: Get the current system prompt
      operationId: getSystemPrompt
      responses:
        "200":
          description: Raw system prompt file
          content:
            text/plain:
              schema:
                type: string
  /api/origin-story:
    get:
      summary: Get the origin story
      operationId: getOriginStory
      responses:
        "200":
          description: Raw origin story file
          content:
            text/plain:
              schema:
                type: string
  /api/living-memory:
    get:
      summary: Get the living memory
      operationId: getLivingMemory
      responses:
        "200":
          description: Raw living memory file
          content:
            text/plain:
              schema:
                type: string
  /api/uniqueness-function:
    get:
      summary: Get the uniqueness function
      operationId: getUniquenessFunction
      responses:
        "200":
          description: Raw uniqueness function file
          content:
            text/plain:
              schema:
                type: string
`;

  res.setHeader('Content-Type', 'text/yaml');
  res.send(yaml.trim());
}
