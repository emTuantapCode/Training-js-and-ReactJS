import { useState } from 'react';
import getDataUser from '../localStorage'
import { useNavigate } from "react-router-dom";
import { apiUpdateProfile } from '../apiService/apiUser'

function Setting() {
    const localdata = getDataUser()
    const [picture, setPicture] = useState(localdata.image)
    const [name, setName] = useState(localdata.username)
    const [bio, setBio] = useState(localdata.bio)
    const [email, setEmail] = useState(localdata.email)
    const [password, setPassword] = useState('')
    let navigate = useNavigate();
    /*  Hàm update profile url = base api+/user
                Tạo bởi anhtd 2-8
                cap nhat 5-8
            */
    const handleUpdate = async (e) => {
        e.preventDefault()

        const data = {
            "user": {
                "email": email,
                "username": name,
                "bio": bio,
                "image": picture,
                "password": password,
            }
        }
        fetch("https://api.realworld.io/api/user", {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                "Authorization": `Token ${localdata.token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.user) {
                    localStorage.setItem("data", JSON.stringify(data.user))
                    window.location.href = `/@${data.user.username}`
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }
    const handleLogout = () => {
        localStorage.removeItem("data")
        window.location.href = "/"
    }

    return (
        <div className="settings-page">
            <div className="container page">
                <div className="row">

                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Your Settings</h1>

                        <form onSubmit={handleUpdate.bind(null,)}>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
                                        value={picture}
                                        onChange={e => setPicture(e.target.value)}
                                        className="form-control" type="text" placeholder="URL of profile picture" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        className="form-control form-control-lg" type="text" placeholder="Your Name" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea
                                        value={bio}
                                        onChange={e => setBio(e.target.value)}
                                        className="form-control form-control-lg" rows="8"
                                        placeholder="Short bio about you"></textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="form-control form-control-lg" type="email" placeholder="Email" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="form-control form-control-lg" type="password" placeholder="Password" />
                                </fieldset>
                                <button type='submit' className="btn btn-lg btn-primary pull-xs-right">
                                    Update Settings
                                </button>
                            </fieldset>
                        </form>
                        <hr />
                        <button onClick={handleLogout} className="btn btn-outline-danger" ng-click="$ctrl.logout()">
                            Or click here to logout.
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Setting;