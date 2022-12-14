import { log } from 'node:console';
import { stat } from 'node:fs';
import {open,appendFile} from 'node:fs/promises';
import {check_the_input} from './check.js';

async function find_user_line(id,next)
{
    const file =  await open("./id.txt");

    let user_bayts= 0;

    let user_length = -1;

    for await (const line of file.readLines()) {
        let line_split = line.split(" ");

        if (line_split[0] == id) { 
            user_length = parseInt(line_split[1])+user_bayts;
            break;
        }
        user_bayts += parseInt(line_split[1])+1;
    }

    await file.close(file);
       
    next(user_bayts,user_length);
}

async function get_user_data(user_bayts,user_length){

    const file = await open("./db.txt");

    let me = {
        encoding: null,
        autoClose: true,
        emitClose: true,
        start: user_bayts,
        end : user_length,
        highWaterMark: 64 * 1024
    }

    for await (const line of file.readLines(me)) {
            let ruturnd_enser = check_the_input(line);
            console.log(ruturnd_enser);
    }

    await file.close(file);
}


export {
    get_user_data,find_user_line
  };


 
