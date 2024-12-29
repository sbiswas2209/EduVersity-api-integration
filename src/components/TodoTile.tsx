import Todo from "../types/todo";

interface TodoTileProps {
  todo: Todo;
  onCompleted: (id: number) => void;
  onDeleted: (id: number) => void;
}

const TodoTile: React.FC<TodoTileProps> = ({
  todo,
  onCompleted,
  onDeleted,
}) => {
  return (
    <div>
      {todo.done ? <s>{todo.text}</s> : <p>{todo.text}</p>}
      <button
        onClick={(e) => {
          e.preventDefault();
          onCompleted(todo.id);
        }}
      >
        Mark as complete
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          onDeleted(todo.id);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoTile;
