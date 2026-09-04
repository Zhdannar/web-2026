const fs = require("fs");
const http = require("http");
const { promises } = require("fs");
async function readAndWrite() {
  let data;
  try {
    data = await promises.readFile("./input.txt", "utf8");
    console.log(data);
    await promises.writeFile("./input.txt", "Новый текст!");
  } catch(e) {
    console.error(`Что-то пошло не так: ${e.message}`);
    throw e;
  }
  return data;
}
const server = http.createServer(async (req, res) => {
    console.log("Начало обработки запроса");
    try {
        const data = await readAndWrite();
    }
    res.writeHead(200, { 
        "Content-Type": "text/plain; charset=UTF-8" 
    });
    res.end(data);
});
server.listen(3001, "127.0.0.1", () => {
    const { address, port } = server.address();
    console.log(`Сервер запущен ${address}:${port}`);
});
