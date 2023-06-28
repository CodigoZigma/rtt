import React, { useEffect, useRef, useState } from "react";
import { todo } from "../Modelos/modelo";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

type TareaProps = {
  index: number;
  tarea: todo;
  tareas: todo[];
  setTareas: React.Dispatch<React.SetStateAction<todo[]>>;
};

const Tarea: React.FC<TareaProps> = ({ index, tarea, tareas, setTareas }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(tarea.todo);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, todo: editTodo } : tarea
      )
    );
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  const handleDone = (id: number) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, estaHecha: !tarea.estaHecha } : tarea
      )
    );
  };

  return (
    <Draggable draggableId={tarea.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          onSubmit={(e) => handleEdit(e, tarea.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`tarea ${snapshot.isDragging ? "drag" : ""}`}
        >
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="tareaTitulo"
              ref={inputRef}
            />
          ) : tarea.estaHecha ? (
            <s className="tareaTitulo">{tarea.todo}</s>
          ) : (
            <span className="tareaTitulo">{tarea.todo}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !tarea.estaHecha) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(tarea.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(tarea.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};
export default Tarea;
