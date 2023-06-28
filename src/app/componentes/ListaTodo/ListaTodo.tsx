import React from "react";
import { todo } from "@/app/componentes/Modelos/modelo";
import Tarea from "../Tarea/Tarea";
import { Droppable } from "react-beautiful-dnd";

type ListaTodoProps = {
  todos: todo[];
  setTodos: React.Dispatch<React.SetStateAction<todo[]>>;
  completedTodos: todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<todo[]>>;
};

const ListaTodo: React.FC<ListaTodoProps> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="container2">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Tareas activas</span>
            {todos?.map((todo, index) => (
              <Tarea
                index={index}
                key={todo.id}
                tarea={todo}
                tareas={todos}
                setTareas={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            className={`todos  ${
              snapshot.isDraggingOver ? "dragcomplete" : "remove"
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Tareas completadas</span>
            {completedTodos?.map((todo, index) => (
              <Tarea
                index={index}
                key={todo.id}
                tarea={todo}
                tareas={completedTodos}
                setTareas={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
export default ListaTodo;
