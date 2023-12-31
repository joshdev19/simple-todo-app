const { Router } = require('express');
const { getAllTodos, addTodos, getTodosByID, updateTodos, deleteTodos } = require('../controllers/todos');

const router = Router();

router.get('/todos', getAllTodos);
router.post('/todos', addTodos);
router.get('/todos/:id', getTodosByID);
router.put('/todos/:id', updateTodos);
router.delete('/todos/:id', deleteTodos);

module.exports = router;