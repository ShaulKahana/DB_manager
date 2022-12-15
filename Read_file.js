import { log } from 'node:console';
import { stat, createReadStream } from 'node:fs';
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

    const createReader = createReadStream("./db.txt",{ start: user_bayts, end: user_length });
  
    createReader.on("data", (data) => {
        let dataStr =  data.toString().split('\n').join("");
        let ruturnd_enser = check_the_input(dataStr);
        console.log(ruturnd_enser);
    
    });
}


export {
    get_user_data,find_user_line
  };



