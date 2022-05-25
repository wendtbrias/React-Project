import { useState, useEffect } from "react";

const useLocalStorage = (key , initialValue = []) => {
    const [todos,setTodos] = useState(JSON.parse(localStorage.getItem(key)) || initialValue);

    useEffect(() => {
        localStorage.setItem(key ,JSON.stringify(todos));
    },[todos]);

    return [todos,setTodos];
}

export default useLocalStorage;