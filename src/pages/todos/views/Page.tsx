import React from "react";
import EditForm from "./EditForm";
import List from "./List";
import Filters from "./Filters";

export default function Page() {
  return (
    <>
      <h1>Todos</h1>
      <EditForm />
      <Filters />
      <List />
    </>
  );
}
