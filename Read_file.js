import { log } from 'node:console';
import { stat } from 'node:fs';
import {open,appendFile} from 'node:fs/promises';
import {check_the_input} from './check.js';

async function find_user_line(id,next)
{
    const file =  await open("./id.txt");

    let curent_line_number = 1;

    let result = -1;
    for await (const line of file.readLines()) {
        if (line == id) { 
            result = curent_line_number ;
           
            break;
        }
        curent_line_number ++;
    }
    await file.close(file)   
     next(result);
}

async function get_user_data(userLineId){

    const file = await open("./db.txt");

    let curent_line_number = 1;
    
    for await (const line of file.readLines()) {
        
        if (curent_line_number == userLineId) { 
            let ruturnd_enser = check_the_input(line);
            console.log(ruturnd_enser);
            break;
        }
        curent_line_number ++;
    }

    await file.close(file);
}


export {
    get_user_data,find_user_line
  };


 
 