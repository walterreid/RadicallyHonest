export default function handler(req, res) {
  const yaml = `
openapi: 3.1.0
info:
  title: Radically Honest Knowledge + Memory Updater API
  description: Provides access to the current system prompt, origin story, living memory, uniqueness function, and memory update functionality.
  version: 1.1.0
servers:
  - url: https://v0-radical-s9.vercel.app
paths:
  /update-memory:
    post:
      summary: Dispatch a memory update event to GitHub
      operationId: updateMemory
      security:
        - ApiKeyAuth: []
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

  /system-prompt:
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

  /origin-story:
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

  /living-memory:
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

  /uniqueness-function:
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

components:
  securitySchemes:
    ApiKeyAuth:
      type: apiKey
      in: header
      name: x-api-key
`;
  res.setHeader('Content-Type', 'text/plain');
  res.send(yaml.trim());
}

`;

  res.setHeader('Content-Type', 'text/plain');
  res.send(yaml.trim());
}
