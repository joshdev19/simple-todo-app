import React, { useState } from "react";
import { TodoType } from "../types/types";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddTodos = () => {

    const navigate = useNavigate()

    const [ values, setValues ] = useState<TodoType>(
        {
            title: '',
            description: ''
        }
    )

    const controlledInputs = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const name: string = e.target.name;
        const value: string = e.target.value;

        setValues( ( prev: TodoType ) => ( { ...prev, [ name ]: value } ) );
        
    }

    const addTodosHandler = async () => {

        try {
            
            const request = await axios.post(`/todos`, values);

            const response = await request.data;

            if( response.message === "Added Successfully" ) {

                toast.success(response.message);
                navigate('/');

            }

        } catch ( error: any ) {
            
            const code = error.code

            if ( code === "ERR_BAD_NETWORK") {

                return toast.error("No internet connection");
                
            }
            else {

                return toast.error(error.response.data?.message);

            }

        }

    }

    return (
        <div className="wrapper">
            <form>
                <p className="title"> Add New Todo </p>
                <label htmlFor="title">
                    <p> Title </p>
                    <input type="text" name="title" id="title" onChange={ controlledInputs } placeholder="Title here..." value={ values?.title } />
                </label>
                <label htmlFor="description">
                    <p> Description </p>
                    <textarea name="description" id="description" onChange={ controlledInputs } placeholder="Description here..." value={ values?.description }></textarea>
                </label>
                <button type="button" onClick={ addTodosHandler }> ADD TODO </button>
            </form>
        </div>
    )

}

export default AddTodos;