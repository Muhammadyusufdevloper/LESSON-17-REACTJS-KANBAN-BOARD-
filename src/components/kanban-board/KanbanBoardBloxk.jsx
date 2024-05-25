import { memo } from "react";
import { MdReportGmailerrorred } from "react-icons/md";

const KanbanBoardBlock = ({ setSelectedStatus, item, status__item, setStatusItem }) => {
    const handelDelete = (id, status) => {
        if (item(status).length) {
            alert(`Iltimos, ${status} ichini bo'shating`);
            return;
        }
        if (!confirm("O'chirmoqchimisiz")) return;
        const updatedStatusItem = status__item.filter((el) => el.id !== id);
        setStatusItem(updatedStatusItem);
        localStorage.setItem("kanBoardStatus", JSON.stringify(updatedStatusItem));
    };

    return (
        status__item?.map((el) => (
            <div key={el.id} className={`kanban__box`}>
                <div className="kanban__heading">
                    <p>{el.status} to start / {item(el.status).length}</p>
                </div>
                <div className="kanban__block">{item(el.status).length ? item(el.status) :
                    <MdReportGmailerrorred className="kanban__block__icon" />
                }</div>
                <div className="kanban__block__buttons-part">
                    <button onClick={() => setSelectedStatus(el.status)}>Add item</button>
                    <button
                        type="button"
                        onClick={() => handelDelete(el.id, el.status)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        ))
    );
};

export default memo(KanbanBoardBlock);
