const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3005'

const headers = {
    'Accept': 'application/json'
};
export const doComuptation = (payload) => fetch(`${api}/compute/doComputation`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
}).then(res => {
    if (res.status === 200) {
        return (res.json());
    } else {
        return { finalResult: "Syntax Error" };
    }
})
    .catch(error => {
        console.log("error");
        return error;
    }
    );