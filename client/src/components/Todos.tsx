import { Link } from "react-router-dom";
import { TodoType } from "../types/types";

const Todos = ( { id, title, description }: TodoType ) => {

    return (
        <Link to={`/update/${id}`}>
            <p> { title } </p>
            <p> { description } </p>
        </Link>
    )

}

export default Todos;