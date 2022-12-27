import {writeFile, readFile } from 'node:fs';
import {open,appendFile} from 'node:fs/promises';
import { exit } from 'node:process';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import {check_the_input} from './check.js';
import {write_to_file, write_id_to_file} from './Write_file.js';
import {get_user_data,read_the_id_file} from './Read_file.js';


const map1 = new Map();

let count_bayt = 0;

async function db_maneger (){

  console.log("\x1b[31m" );
  const rl = readline.createInterface({ input, output });

  let answer = 1;

  while (answer!="0"){
    
    setTimeout((function printName()
    {
      console.log('Hello, if you want to add a user to the date base press 1\nif you want to get information about an existing user press 2\nto exit press 0\n')
    }),500)
    answer = await rl.question("");

    switch (answer) {
        case '1':
            console.log("you can add hew match new users you want every user in a new line, to finish adding users press 1")        
            console.log("Write the details of the new user on this forum\nID(9 digits), Name, family name, Age, Country name, city name, street name, House number, Gender(Male/Female), number of kids\nWith a ',' and a space after each data");
            answer = await rl.question('');
            while (answer!="1"){
                let ruturnd_enser = check_the_input(answer);

                if (ruturnd_enser) {
                    
                    let answer_split = answer.split(", ");

                    if (map1.get(answer_split[0])) {
                      console.log("The user already exist in the DB");
                    }
                    else{
                      write_id_to_file(answer_split[0],answer.length)
                      write_to_file(answer);
                      map1.set(answer_split[0],{user_length: answer.length ,count_bayt: count_bayt});
                      count_bayt += answer.length + 1
                      console.log("Below is the information we keep\n" + ruturnd_enser);
                    }
                }
                answer = await rl.question('');
            }
          break;
        case '2':
          answer = await rl.question('What is the Id number? ');
          if (answer.match(/([^0-9])/g) == null && answer.length == 9) {

            if (map1.get(answer)) {

              let user_bayts =  parseInt(map1.get(answer).count_bayt)
              let user_length =  parseInt(map1.get(answer).user_length)+user_bayts
              
              await get_user_data(user_bayts,user_length);
            }
            else{
              console.log("The user is not in the DB")
            }
          }
          else{
            console.log("the id number is incorecct");
          }
          break;
        case '0':
          console.log("Have a good day");
          break;
        default:
            console.log( answer + " is not an avalable chice");
          break;
      }
  }

  rl.close();

}


read_the_id_file(count_bayt, map1,async function next(count_bayt,map1) {
    if (map1 == undefined) {
      console.log("The DB is ampty\n");
    }
    else{
      db_maneger ();
    }   
})