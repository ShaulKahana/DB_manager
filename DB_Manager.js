import {writeFile, readFile } from 'node:fs';
import { exit } from 'node:process';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import {check_the_input} from './check.js';
import {write_to_file, write_id_to_file} from './Write_file.js';
import {get_user_data,find_user_line} from './Read_file.js';



//let users_araay = [];


console.log("\x1b[31m" );
const rl = readline.createInterface({ input, output });

let answer = 1;

while (answer!="0"){
  answer = await rl.question('Hello, if you want to add a user to the date base press 1\nif you want to get information about an existing user press 2\nto exit press 0\n');

  switch (answer) {
      case '1':
          console.log("you can add hew match new users you want every user in a new line, to finish adding users press 1")        
          console.log("Write the details of the new user on this forum\nID(9 digits), Name, family name, Age, Country name, city name, street name, House number, Gender(Male/Female), number of kids\nWith a ',' and a space after each data");
          answer = await rl.question('');
          while (answer!="1"){
              let ruturnd_enser = check_the_input(answer);
              if (ruturnd_enser) {
                  console.log(ruturnd_enser);
                  let answer_split = answer.split(", ");

                  find_user_line(answer_split[0], async function next(result) {
                    if (result==-1) {
                      write_id_to_file(answer_split[0])
                      //users_araay.push(answer_split[0]);
                      write_to_file(answer);
                    }
                    else{
                      console.log("The user already exist in the DB");
                    }   
                  })
              }
              answer = await rl.question('');
          }
        break;
      case '2':
        answer = await rl.question('What is the Id number? ');
        if (answer.match(/([^0-9])/g) == null && answer.length == 9) {

          find_user_line(answer, async function next(result) {
              if (result==-1) {
                  console.log("The user is not in the DB")
              }
              else{
                  await get_user_data(result);
              }
          })   
         
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