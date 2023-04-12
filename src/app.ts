import server from "./server";
import { initDB } from "./database";

initDB();

const port = parseInt(process.env.PORT || "1717");

server.app.get("/", (req, res) => {
  return res.json({ hello: "world" });
});

server.start(port);
