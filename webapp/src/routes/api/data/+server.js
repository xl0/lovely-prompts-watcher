import { text, json } from '@sveltejs/kit';
import { EventEmitter } from 'events';



// class ChatEvent extends EventEmitter {
// 	notify() {
// 		this.emit('chat');
// 	}
// }

// let data = "Hello from server!";

// let emitters = [];


// export async function POST({request}) {
//   const newData = await request.json();
//   console.log(newData);
//   data = newData;

//   return json("Ok", {status: 200})
// }

// export async function GET() {
// 	// const readable = new ReadableStream({
// 	// 	start(ctr) {
// 	// 	// // 	this.interval = setInterval(() => ctr.enqueue('data: ping\n\n'), 3000);
//     //   ctr.enqueue(`data: ${data}\n\n`);
// 	// 	},
// 	// 	// cancel() {
// 	// 	// 	clearInterval(this.interval);
// 	// 	// }
// 	// });

// 	// return new Response(readable, {
// 	// 	headers: {
// 	// 		'content-type': 'text/event-stream',
// 	// 	}
// 	// });
// 	return json(data, {status: 200})
// }