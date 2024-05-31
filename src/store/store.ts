import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {persist} from "zustand/middleware";

export type Item = {
    id: number,
    title: string,
    description: string
}
export type Board = {
    id: number,
    title: string,
    items: Item[]
}

export interface tasksState{
    boards: Board[],
    setBoards: (b: Board[]) => void,
    showCardModal: boolean,
    setShowCardModal: ( bool: boolean ) => void,
    taskData: Item,
    setTaskData: (data: Item) => void,

}

export const useTasks = create<tasksState>()(
    persist(
        immer((set, get) => ({
            boards: [
                {
                    id: 1, 
                    title: 'Новое', 
                    items: [
                        {id: 1, title: 'Здача 1', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.'}, 
                        {id: 2, title: 'Здача 2', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.'}
                    ]},
                {
                    id: 2, 
                    title: 'В работе', 
                    items: [
                        {id: 3, title: 'Здача 3', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.'}
                    ]},
                {
                    id: 3, 
                    title: 'Отказ', 
                    items: [
                        {id: 4, title: 'Здача 4', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.'}, 
                        {id: 6, title: 'Здача 6', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.'}
                    ]},
                {
                    id: 4, 
                    title: 'Завершено', 
                    items: [
                        {id: 5, title: 'Здача 5', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.'}, 
                        {id: 7, title: 'Здача 7', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.'}, 
                        {id: 8, title: 'Здача 8', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.'}
                    ]
                }
            ],
            setBoards: (b: Board[]) => set({boards: b}),
            showCardModal: false,
            setShowCardModal: ( bool ) => set ( {showCardModal: bool}),
            taskData: {
                id: 0,
                title: '',
                description: ''
            },
            setTaskData: (data) => set({taskData: data})

        })), 
        {
            name: 'tasksStore', 
            version: 1
        }
    ) 
);