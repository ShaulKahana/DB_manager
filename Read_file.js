import {createReadStream } from 'node:fs';
import {open} from 'node:fs/promises';
import {check_the_input} from './check.js';

async function read_the_id_file(count_bayt,map1,next)
{
    const file =  await open("./id.txt");


    for await (const line of file.readLines()) {
      map1.set(line.split(" ")[0],{user_length: line.split(" ")[1] ,count_bayt: count_bayt});
      count_bayt += parseInt(line.split(" ")[1])+1
    }

    await file.close(file);
       
    next(count_bayt,map1);
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
    get_user_data,read_the_id_file
};



