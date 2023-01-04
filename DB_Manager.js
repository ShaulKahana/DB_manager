import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import {check_the_input} from './check.js';
import {write_to_file, write_id_to_file} from './Write_file.js';
import {get_user_data,read_the_id_file} from './Read_file.js';
import {delete_user_data} from './Delete_user.js';


const map1 = new Map();

let count_bayt = 0;

async function db_maneger (count_bayt){

  console.log("\x1b[31m" );
  const rl = readline.createInterface({ input, output });

  let answer = 1;

  while (answer!="0"){
    
    setTimeout((function printName()
    {
      console.log('Hello, if you want to add a user to the date base press 1\nif you want to get information about an existing user press 2\nto delete an existing user press 3\nto exit press 0\n')
    }),500)
    answer = await rl.question("");

    switch (answer) {
        case '1':
            let user_data = "";
            console.log("you can add how many new users you want")        
            console.log("To add a second user press `Enter` after you see the date from the previous user")        
            console.log("To finish adding users press 1\n\n")        

            while ( user_data!="1"){
                answer = await rl.question('Enter your ID: ');
                user_data += answer+", "
                answer = await rl.question('Enter your Name: ');
                user_data += answer+", "
                answer = await rl.question('Enter your Family name: ');
                user_data += answer+", "
                answer = await rl.question('Enter your Age: ');
                user_data += answer+", "
                answer = await rl.question('Enter your Country name: ');
                user_data += answer+", "
                answer = await rl.question('Enter your city name: ');
                user_data += answer+", "
                answer = await rl.question('Enter your street name: ');
                user_data += answer+", "
                answer = await rl.question('Enter your House number: ');
                user_data += answer+", "
                answer = await rl.question('Enter your Gender(Male/Female): ');
                user_data += answer+", "
                answer = await rl.question('Enter your number of kids: ');
                user_data += answer

                let ruturnd_enser = check_the_input(user_data);

                if (ruturnd_enser) {
                    
                    let answer_split =  user_data.split(", ");

                    if (map1.get(answer_split[0])) {
                      console.log("The user already exist in the DB");
                    }
                    else{
                      write_id_to_file(answer_split[0], user_data.length)
                      write_to_file( user_data);
                      map1.set(answer_split[0],{user_length:user_data.length ,count_bayt: count_bayt});
                      count_bayt +=  user_data.length + 1
                      console.log("Below is the information we keep\n" + ruturnd_enser);
                    }
                }
                user_data = await rl.question('');
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

          case '3':
          answer = await rl.question('What is the Id number? ');
          if (answer.match(/([^0-9])/g) == null && answer.length == 9) {

            if (map1.get(answer)) {
              await delete_user_data(answer);
              map1.delete(answer);
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
      db_maneger (count_bayt);
    }   
})