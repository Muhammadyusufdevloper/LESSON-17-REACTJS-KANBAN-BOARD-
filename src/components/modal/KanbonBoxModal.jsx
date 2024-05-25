// import { memo, useState } from "react"
// import "./KanbonBoxModal.scss"
// const KanbonBoxModal = (statusItem, setStatusItem) => {
//     const [statusTitle, setStatusTitle] = useState("")
//     console.log(typeof setStatusItem);
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         let id = new Date();
//         let statusData = {
//             id: id.getTime(),
//             status: statusTitle
//         };
//         setStatusItem((prevStatus) => [...prevStatus, statusData]);
//         setStatusTitle("");
//     };
//     console.log(statusTitle);
//     return (
//         <>
//             {/* <div className="kanban__modal__overle"></div> */}
//             <div className="kanban__add-box__modal">
//                 <form onSubmit={handleSubmit} className="kanban__add-box__form">
//                     <input value={statusTitle} onChange={(e) => setStatusTitle(e.target.value)} type="text" placeholder="Title enter" />
//                     <button>Save</button>
//                 </form>
//             </div>
//         </>
//     )
// }

// export default memo(KanbonBoxModal)