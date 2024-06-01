
import {useTasks} from "../store/store";
import {Button, Modal} from "react-bootstrap";

const CardModal = () => {
    const {showCardModal, setShowCardModal, taskData, deleteLead} = useTasks();
    const handleClose = () => setShowCardModal(false);
    // const handleShow = () => setShowCardModal(true);

    return (
        <div>
            <Modal show={showCardModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{taskData.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {taskData.description}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        deleteLead(taskData.id);
                        handleClose();
                    }}>
                        Удалить задачу
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CardModal;