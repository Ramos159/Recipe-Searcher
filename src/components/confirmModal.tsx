import React from 'react';
import Modal from 'react-bootstrap/modal';
import Button from 'react-bootstrap/Button';

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  body: string;
};

export default function ConfirmModal({ visible, onClose, title, body, onConfirm }: Props) {
  return (
    <Modal
      show={visible}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      // backdrop="static"
      // keyboard={false}
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Recipe Searcher</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{title}</h4>
        <p>{body}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
