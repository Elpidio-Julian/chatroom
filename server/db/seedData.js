const client = require("./client")

async function dropTables() {
    try {
        console.log('dropping all tables');
        // drop all tables, in the correct order
        await client.query(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS messages;
        `)
    } catch (error) {
        console.error("error dropping tables");
        throw error;
    };
}

async function createTables() {
    try {
        console.log('starting to build tables');
        // create all tables, in the correct order

        await client.query(`
            CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username varchar(255) UNIQUE NOT NULL,
            password varchar(255) NOT NULL
  );  
  `);

        await client.query(`
            CREATE TABLE messages (
                id SERIAL PRIMARY KEY,
                "authorId" INTEGER REFERENCES users( id ),
                message TEXT NOT NULL,
                date_sent DATE NOT NULL DEFAULT CURRENT_DATE
            );
        `);



    } catch (error) {
        console.error("error building tables");
        throw error;
    }
}


// write seed data functions below

async function rebuildDB() {
    try {
        await client.connect();
        await dropTables();
        await createTables();
    } catch (error) {
        console.log("error during rebuildDB");
        throw error;
    }
}


module.exports = {
    rebuildDB,
    dropTables,
    createTables,
}