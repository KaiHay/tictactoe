import { io } from "socket.io-client";
import { SERVER_URL } from "../utils/constants";

export const createSocket = () => io(SERVER_URL, {
    autoConnect: false
})