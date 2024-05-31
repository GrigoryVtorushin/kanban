import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {persist} from "zustand/middleware";
import axios from "axios";

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
    getLeads: () => void,
    deleteLead: (id: string) => void,
    deleteAllLeads: (status: string) => void,
    updateLead: (id: string, status: string) => void,
    createLead:(name: string, description: string) => void,
}

export const useTasks = create<tasksState>()(persist(immer((set) => ({
    boards: [],
    setBoards: (b: Board[]) => set({boards: b}),
    showCardModal: false,
    setShowCardModal: ( bool ) => set ( {showCardModal: bool}),
    taskData: {
        id: 0,
        title: '',
        description: ''
    },
    setTaskData: (data) => set({taskData: data}),

    getLeads: async () => {
        await axios.post('https://d5dnebshjibq2cticp6u.apigw.yandexcloud.net/get-leads', {})
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    },
    deleteLead: async (id: string) => {
        await axios.post('https://d5dnebshjibq2cticp6u.apigw.yandexcloud.net/delet-all', {
            "id": id
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    },
    deleteAllLeads: async (status: string) => {
        await axios.post('https://d5dnebshjibq2cticp6u.apigw.yandexcloud.net/delet-all', {
            'status': status
        }).then(response => {
            console.log(response)
        }).catch(error => console.log(error))
    },
    updateLead: async (id: string, status: string) => {
        await axios.post('https://d5dnebshjibq2cticp6u.apigw.yandexcloud.net/update-lead', {
            "id": id,
            "status": status
        }).then(response => {
            console.log(response)
        }).catch(error => console.log(error))
    },
    createLead: async (name: string, description: string) => {
        await axios.post('https://d5dnebshjibq2cticp6u.apigw.yandexcloud.net/create', {
            "name": name,
            "description": description
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

})), {name: 'tasksStore', version: 1}));