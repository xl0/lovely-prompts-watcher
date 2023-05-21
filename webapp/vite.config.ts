import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';


export default defineConfig({
	plugins: [sveltekit(),
	// {
	// 		name: 'webSocketServer',
	// 		configureServer(server) {
	// 		  const io = new Server(server.httpServer)

	// 		  io.on('connection', (socket) => {
	// 			socket.emit('eventFromServer', 'Hello, World 👋')
	// 		  })
	// 		},
	// 	}
	]
});
