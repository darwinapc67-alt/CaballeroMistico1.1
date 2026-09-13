const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 8787);
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ROOT = __dirname;

const systemPrompt = [
  "Eres la asistente inteligente de Caballero Místico.",
  "Responde en español, de forma natural y útil, sobre el juego y sus controles.",
  "Puedes proponer cambios en la partida, pero solo puedes ejecutar estas acciones:",
  "give_sword, give_bow, give_dash, give_double_jump, heal, infinite_light,",
  "add_platform, teleport_room y none.",
  "Devuelve exclusivamente JSON con este formato: {\"reply\":\"...\",\"action\":\"none|give_sword|give_bow|give_dash|give_double_jump|heal|infinite_light|add_platform|teleport_room\",\"room\":0}.",
  "Usa room únicamente para teleport_room. No inventes acciones ni ejecutes código."
].join(" ");

function sendJson(response, status, data) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*"
  });
  response.end(JSON.stringify(data));
}

async function answerWithOpenAI(message, context) {
  if (!OPENAI_API_KEY) {
    throw new Error("Falta OPENAI_API_KEY");
  }
  const apiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + OPENAI_API_KEY
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: JSON.stringify({ message: message, context: context || {} }) }
      ]
    })
  });
  if (!apiResponse.ok) {
    throw new Error("OpenAI respondió con HTTP " + apiResponse.status);
  }
  const data = await apiResponse.json();
  const content = data.choices && data.choices[0] && data.choices[0].message.content;
  if (!content) throw new Error("OpenAI no devolvió contenido");
  const result = JSON.parse(content);
  const actions = ["none", "give_sword", "give_bow", "give_dash", "give_double_jump", "heal", "infinite_light", "add_platform", "teleport_room"];
  if (!actions.includes(result.action)) result.action = "none";
  return {
    reply: String(result.reply || "No tengo una respuesta para eso."),
    action: result.action,
    room: Number.isInteger(result.room) ? result.room : 0
  };
}

const server = http.createServer(async (request, response) => {
  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS"
    });
    response.end();
    return;
  }
  if (request.method === "POST" && request.url === "/api/assistant") {
    let body = "";
    request.on("data", chunk => {
      body += chunk;
      if (body.length > 20000) request.destroy();
    });
    request.on("end", async () => {
      try {
        const input = JSON.parse(body);
        if (!input.message || typeof input.message !== "string") {
          sendJson(response, 400, { error: "El mensaje es obligatorio." });
          return;
        }
        sendJson(response, 200, await answerWithOpenAI(input.message, input.context));
      } catch (error) {
        sendJson(response, 503, { error: error.message });
      }
    });
    return;
  }
  if (request.method === "GET") {
    const requestedPath = decodeURIComponent((request.url || "/").split("?")[0]);
    const relativePath = requestedPath === "/" ? "index.html" : requestedPath.replace(/^\/+/, "");
    const filePath = path.resolve(ROOT, relativePath);
    if (filePath.startsWith(ROOT) && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const extension = path.extname(filePath).toLowerCase();
      const contentTypes = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json" };
      response.writeHead(200, { "Content-Type": contentTypes[extension] || "application/octet-stream" });
      fs.createReadStream(filePath).pipe(response);
      return;
    }
  }
  response.writeHead(404);
  response.end("Not found");
});

server.listen(PORT, () => {
  console.log("Asistente de Caballero Místico: http://localhost:" + PORT);
});
