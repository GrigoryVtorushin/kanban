import KanbanBoard from './components/KanbanBoard';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import {useEffect} from "react";
import {useTasks} from "./store/store.ts";

function App() {
    const {getLeads} = useTasks();

    useEffect(() => {
        getLeads();
    }, []);

  return (
    <>
      <KanbanBoard />
    </>
  )
}

export default App
