import Button from "../Button"
import Modal from "../Modal"
import "./style.scss"

interface DeleteModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

const DeleteModal = ({ onConfirm, onClose }: DeleteModalProps) => {
  return (
    <Modal>
      <div className="delete-modal">
        <p>Are you sure you want to delete this task?</p>
        <div className="delete-modal__actions">
          <Button title="Delete" onClick={onConfirm} />
          <Button title="Cancel" outline onClick={onClose} />
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal
