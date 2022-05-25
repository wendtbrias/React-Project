import React from "react";

const options = [
    "All",
    "Finish",
    "Pending"
]
const Form = React.memo(({ changeHandler,addHandler,todoForm,btnRef,onFilter }) => {
    return (
        <div className="todo-form">
            <div className="form-input">
                <input value={todoForm.todo} onChange={changeHandler} name="todo" type="text" />
                <button ref={btnRef} data-id="add" id="add" onClick={() => addHandler()} type="button"><i className="ri-add-line"></i></button>
            </div>
            <div className="form-filter">
                <select onChange={onFilter}>
                    <option>Select options</option>
                    {options?.map((opt, key) => <option key={key} value={opt}>{opt}</option>)}
                </select>
            </div>
        </div>
    )
});

export default Form;