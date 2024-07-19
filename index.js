import { config } from "dotenv";
config()

import Server from "./configs/app.js";
import { insertDefaultAdmin } from "./src/auth/auth.controller.js";


const server = new Server()

server.listen()
insertDefaultAdmin()