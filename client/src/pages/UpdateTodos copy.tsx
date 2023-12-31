import React, { useEffect, useRef, useState } from "react";
import { TodoType } from "../types/types";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateTodos = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const textRef = useRef<HTMLTextAreaElement>(null);

    const [ values, setValues ] = useState<TodoType>(
        {
            title: '',
            description: ''
        }
    )

    const controlledInputs = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const name: string = e.target.name;
        const value: string = e.target.value;
        
        setValues( ( prev: TodoType ) => ( { ...prev, [ name ]: value } ) )
        
    }

    const updateHandler = async () => {

        try {
            
            const request = await axios.put(`/todos/${id}`, values);

            const response = await request.data;

            if( response.message === "Updated Successfully" ) {

                toast.success(response.message);
                navigate('/');

            }

        } catch (error : any ) {
            
            const code = error.code

            if ( code === "ERR_BAD_NETWORK") {

                return toast.error("No internet connection");
                
            }
            else {

                return toast.error(error.response.data?.message);

            }

        }

    }

    const deleteHandler = async () => {

        try {
            
            const request = await axios.delete(`/todos/${id}`);

            const response = await request.data;

            if( response.message === "Deleted Successfully" ) {

                toast.success(response.message);
                navigate('/');

            }

        } catch (error : any ) {
            
            const code = error.code

            if ( code === "ERR_BAD_NETWORK") {

                return toast.error("No internet connection");
                
            }
            else {

                return toast.error(error.response.data?.message);

            }

        }

    }

    useEffect(() => {

        axios.get(`/todos/${id}`)
        .then( res => {
            setValues( res.data?.result[0] )
        })
        .catch( error => {
            
            const code = error.code

            if ( code === "ERR_BAD_NETWORK") {

                return toast.error("No internet connection");
                
            } else if ( error.response.data?.message === "Todo is no longer exist" ) {

                toast.error(error.response.data?.message);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
                return;

            }
            else {

                return toast.error(error.response.data?.message);

            }
        })

    }, [ id ])

    return (
        <div className="wrapper">
            <form>
                <p className="title"> Update This Todo </p>
                <label htmlFor="title">
                    <p> Title </p>
                    <input type="text" name="title" id="title" onChange={ controlledInputs } placeholder="Title here..." value={ values?.title } />
                </label>
                <label htmlFor="description">
                    <p> Description </p>
                    <textarea ref={ textRef } name="description" id="description" onChange={ controlledInputs } placeholder="Description here..." value={ values?.description }></textarea>
                </label>
                <button type="button" onClick={ updateHandler }> Update Todo </button>
                <button type="button" onClick={ deleteHandler }> Delete Todo </button>
            </form>
        </div>
    )

}

export default UpdateTodos;