import React, {useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {Board, Item, useTasks} from "../store/store";
import CardModal from "./CardModal";
import CreateNewLeadModal from "./CreateNewLeadModal.tsx";


const KanbanBoard = () => {
    const {boards, setBoards, setShowCardModal, setTaskData, updateLead, setShowCreateNewLeadModal,deleteAllLeads} = useTasks();

    const [currentBoard, setCurrentBoard] = useState<Board>({} as Board);
    const [currentItem, setCurrentItem] = useState<Item>({} as Item);

    function dragOverHandler(e: React.DragEvent<HTMLElement>){
        e.preventDefault();
        if(e.currentTarget.classList.contains('item')){
            e.currentTarget.style.boxShadow = '0 4px 3px gray'
        }
    }

    function dragLeaveHandler(e: React.DragEvent<HTMLElement>){
        e.currentTarget.style.boxShadow = 'none'
    }

    function dragEndHandler(e: React.DragEvent<HTMLElement>){
        e.currentTarget.style.boxShadow = 'none'
    }

    function dragStartHandler(board: Board, item: Item){
        setCurrentBoard(board);
        setCurrentItem(item)
    }

    function dropHandler(e: React.DragEvent<HTMLElement>, board: Board, item: Item){
        e.stopPropagation()
        e.preventDefault();
        const currentIndex = currentBoard.items.indexOf(currentItem);
        currentBoard.items.splice(currentIndex, 1)
        const dropIndex = board.items.indexOf(item);
        board.items.splice(dropIndex + 1,0,  currentItem)
        updateLead(currentItem.id, item.status)
        setBoards(boards.map(b => {
            if(b.id === board.id){
                return board
            }
            if(b.id === currentBoard.id){
                return currentBoard
            }
            return b
        }))
        e.currentTarget.style.boxShadow = 'none'
    }

    function dropCardHandler(e: React.DragEvent<HTMLElement>, board: Board) {
        e.stopPropagation()
        e.preventDefault()
        board.items.push(currentItem)
        const currentIndex = currentBoard.items.indexOf(currentItem);
        currentBoard.items.splice(currentIndex, 1)
        updateLead(currentItem.id, board.status)
        setBoards(boards.map(b => {
            if(b.id === board.id){
                return board
            }
            if(b.id === currentBoard.id){
                return currentBoard
            }
            return b
        }))
        e.currentTarget.style.boxShadow = 'none'
    }

    return (
        <Container className={'kanban'}>
            <Row className={'mb-2 mt-5'}>
                <Col>
                    <Button onClick={() => setShowCreateNewLeadModal(true)}>Добавить задачу</Button>
                </Col>

            </Row>
            <Row>
                {boards.map(board => <Col
                    className={'board border border-3 m-2 '}
                    style={{minHeight: 600}}
                    onDragOver={(e: React.DragEvent<HTMLElement>) => dragOverHandler(e)}
                    onDrop={(e) => dropCardHandler(e, board)}
                >
                    <h2>{board.status}</h2>
                    {board.items.map(item => <Container
                        className={'item border border-3 mt-3'}
                        style={{cursor: "pointer", maxWidth: 230, maxHeight: 100, wordWrap: "break-word", overflow: "hidden"}}
                        draggable={true}
                        onClick={() => {
                            setTaskData(item)
                            setShowCardModal(true)
                        }}
                        onDragOver={(e: React.DragEvent<HTMLElement>) => dragOverHandler(e)}
                        onDragLeave={e => dragLeaveHandler(e)}
                        onDragStart={() => dragStartHandler(board, item)}
                        onDragEnd={(e) => dragEndHandler(e)}
                        onDrop={(e) => dropHandler(e, board, item)}
                    >
                        <Row className={'p-2'}>
                            <h5>{item.name}</h5>
                            <div>{item.description}</div>
                        </Row>
                    </Container>)}
                    <Container >
                        <Button
                            hidden={!board.items.length}
                            variant={"danger"}
                            className={'mt-3'}
                            onClick={() => {
                                deleteAllLeads(board.status)
                            }}
                        >Удалить задачи</Button>
                    </Container>
                </Col>)}
            </Row>
            <CardModal/>
            <CreateNewLeadModal/>
        </Container>
    );
};

export default KanbanBoard;