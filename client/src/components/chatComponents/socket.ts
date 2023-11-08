import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:9001';

// @ts-ignore
export const socket = io(process.env.REACT_APP_CHAT_URL);