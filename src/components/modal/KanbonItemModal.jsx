import { memo } from "react"
import PropTypes, { func } from 'prop-types';
import "./KanbonItemModal.scss"

const KanbonItemModal = ({ handleCreateItem, title, desc, selectedStatus, setSelectedStatus }) => {
    return (
        <>
            <div className={`kanban__modal__overle ${!selectedStatus ? "kanban__modal__edit-show" : ""}`} onClick={() => setSelectedStatus(null)}></div>
            <div className={`kanban__modal__edit-wrapper ${!selectedStatus ? "kanban__modal__edit-show" : ""}`}>
                <button className={`kanban__modal__edit-close  ${!selectedStatus ? "kanban__modal__edit-show" : ""}`} onClick={() => setSelectedStatus(null)}>X</button>
                <form onSubmit={handleCreateItem} className="kanban__modal__edit-from">
                    <input ref={title} type="text" required placeholder="Name enter" />
                    <input ref={desc} type="text" required placeholder="Description enter" />
                    <button type="submit">Create</button>
                </form>
            </div>
        </>
    );
}

KanbonItemModal.propTypes = {
    handleCreateItem: PropTypes.func.isRequired,
    title: PropTypes.object.isRequired,
    desc: PropTypes.object.isRequired,
    selectedStatus: PropTypes.bool.isRequired,
    setSelectedStatus: func.isRequired,
};

export default memo(KanbonItemModal);