
const USER_BUF_LEN = 100;
const FILL_CHAR = "~"


const buf = Buffer.alloc(USER_BUF_LEN, FILL_CHAR);
const firstNamePlace = [0, 9];
const lastNamePlace = [10, 19];

const firstName = "Yaki";
const lastName = "Klein";

for(let i = 0; i < firstName.length; i++) {
    buf[firstNamePlace[0] + i] = firstName.charCodeAt(i)
}

for(let i = 0; i < lastName.length; i++) {
    buf[lastNamePlace[0] + i] = lastName.charCodeAt(i)
}

file.write(buf);


file.read(buf, 4 * USER_BUF_LEN)

