import { stat, createReadStream } from 'node:fs';
import {open,appendFile} from 'node:fs/promises';


async function get_user_data(userLineId){

    const file = await open("./db.txt");

    let curent_line_number = 1;
    let me = {
        encoding: null,
        autoClose: true,
        emitClose: true,
        start: userLineId,
        end : 59,
        highWaterMark: 64 * 1024
    }
    
    for await (const line of file.readLines(me)) {
       
      
            console.log(line);
    }

    await file.close(file);
}

get_user_data(0)

// const readStream = createReadStream('./db.txt', {highWaterMark: 14});
// const data = [];

// console.log(readStream);

// readStream.on('data', (chunk) => {
//     data.push(chunk);
//     console.log('data :', chunk, chunk.length);
//     // data : <Buffer 49 20 61 6d 20 74 72 61 6e 73 66 65 72 72 69 6e> 16
//     // data : <Buffer 67 20 69 6e 20 62 79 74 65 73 20 62 79 20 62 79> 16
//     // data : <Buffer 74 65 73 20 63 61 6c 6c 65 64 20 63 68 75 6e 6b> 16
// });

// readStream.on('end', () => {
//     console.log(Buffer.concat(data).toString());
//     // end : I am transferring in bytes by bytes called chunk
// })

// readStream.on('error', (err) => {
//     console.log('error :', err)
// })