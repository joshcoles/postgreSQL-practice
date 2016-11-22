const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const mySearchTerm = process.argv[2];

function makeMyDateNiceAgain(date) {
  let dateObj = new Date(date);
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  let fixedDate = year + "-" + month + "-" + day;
  return fixedDate;
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query('SELECT first_name, last_name, birthdate FROM famous_people WHERE (first_name = $1::varchar OR last_name = $1::varchar)', [mySearchTerm], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    let niceDate = makeMyDateNiceAgain(result.rows[0].birthdate);

    console.log(`Searching...`);
    console.log(`Found 1 persons(s) by the name ${mySearchTerm}:`);
    console.log(`- 1: ${result.rows[0].first_name} ${result.rows[0].last_name}, born '${niceDate}'.`);
    client.end();
  });
});