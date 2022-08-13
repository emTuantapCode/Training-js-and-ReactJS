export default function getDataUser() {
    const data = JSON.parse(localStorage.getItem('data'))
    if (data) return data;
}


