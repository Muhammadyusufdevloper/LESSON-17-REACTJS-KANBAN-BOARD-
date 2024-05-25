import { memo } from "react"
import { MdReportGmailerrorred } from "react-icons/md";

const KanbanBoardBlock = ({ setSelectedStatus, item, status__item }) => {
    console.log(status__item);
    return (
        status__item?.map((el) => (
            <div key={el.id} className={`kanban__box`}>
                <div className="kanban__heading">
                    <p>{el.status} to start / {item(el).length}</p>
                </div>
                <div className="kanban__block">{item(el).length ? item(el) :
                    <MdReportGmailerrorred className="kanban__block__icon" />
                }</div>
                <div className="kanban__block__buttons-part">
                    <button onClick={() => setSelectedStatus(el)}>Add item</button>
                    <button onClick={() => setSelectedStatus(el)}>Delete</button>
                </div>
            </div>
        ))
    )
}

export default memo(KanbanBoardBlock)