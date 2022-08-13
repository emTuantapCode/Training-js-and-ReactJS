import moment from 'moment'
import { apiPostFavorite, apiDeleteFavorite } from '../apiService/apiFavorite';
import { useNavigate } from "react-router-dom";
import getDataUser from '../localStorage';
import { useState } from 'react';


function ArticleCard(props) {
    let navigate = useNavigate()
    let localdata = getDataUser()
    const [isFavorite, setIsFavorite] = useState(props.favorite)
    const [color, setColor] = useState(props.favorite)
    const [favoritesCount, setFavoritesCount] = useState(props.favoritesCount)
    const handleFavorite = async () => {
        if (localdata) {
            if (isFavorite === true) {
                let res = await apiDeleteFavorite(props.slug)
                if (res.status === 200) {
                    setIsFavorite(res.data.article.favorited)
                    setColor(false)
                    setFavoritesCount(favoritesCount - 1)
                }
            } else {
                let res = await apiPostFavorite(props.slug)
                if (res.status === 200) {
                    setIsFavorite(res.data.article.favorited)
                    setColor(true)
                    setFavoritesCount(favoritesCount + 1)
                }
            }
        } else {
            navigate('/login')
        }
    }
    return (
        <div className="article-preview">
            <div className="article-meta">
                <a href={`/@${props.username}`}><img src={props.image} /></a>
                <div className="info">
                    <a className="author" href={`/@${props.username}`}>{props.username}</a>
                    <span className="date">{moment(props.time).format('DD/MM/YYYY')}</span>
                </div>
                <button
                    onClick={handleFavorite}
                    className={!color ?
                        `btn btn-outline-primary btn-sm pull-xs-right` :
                        `btn btn-sm btn-primary pull-xs-right`}>
                    <i className="ion-heart"></i> {favoritesCount}
                </button>
            </div>
            <a href={`/articles/${props.slug}`} className="preview-link">
                <h1>{props.title}</h1>
                <p>{props.description}</p>
                <span>Read more...</span>
            </a>
            <ul style={{
                float: 'right',
                cursor: 'pointer'
            }} className="tag-list">
                <a href={`/articles/${props.slug}`}>
                    {props.tagList?.map((tag, index) => {
                        return (
                            <li key={index} className="tag-default tag-pill tag-outline ng-binding ng-scope" ng-repeat="tag in $ctrl.article.tagList">
                                {tag}
                            </li>
                        )
                    })}
                </a>
            </ul>
        </div>
    )
}
export default ArticleCard;