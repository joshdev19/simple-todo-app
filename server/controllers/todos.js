const { connect } = require('../database/database');

const getAllTodos = ( request, response ) => {
    
    const stmt = "select * from todos";

    connect().query( stmt, [], ( err, result) => {

        if ( err ) return response.status(400).send(
            {
                message: "An error occured, Please try again"
            }
        )

        response.status(200).send(
            {
                result
            }
        )

    })

    connect().end( err => {

        if ( err ) return console.log(err);

    })

}

const addTodos = ( request, response ) => {

    const { title, description } = request.body;

    if ( !title && !description ) return response.status(400).send(
        {
            message: "Fields are required"
        }
    )

    if ( !title ) return response.status(400).send(
        {
            message: "Title is required"
        }
    )

    const updateTodos = "insert into todos ( title, description ) values ( ?, ? )";

    connect().query( updateTodos, [ title, description ], ( err, result ) => {

        if ( err ) return response.status(400).send(
            {
                message: "An error occured, Please try again"
            }
        )

        response.status(200).send(
            {
                message: "Added Successfully"
            }
        )

    })

    connect().end( err => {

        if ( err ) console.log(err)

    })

}


const getTodosByID = ( request, response ) => {

    const { id } = request.params;

    if ( !id ) return response.status(400).send(
        {
            message: "ID is required"
        }
    )

    const stmt = "select * from todos where id = ?";

    connect().query( stmt, [ id ], ( err, result ) => {

        if ( err ) return response.status(400).send(
            {
                message: "An error occured, Please try again"
            }
        )

        if ( !result.length ) return response.status(400).send(
            {
                message: "Todo is no longer exist"
            }
        )

        response.status(200).send(
            {
                result
            }
        )

    })

    connect().end( err => {

        if ( err ) console.log(err)

    })

}

const updateTodos = ( request, response ) => {

    const { id } = request.params;

    if ( !id ) return response.status(400).send(
        {
            message: "ID is required"
        }
    )

    const stmt = "select * from todos where id = ?";

    connect().query( stmt, [ id ], ( err, result ) => {

        if ( err ) return response.status(400).send(
            {
                message: "An error occured, Please try again"
            }
        )

        if ( !result.length ) return response.status(400).send(
            {
                message: "Todo is no longer exist"
            }
        )

        const { title, description } = request.body;

        const updateTodos = "update todos set title = ?, description = ? where id = ?";

        connect().query( updateTodos, [ title, description, id ], ( err, result ) => {

            if ( err ) return response.status(400).send(
                {
                    message: "An error occured, Please try again"
                }
            )

            response.status(200).send(
                {
                    message: "Updated Successfully"
                }
            )

        })

    })

    connect().end( err => {

        if ( err ) console.log(err)

    })


}

const deleteTodos = ( request, response ) => {

    const { id } = request.params;

    if ( !id ) return response.status(400).send(
        {
            message: "ID is required"
        }
    )

    const stmt = "delete from todos where id = ?";

    connect().query( stmt, [ id ], ( err, result ) => {

        if ( err ) return response.status(400).send(
            {
                message: "An error occured, Please try again"
            }
        )

        response.status(200).send(
            {
                message: "Deleted Successfully"
            }
        )

    })

    connect().end( err => {

        if ( err ) console.log(err)

    })

}

module.exports = {
    getAllTodos,
    addTodos,
    getTodosByID,
    updateTodos,
    deleteTodos
}