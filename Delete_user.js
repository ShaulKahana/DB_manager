import { createWriteStream,createReadStream,appendFile } from 'node:fs';



async function delete_user_data(id){

    const createReader = createReadStream("./id.txt");   

    createReader.on("data", (data) => {

        let dataStr =  data.toString();
        dataStr = dataStr.replace(id,"         ")

        const createWriter = createWriteStream("./id.txt",{ start: 0 });
  
        createWriter.write("")

        createWriter.close()

        appendFile("./id.txt",dataStr, function (err) {
            if (err) {
                console.error(err);
            } 
        })
    });    
}

export {
    delete_user_data
};




