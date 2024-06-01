import {Button, Form, Modal} from "react-bootstrap";
import {useTasks} from "../store/store.ts";
import {useState} from "react";


const CreateNewLeadModal = () => {

    const {showCreateNewLeadModal, setShowCreateNewLeadModal, createLead} = useTasks();
    const handleClose = () => setShowCreateNewLeadModal(false);
    const [leadTitle, setLeadTitle] = useState('');
    const [leadDesc, setLeadDesc] = useState('');

    return (
        <div>
            <Modal show={showCreateNewLeadModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Новая задача</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label htmlFor={'inputTitle'}>Название задачи</Form.Label>
                    <Form.Control
                        type={'text'}
                        id={'inputTitle'}
                        onChange={e => {
                            setLeadTitle(e.target.value)
                        }}
                    ></Form.Control>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Описание задачи</Form.Label>
                        <Form.Control
                            as="textarea"
                            onChange={e => {
                                setLeadDesc(e.target.value)
                            }}
                            rows={3} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        createLead(leadTitle, leadDesc);
                        handleClose();
                    }}>
                        Создать задачу
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreateNewLeadModal;