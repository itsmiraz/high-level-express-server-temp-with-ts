import { Server } from "http";
import app from "./app";

const port = 5000;

let server: Server;

async function bootsrap() {
   app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}
bootsrap();
