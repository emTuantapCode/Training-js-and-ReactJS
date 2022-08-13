import getDataUser from '../localStorage'
import { Link } from "react-router-dom";

function NavAuthor() {
    const localdata = getDataUser()

    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <a style={{
                    fontWeight: '750'
                }} className="navbar-brand" href="/">conduit</a>
                <ul className="nav navbar-nav pull-xs-right">
                    <li className="nav-item">
                        <Link className="nav-link active" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/editor/new-article">
                            <i className='ti-notepad'></i>
                            &nbsp;New Article
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/settings">
                            <i className="ion-gear-a"></i>&nbsp;Settings
                        </Link>
                    </li>
                    <li className="nav-item">
                        <img
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%'
                            }}
                            ng-src="12" className="user-pic" src={localdata.image} />
                        <Link style={{ display: 'inline-block', paddingLeft: '12px' }} className="nav-link" to={`/@${localdata.username}`} >{localdata.username}</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default NavAuthor;