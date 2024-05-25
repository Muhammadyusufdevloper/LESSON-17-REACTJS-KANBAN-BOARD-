import { useCallback, useEffect, useRef, useState } from "react";
import { DATA } from "../../static/";
import KanbanBoardBlock from "./KanbanBoardBloxk";
import KanbonItem from "./KanbonItem";
import KanbonItemModal from "../modal/KanbonItemModal";

// let STATUS__ITEM = ["ready", "working", "stuck", "done", "lorem"]
let STATUS__ID = new Date()
let STATUS__ITEM = [
  {
    id: STATUS__ID.getTime()+1,
    status: "ready"
  },
  {
    id: STATUS__ID.getTime()+34,
    status: "working"
  },
  {
    id: STATUS__ID.getTime()+243333,
    status: "stuck"
  },
  {
    id: STATUS__ID.getTime()+131,
    status: "done"
  },
  {
    id: STATUS__ID.getTime()+231,
    status: "lorem"
  }
]

const KanbanBoard = () => {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("kanBoard")) || DATA)
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [changeStatus, setChangeStatus] = useState(null)

  const title = useRef(null)
  const desc = useRef(null)

  useEffect(() => {
    localStorage.setItem("kanBoard", JSON.stringify(data))
  }, [data])

  useEffect(() => {
    if (changeStatus) {
      let index = data?.findIndex(el => el.id === changeStatus.id)
      data?.splice(index, 1, changeStatus)
      setData([...data])
    }
  }, [changeStatus])

  const filterByStatus = (status) => {
    return data?.filter(el => el.status === status)?.map((el) => (
      <KanbonItem setChangeStatus={setChangeStatus} data={data} setData={setData} key={el.id} STATUS__ITEM={STATUS__ITEM} el={el} />
    ))
  }

  let memoFilterByStatus = useCallback((status) => {
    return filterByStatus(status)
  })


  const handleCreateItem = (e) => {
    e.preventDefault()
    let data = new Date()
    let timeZoneGMT = (hour) => new Date(data.getTime() + (hour * 60 * 60 * 1000))
    let newItems = {
      id: data.getTime(),
      title: title.current.value,
      desc: desc.current.value,
      status: selectedStatus,
      createdAt: timeZoneGMT(5).toISOString()
    }
    console.log(newItems);

    setData(prev => [...prev, newItems])

    setSelectedStatus(null)
    title.current.value = ""
    desc.current.value = ""
  }

  return (
    <section>
      <div className="container">
        <div className="kanban">

          <h2 className="kanban__title">Kanban Board</h2>
          <div className="kanban__header">
            <button className="kanban__btn">Add</button>
          </div>
          <KanbonItemModal
            selectedStatus={selectedStatus}
            handleCreateItem={handleCreateItem}
            title={title}
            setSelectedStatus={setSelectedStatus}
            desc={desc} />
          <div className="kanban__scrol-wrapper">
            <div className="kanban__wrapper">
              <KanbanBoardBlock
                setSelectedStatus={setSelectedStatus}
                item={memoFilterByStatus}
                status__item={STATUS__ITEM}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KanbanBoard;


