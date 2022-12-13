import { createWriteStream,createReadStream, stat } from 'node:fs';
import {open,appendFile} from 'node:fs/promises';
import { resolve } from 'node:path';
import { stdout } from 'node:process';

const writstrim = createWriteStream('l2.txt');

function writdate(date){
    writstrim.write(JSON.stringify(date )+"\n");
}

const sleep = (t)=> new Promise((resolve)=>setTimeout(resolve,t))

async function run (){
    for (let index = 0; index < 100; index++) {
        const user = {
            name: "shaul",
            id: index++
        }
       stdout.write(JSON.stringify(user )+"\n")
        //writdate(user)
        await sleep(1000);
    }
    
}

run ()