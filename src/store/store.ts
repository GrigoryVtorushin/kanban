import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {persist} from "zustand/middleware";
import axios from "axios";

export type Item = {
    id: string,
    name: string,
    description: string,
    is_final: boolean,
    status: string
}
export type Board = {
    id: number,
    status: string,
    items: Item[]
}

export interface tasksState{
    boards: Board[],
    setBoards: (b: Board[]) => void,
    showCardModal: boolean,
    setShowCardModal: ( bool: boolean ) => void,
    showCreateNewLeadModal: boolean,
    setShowCreateNewLeadModal: ( bool: boolean ) => void,
    taskData: Item,
    setTaskData: (data: Item) => void,
    leads: Item[],
    setLeads: (data: Item[]) => void,
    getLeads: () => void,
    deleteLead: (id: string) => void,
    deleteAllLeads: (status: string) => void,
    updateLead: (id: string, status: string) => void,
    createLead:(name: string, description: string) => void,
}

export const useTasks = create<tasksState>()(persist(immer((set) => ({
    boards: [
        {id: 1, status: 'Новое', items: []},
        {id: 2, status: 'В работе', items: []},
        {id: 3, status: 'Отказ', items: []},
        {id: 4, status: 'Завершено', items: []}
    ],
    setBoards: (b: Board[]) => set({boards: b}),
    showCardModal: false,
    setShowCardModal: ( bool ) => set ( {showCardModal: bool}),
    showCreateNewLeadModal: false,
    setShowCreateNewLeadModal: ( bool ) => set ( {showCreateNewLeadModal: bool}),
    taskData: {
        id: '',
        name: '',
        description: '',
        is_final: false,
        status: ''
    },
    setTaskData: (data) => set({taskData: data}),
    leads: [],
    setLeads: (data) => set({leads: data}),
    getLeads: async () => {
        await axios.post('https://d5dnebshjibq2cticp6u.apigw.yandexcloud.net/get-leads', {})
            .then(response => {
                set({boards: response.data.data});
            })
            .catch(error => {
                console.log(error)
            })
    },
    deleteLead: async (id: string) => {
        await axios.post('https://d5dnebshjibq2cticp6u.apigw.yandexcloud.net/delet', {
            "id": id
        })
            .then(() => {
                set(state => state.getLeads())
            })
            .catch(error => {
                console.log(error)
            })
    },
    deleteAllLeads: async (status: string) => {
        await axios.post('https://d5dnebshjibq2cticp6u.apigw.yandexcloud.net/delet-all', {
            'status': status
        }).then(() => {
            set(state => state.getLeads())
        }).catch(error => console.log(error))
    },
    updateLead: async (id: string, status: string) => {
        await axios.post('https://d5dnebshjibq2cticp6u.apigw.yandexcloud.net/update-lead', {
            "id": id,
            "status": status
        }).then(() => {
            set(state => state.getLeads())
        }).catch(error => console.log(error))
    },
    createLead: async (name: string, description: string) => {
        await axios.post('https://d5dnebshjibq2cticp6u.apigw.yandexcloud.net/create', {
            "name": name,
            "description": description
        }).then(() => {
            set(state => state.getLeads())
        }).catch(error => {
            console.log(error)
        })
    }

})), {name: 'tasksStore', version: 1}));
