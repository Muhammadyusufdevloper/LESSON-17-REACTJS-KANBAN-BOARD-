import { useCallback, useEffect, useRef, useState } from "react";
import { DATA } from "../../static/";
import KanbanBoardBlock from "./KanbanBoardBloxk";
import KanbonItemModal from "../modal/KanbonItemModal";
import KanbonItem from "./KanbonItem";

const KanbanBoard = () => {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("kanBoard")) || DATA)
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [changeStatus, setChangeStatus] = useState(null)
  const [boxModal, setBoxModal] = useState(false)
  const [statusItem, setStatusItem] = useState(JSON.parse(localStorage.getItem("kanBoardStatus")) || []);
  const [statusTitle, setStatusTitle] = useState("")


  const title = useRef(null)
  const desc = useRef(null)
  useEffect(() => {
    localStorage.setItem("kanBoard", JSON.stringify(data))
  }, [data])


  useEffect(() => {
    localStorage.setItem("kanBoardStatus", JSON.stringify(statusItem));
  }, [statusItem]);


  useEffect(() => {
    if (changeStatus) {
      let index = data?.findIndex(el => el.id === changeStatus.id)
      data?.splice(index, 1, changeStatus)
      setData([...data])
    }
  }, [changeStatus])

  const filterByStatus = (status) => {
    return data?.filter(el => el.status === status)?.map((el) => (
      <KanbonItem setChangeStatus={setChangeStatus} data={data} setData={setData} key={el.id} STATUS__ITEM={statusItem} el={el} />
    ))
  }

  let memoFilterByStatus = useCallback((status) => {
    return filterByStatus(status)
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedStatusTitle = statusTitle.trim();
    
    let duplicate = false;
    statusItem.forEach(item => {
      if (item.status.toLowerCase() === trimmedStatusTitle.toLowerCase()) {
        duplicate = true;
      }
    });
    if (duplicate) {
      alert('Iltimos boshqa nom kiriting');
      return;
    }



    let id = new Date();
    let statusData = {
      id: id.getTime(),
      status: statusTitle
    };
    setStatusItem((prevStatus) => [...prevStatus, statusData]);
    setStatusTitle("");
    setBoxModal(false)
  };
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
            <button className="kanban__btn" onClick={() => setBoxModal(true)}>Add</button>
          </div>
          {
            !statusItem.length ?
              <div className="kanban__headquarter-box">
                <h1>Malumotni Kriting</h1>
                <button className="kanban__btn" onClick={() => setBoxModal(true)}>Get start</button>
              </div>
              : <></>}

          <div onClick={() => setBoxModal(false)} className={boxModal ? `kanban__modal__overle` : ""}></div>
          {
            boxModal ?
              <div className="kanban__add-box__modal">
                <button className={`kanban__modal__edit-close`} onClick={() => setBoxModal(false)}>X</button>
                <form onSubmit={handleSubmit} className="kanban__add-box__form">
                  <input required value={statusTitle} onChange={(e) => setStatusTitle(e.target.value)} type="text" placeholder="Title enter" />
                  <button>Save</button>
                </form>
              </div>
              : <></>
          }
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
                status__item={statusItem}
                setStatusItem={setStatusItem}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KanbanBoard;


