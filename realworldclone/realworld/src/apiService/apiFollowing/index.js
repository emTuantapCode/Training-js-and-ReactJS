import getDataUser from "../../localStorage"
const localdata = getDataUser()

export const handleFollow = (isFollow) => {
    if (isFollow !== null) {
        var method = ''
        if (isFollow === true) { method = 'DELETE' }
        else { method = 'POST' }
        fetch("https://api.realworld.io/api/profiles/Gerome/follow", {
            method: method,
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                "Authorization": `Token ${localdata.token}`
            },
        })
            .then(res => res.json())
            .catch((error) => {
                console.error('Error:', error);
            })
    }

}


