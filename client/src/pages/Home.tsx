import { useEffect, useState } from "react";
import Todos from "../components/Todos";
import { TodoType } from "../types/types";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {

    const [ data, setData ] = useState<TodoType[]>();

    useEffect(() => {

        axios.get('/todos')
        .then( res => {
            setData( res.data?.result );
        })
        .catch(err => {

            const code = err.code

            if ( code === "ERR_BAD_NETWORK") {

                return toast.error("No internet connection");
                
            }
            else {

                return toast.error(err.response.data?.message);

            }

        })

    }, [ setData ]);

    return (
        <div className="wrapper">

            <p className="title"> Todos List </p>

            <div className="todos-wrapper">
                {
                    data ? data?.map( todo => <Todos key={ todo?.id } { ...todo } /> ) : <p className="no-data"> No List Of Todos </p>
                }
            </div>

        </div>
    )

}

export default Home;