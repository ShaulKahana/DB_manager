import { stat } from 'node:fs';
import {open,appendFile} from 'node:fs/promises';



async function write_to_file(user){
    appendFile("./db.txt",user + "\n", function (err) {
        if (err) {
            console.error(err);
        } 
    })
}

async function write_id_to_file(id){
    appendFile("./id.txt",id + "\n", function (err) {
        if (err) {
            console.error(err);
        } 
    })
}



export {
    write_to_file, write_id_to_file
  };

 
