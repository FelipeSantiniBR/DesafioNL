import React from "react";
import { Route, Routes } from "react-router-dom";

import FormTasks from "./pages/formTasks";
import Tasks from "./pages";

const Router: React.FC = () => {
  return(
      <Routes>
          <Route path="/" element={<FormTasks />}/>
          <Route path="/tasks" element={<FormTasks />}/>
          <Route path="/create_tasks" element={<Tasks />}/>
          <Route path="/create_tasks/:id" element={<Tasks />}/>
        </Routes>
  )
}

export default Router