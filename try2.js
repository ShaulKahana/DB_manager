import { createWriteStream,createReadStream, stat } from 'node:fs';
import {open,appendFile} from 'node:fs/promises';
import { resolve } from 'node:path';
import { stdout } from 'node:process';
import {get_user_data} from './Read_file.js';

// const writstrim = createWriteStream('l2.txt');

// function writdate(date){
//     writstrim.write(JSON.stringify(date )+"\n");
// }

// const sleep = (t)=> new Promise((resolve)=>setTimeout(resolve,t))

// async function run (){
//     for (let index = 0; index < 100; index++) {
//         const user = {
//             name: "shaul",
//             id: index++
//         }
//        stdout.write(JSON.stringify(user )+"\n")
//         //writdate(user)
//         await sleep(1000);
//     }
    
// }

// run ()




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

find_user_line("021956588", async function next(user_bayts,user_length) {
    if (user_length==-1) {
        console.log("The user is not in the DB")
    }
    else{
        await get_user_data(user_bayts,user_length);
    }
})   