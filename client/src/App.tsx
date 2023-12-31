import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UpdateTodos from "./pages/UpdateTodos copy";
import AddTodos from "./pages/AddTodos";

const App = () => {

  return (
    <Routes>
      <Route path="/" element={ <Home/> }/>
      <Route path="/add" element={ <AddTodos/> }/>
      <Route path="/update/:id" element={ <UpdateTodos/> }/>
    </Routes>
  )

}

export default App;