import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { questions } from "./questions_list.js";
import { check } from "./check_input.js";
import {write_to_file, write_id_to_file} from './Write_file.js';
import {get_user_data,read_the_id_file} from './Read_file.js';
import {delete_user_data} from './Delete_user.js';


const map1 = new Map();

let count_bayt = 0;


async function addUser(count_bayt){
    try {
        const rl = readline.createInterface({ input, output, terminal: false });
        const answers = [];
        let id;
        
        for (const query of questions) {
            let answer = await rl
                .question(`${query.question}`)
                .then((data) => check(query.type, data, query.length));
            while (!answer) {
                answer = await rl
                    .question(`${query.question}`)
                   .then((data) => check(query.type, data, query.length));
            }
            if (query.name === "id: ") {
                id = answer
                if (map1.get(id)) {
                    console.log("The user already exist in the DB");
                    db_maneger(count_bayt)
                    return
                }
            }
            answers.push(query.name + answer + "  ");
        }

        let answersString = answers.toString()        
        write_id_to_file(id, answersString.length)
        map1.set(id,{user_length:answersString.length ,count_bayt: count_bayt});
        count_bayt +=  answersString.length + 1
        write_to_file(answers);
        console.log(`User with id: ${id} was added successfully!!!`);
        rl.close();
        db_maneger(count_bayt)
    }

    catch (err) {
        console.error(err);
    }
}


async function searchUser (count_bayt){
    try {
        const rl = readline.createInterface({ input, output, terminal: false });
        const answer = await rl.question("Whats the id of the user your looking for ? ");

        if (check('id', answer, answer.length)) {

            if (map1.get(answer)) {

              let user_bayts =  parseInt(map1.get(answer).count_bayt)
              let user_length =  parseInt(map1.get(answer).user_length)+user_bayts
              
              await get_user_data(user_bayts,user_length);
            }
            else{
              console.log("The user is not in the DB")
            }
        }
        console.log(`User with id: ${id} was deleted successfully!!!`);
        rl.close();
        db_maneger(count_bayt)
    }
    catch (err) {
        console.error(err);
    }
}


async function deleteUser (count_bayt){
    try {
        const rl = readline.createInterface({ input, output, terminal: false });
        const answer = await rl.question("What's the id of the user you want to delete? ");

        if (check('id', answer, answer.length)) {

            if (map1.get(answer)) {

                await delete_user_data(answer);
                map1.delete(answer);
            }
            else{
              console.log("The user is not in the DB")
            }
        }
        rl.close();
        db_maneger(count_bayt)
    }
    catch (err) {
        console.error(err);
    }
}




async function db_maneger(count_bayt) {
    const rl = readline.createInterface({ input, output, terminal: false });
    let action ;


        setTimeout((function printName()
        {console.log("Hello and welcome, what would you like to do (add || search || exit || delete)? ")}),500)

        action = await rl.question("");

    switch (action) {
        case "add":
            await addUser(count_bayt);
            break;

        case "search":
            await searchUser(count_bayt)
            break;

        case "delete":
            await deleteUser(count_bayt)
            break;

        case "exit":
            console.log("Have a good day");
            rl.close();
            process.exit()

        default:
            console.error("Must choose or 'add' or 'search' or 'exit'!\n");
            db_maneger(count_bayt)
            break;
        
    }
    
}


read_the_id_file(count_bayt, map1,async function next(count_bayt,map1) {
    if (map1 == undefined) {
      console.log("The DB is ampty you the first one yaaa\n");
    }   
    db_maneger(count_bayt);
})