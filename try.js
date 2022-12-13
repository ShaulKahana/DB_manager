import { stat } from 'node:fs';
import {open,appendFile} from 'node:fs/promises';

async function get_user_data(userLineId){

    const file = await open("./db.txt");

    let curent_line_number = 1;
    let me = {
        encoding: null,
        autoClose: true,
        emitClose: true,
        start: userLineId,
        end : Infinity,
        highWaterMark: 64 * 1024
    }

    for await (const line of file.readLines(me)) {
      
            console.log(line);
    }

    await file.close(file);
}

get_user_data(0)