import KanbanBoard from './components/KanbanBoard';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useTasks} from "./store/store.ts";
import {useEffect} from "react";

function App() {
    const {getLeads} = useTasks();
    useEffect(() => {
        getLeads()
    }, []);
  return (
    <>
      <KanbanBoard />
    </>
  )
}

export default App
