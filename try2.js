import { log } from 'node:console';
import { stat, createReadStream } from 'node:fs';
import {open,appendFile} from 'node:fs/promises';



let count_bayt = 0;

async function read_the_id_file(next)
{
    const file =  await open("./id.txt");
    const map1 = new Map();


    for await (const line of file.readLines()) {
        map1.set(line.split(" ")[0],{user_length: line.split(" ")[1] ,count_bayt: count_bayt});
        count_bayt += parseInt(line.split(" ")[1])+1
    }

    await file.close(file);
       
    next(map1);
}



read_the_id_file(async function next(map1) {
    if (map1 == undefined) {
      console.log("The DB is ampty\n");
    }
    else{
        console.log(map1.get("021966511").user_length);
    }   
  })




read_the_id_file()   

console.log("ppppp");