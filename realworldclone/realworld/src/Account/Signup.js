import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"

function Signup() {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [invalidResEmail, setInvalidResEmail] = useState(false)
    const [invalidResUsername, setInvalidResUsername] = useState(false)
    const [invalidUser, setInvalidUser] = useState(false)
    const [invalidEmail, setInvalidEmail] = useState(false)
    const [invalidPassword, setInvalidPassword] = useState(false)



    const handleSignUp = (e) => {
        e.preventDefault()
        setInvalidUser(false)
        setInvalidEmail(false)
        setInvalidPassword(false)
        setInvalidResEmail(false)
        setInvalidResUsername(false)
        const data = {
            "user": {
                "username": userName,
                "email": email,
                "password": password
            }
        }
        /*  Hàm signup url = base url +/users
            Tạo bởi anhtd 2-8
        */
        if (data.user.username === '') {
            setInvalidUser(true)
        } else if (data.user.email === '') {
            setInvalidEmail(true)
        } else if (data.user.password === '') {
            setInvalidPassword(true)
        } else {
            fetch("https://api.realworld.io/api/users", {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.user) {
                        localStorage.setItem("data", JSON.stringify(data.user))
                        window.location.href = "/"
                    } else {
                        if (data.errors.email) setInvalidResEmail(true)
                        if (data.errors.username) setInvalidResUsername(true)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        }
    }

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">

                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign up</h1>
                        <p className="text-xs-center">
                            <a href="/login">Have an account?</a>
                        </p>

                        <ul className="error-messages">
                            {invalidResEmail && <li>That email is already taken</li>}
                            {invalidResUsername && <li>Username has already been taken</li>}
                            {invalidUser && <li>Username can't be blank</li>}
                            {invalidEmail && <li>Email can't be blank</li>}
                            {invalidPassword && <li>Password can't be blank</li>}
                        </ul>

                        <form onSubmit={handleSignUp.bind(null,)}>
                            <fieldset className="form-group">
                                <input
                                    onChange={e => setUserName(e.target.value)}
                                    className="form-control form-control-lg" type="text" placeholder="Your Name" />
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    onChange={e => setEmail(e.target.value)}
                                    className="form-control form-control-lg" type="email" placeholder="Email" />
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    onChange={e => setPassword(e.target.value)}
                                    className="form-control form-control-lg" type="password" placeholder="Password" />
                            </fieldset>
                            <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
                                Sign up
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Signup;