"use client";
import React, { useRef } from "react";

type TextoBusquedaProps = {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  agregar: (e: React.FormEvent<HTMLFormElement>) => void;
};

const TextoBusqueda: React.FC<TextoBusquedaProps> = ({
  todo,
  setTodo,
  agregar,
}) => {
  const refTextoIngreso = useRef<HTMLInputElement>(null);
  return (
    <form
      className="formIngreso"
      onSubmit={(e) => {
        agregar(e);
        refTextoIngreso.current?.blur();
      }}
    >
      <input
        ref={refTextoIngreso}
        type="input"
        placeholder="Ingrese una tarea..."
        className="textoIngreso"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      ></input>
      <button type="submit" className="botonIngreso">
        Agregar
      </button>
    </form>
  );
};
export default TextoBusqueda;
