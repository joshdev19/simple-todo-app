const mysql = require('mysql2');

const connect = () => {

    try {
        
        return  mysql.createConnection(
            {
                host: process.env.MYS_HOST,
                database: process.env.MYS_DB,
                user: process.env.MYS_USER,
                password: process.env.MYS_PASS,

            }
        )

    } catch (error) {
        
        return error

    }

}

connect().end( err => {

    if( err) console.log( err );
    
})

module.exports = {
    connect
}