"use client";
import BarraSuperior from "./componentes/BarraSuperior/BarraSuperior";
import TextoBusqueda from "./componentes/TextoBusqueda/TextoBusqueda";
import { useState } from "react";
import { todo } from "./componentes/Modelos/modelo";
import ListaTodo from "./componentes/ListaTodo/ListaTodo";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

export default function Home() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<todo[]>([]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = completedTodos;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  const agregar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, estaHecha: false }]);
      setTodo("");
    }
  };
  return (
    <>
      <BarraSuperior />
      <TextoBusqueda todo={todo} setTodo={setTodo} agregar={agregar} />
      <>
        <DragDropContext onDragEnd={onDragEnd}>
          <ListaTodo
            todos={todos}
            setTodos={setTodos}
            completedTodos={completedTodos}
            setCompletedTodos={setCompletedTodos}
          />
        </DragDropContext>
      </>
    </>
  );
}
