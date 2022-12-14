
function check_if_its_a_number(number){
    if(number.match(/([^0-9])/g) == null)  {
       return 1;
    }
    else
     return 0;
}

function check_if_its_only_character(name){    
    if(name.match(/([^A-Z])([^a-z ]+)/g) == null) {
        return 1;
    }
    else
       return 0;
}


//" ID(9 digits), Name, family name, Age, Country name, city name, street name, Number of the hose, Gender(Male/Female), November of children
function check_the_input(answer){

    let return_answer = "";

    let answer_split = answer.split(", ");

    if(answer_split.length>10){
        console.log("the mach information");
        return return_answer;
    }

    if(answer_split.length<10){
        console.log("Insufficient information");
        return return_answer;
    }

    if (check_if_its_a_number(answer_split[0])&& answer_split[0].length == 9) {
        return_answer += "ID: " + answer_split[0] + '\n';
    }
    else{
        console.log("the id number is incorecct");
        return_answer = "";
        return return_answer;
    }
      

    if (check_if_its_only_character(answer_split[1])) {
        return_answer += "Name: " + answer_split[1]+ '\n';
    }
    else{
            console.log("the name is incorecct");
            return_answer = "";
            return return_answer;
    }

    
    if (check_if_its_only_character(answer_split[2])) {
        return_answer += "Famely name: " + answer_split[2]+ '\n';
    }
    else{    
            console.log("the Famely name is incorecct");
            return_answer = "";
            return return_answer;
    }


    if (check_if_its_a_number(answer_split[3])) {
        return_answer += "Age: " + answer_split[3] + '\n';
    }
    else{
            console.log("the Age is incorecct");
            return_answer = "";
            return return_answer;
    }


    if (check_if_its_only_character(answer_split[4])) {
        return_answer += "Contry name: " + answer_split[4]+ '\n';
    }
    else{  
            console.log("the Contry name is incorecct");
            return_answer = "";
            return return_answer;
    }


    if (check_if_its_only_character(answer_split[5])) {
        return_answer += "City name: " + answer_split[5] + '\n';
    }
    else{      
            console.log("the City name is incorecct");
            return_answer = "";
            return return_answer;
    }
    

    if (check_if_its_only_character(answer_split[6])) {
        return_answer += "Street name: " + answer_split[6] + '\n';
    }
    else{   
            console.log("the Street name is incorecct");
            return_answer = "";
            return return_answer;
    }

    
    if (check_if_its_a_number(answer_split[7])) {
        return_answer += "House number: " + answer_split[7] + '\n';
    }
    else{
            console.log("the  House number is incorecct");
            return_answer = "";
            return return_answer;
    }

    
    if (answer_split[8] == "Male" ||  answer_split[8] ==  "Female") {
        return_answer += "Gender: " + answer_split[8] + '\n';
    }
    else{
            console.log("the Gender is incorecct");
            return_answer = "";
            return return_answer;
    }

    if (check_if_its_a_number(answer_split[9])) {
        return_answer += "Number of kids: " + answer_split[9] + '\n';
    }
    else{
            console.log("the Number of kids is incorecct");
            return_answer = "";
            return return_answer;
    }

    
   return return_answer;
   
}



export {
    check_the_input,
  };