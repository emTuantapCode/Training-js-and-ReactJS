import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [invalid, setInvalid] = useState(false)
    const [invalidEmail, setInvalidEmail] = useState(false)
    const [invalidPassword, setInvalidPassword] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    let navigate = useNavigate();

    /*  Hàm redirect logined => redirect '/'
            Tạo bởi anhtd 2-8
    */
    useEffect(() => {
        if (loggedIn) {
            window.location.href = "/"
        }
    }, [loggedIn])

    const handleLogin = (e) => {
        setInvalid(false)
        setInvalidEmail(false)
        setInvalidPassword(false)
        setInvalid(false)
        
        e.preventDefault()
        const data = {
            "user": {
                "email": email,
                "password": password
            }
        }
        /*  Hàm login url = base url +/users/login
            Tạo bởi anhtd 2-8
        */
        if (data.user.email === '') {
            setInvalidEmail(true)
        } else if (data.user.password === '') {
            setInvalidPassword(true)
        } else {
            fetch("https://api.realworld.io/api/users/login", {
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
                        setLoggedIn(true)
                    } else {
                        setInvalid(true)
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
                        <h1 className="text-xs-center">Sign in</h1>
                        <p className="text-xs-center">
                            <a href="/register">Need an account?</a>
                        </p>

                        <ul className="error-messages">
                            {invalid && <li>Email or password is invalid</li>}
                            {invalidEmail && <li>Email can't be blank</li>}
                            {invalidPassword && <li>Password can't be blank</li>}
                        </ul>

                        <form onSubmit={handleLogin.bind(null,)}>
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
                                Sign in
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Login;