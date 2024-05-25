import { memo } from 'react';
import PropTypes from 'prop-types';
import { MdDeleteOutline } from "react-icons/md";

const KanbanItem = ({ el, STATUS__ITEM, setChangeStatus, setData, data }) => {
    let time = el.createdAt.split("T")[1].slice(0, 5);
    console.log(el);
    console.log(STATUS__ITEM);
    const handelDelete = (id) => {
        if (!confirm("Do you allow this information to be deleted?")) return;
        let filTer = data?.filter((el) => el.id !== id);
        localStorage.setItem("kanBoard", JSON.stringify(filTer));
        setData(filTer);
    };
    return (
        <div className="kanban__item">
            <div className="kanban__item__top-boxes">
                <p>{el.title}</p>
                <button onClick={() => handelDelete(el.id)}><MdDeleteOutline /></button>
            </div>
            <p className="kanban__commit">{el.desc}</p>
            <div className="kanban__status">
                <select
                    onChange={e => setChangeStatus({ ...el, status: e.target.value })}
                    value={el.status}
                >
                    {
                        STATUS__ITEM?.map((status) => (
                            <option key={status.id} value={status.status}>{status.status}</option>
                        ))
                    }
                </select>
                <span>{time}</span>
            </div>
        </div>
    );
};

KanbanItem.propTypes = {
    el: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        desc: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
    }).isRequired,
    STATUS__ITEM: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            status: PropTypes.string.isRequired,
        })
    ).isRequired,
    setChangeStatus: PropTypes.func.isRequired,
    setData: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
};

export default memo(KanbanItem);
