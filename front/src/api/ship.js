import { API_URL } from '../lib/const';

const getAll = () => {
    return fetch(`${API_URL}/ship`).then(res => res.json());
}

// { model }
const addShip = (data) => {
    return fetch(`${API_URL}/ship/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(res => res.json());
}

const edit = ({ ship }) => {
    return fetch(`${API_URL}/ship/edit`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ship }),
    }).then(res => res.json());
}

const deleteOne = ({ id }) => {

}

export const shipApi = {
    getAll,
    addShip,
    edit,
    deleteOne,
}