const settings = require("./settings");
var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database,
    ssl: settings.ssl
  }
});

const commandLineFirstName = process.argv[2].toString();
const commandLineLastName = process.argv[3].toString();
const commandLineDOB = process.argv[4].toString();

knex.insert([{first_name: commandLineFirstName, last_name: commandLineLastName, birthdate: commandLineDOB}]).into('famous_people')
      .then(function (result) {
          console.log(result);
       })

knex.destroy();

