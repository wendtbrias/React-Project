import React from "react";

const Todos = React.memo(({ todo ,onDelete,onUpdate,onFinish }) => {
    return (
        <div className="todo-container-item">
            {todo && todo.map((item, id) => {
                return (
                    <div key={id} className={`todo-item ${item.finish ? "finish":""}`}>
                        <h4>{item.todo}</h4>
                        <div className="actions">
                            <button onClick={() => onFinish(item.id)} className="check-icon">
                                <i className="ri-check-double-line"></i>
                            </button>
                           <button onClick={() => onUpdate(item.id)} className="edit-icon">
                               <i className="ri-edit-line"></i>
                           </button>
                           <button onClick={() => onDelete(item.id)} className="delete-icon">
                               <i className="ri-delete-bin-7-line"></i>
                           </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
});

export default Todos;