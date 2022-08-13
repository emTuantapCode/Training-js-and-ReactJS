import { useEffect, useState } from "react";
import getDataUser from '../localStorage'
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import moment from 'moment'
import { handleFollow } from "../apiService/apiFollowing";
import { apiDeleteFavorite, apiPostFavorite } from "../apiService/apiFavorite";
import CommentCard from '../Components/CommentCard'
import { apiGetComment, apiPostComment } from "../apiService/apiComment";
import { apiGetArticle, apiDeleteArticle } from "../apiService/apiArticles";

function ArticleDetail() {
    const [isAuthor, setIsAuthor] = useState(false)
    const [article, setArticle] = useState({})
    const [followBtn, setFollowBtn] = useState(false)
    const [favorite, setFavorite] = useState(false)
    const [slugComment, setSlugComment] = useState(null)
    const [comments, setComments] = useState(null)
    const [bodyComment, setBodyComment] = useState('')
    const [renderComment, setRenderComment] = useState(null)
    const localdata = getDataUser()
    let location = useLocation()
    const pathName = location.pathname
    let navigate = useNavigate();

    /** hàm xử lý lấy thông tin article
   *  sản phẩm của anhtd 3-8
   */

    console.log('1')
    useEffect(() => {
        const getArticles = async () => {
            console.log('2')
            let res = await apiGetArticle(pathName)
            const data = res.data.article
            setArticle(data)
            setFollowBtn(data.author.following)
            setFavorite(data.favorited)
            setSlugComment(data.slug)
            setRenderComment(true)
            if (data.author.username === localdata?.username) setIsAuthor(true)
            else setIsAuthor(false)
        }
        getArticles();
    }, [])

    /** hàm xử lý xóa article
   *  sản phẩm của anhtd 5-8
   */
    const handleDeletaArticle = async () => {
        let res = await apiDeleteArticle(pathName)
        if (res.status === 200) navigate('/')
    }
    /** hàm xử lý lấy thông tin comment
        *  sản phẩm của anhtd 4-8
        */
    useEffect(() => {
        if (slugComment === null) return;

        const getCommentArticle = async () => {
            let res = await apiGetComment(slugComment)
            setComments(res.data.comments)
        }
        getCommentArticle()
    }, [renderComment])
    /** hàm xử lý submit comment
        *  sản phẩm của anhtd 4-8
        */
    const handleSubmit = async (e) => {
        if (localdata) {
            e.preventDefault();
            let response = await apiPostComment(article.slug, bodyComment)
            setRenderComment(!renderComment)
            setBodyComment('')
        } else {
            navigate('/login')
        }
    }

    const handleFavorite = async (slug) => {
        if (favorite) {
            let res = await apiDeleteFavorite(slug)
            setFavorite(res.data.article.favorited)
        } else {
            let res = await apiPostFavorite(slug)
            setFavorite(res.data.article.favorited)
        }
    }
    return (
        <div className="article-page">

            <div className="banner">
                <div className="container">

                    <h1>{article.title}</h1>

                    <div className="article-meta">
                        <a href={`/@${article.author?.username}`}><img src={article.author?.image} /></a>
                        <div className="info">
                            <a href={`/@${article.author?.username}`} className="author">{article.author?.username}</a>
                            <span className="date">{moment(article.createdAt).format('DD/MM/YYYY')}</span>
                        </div>
                        {!isAuthor && <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => {
                                setFollowBtn(!followBtn)
                                handleFollow(followBtn)
                            }}>
                            <i className="ion-plus-round"></i>
                            &nbsp;
                            {followBtn ? `Unfollow ${article.author?.username}` : `Follow ${article.author?.username}`}
                            <span className="counter"></span>
                        </button>}
                        {isAuthor && <a className="btn btn-outline-secondary btn-sm" ui-sref="app.editor({ slug: $ctrl.article.slug })"
                            href={`/editor/${article.slug}`}>
                            <i className="icon-edit"></i> Edit Article
                        </a>}
                        &nbsp;&nbsp;
                        {!isAuthor && <button
                            onClick={() => handleFavorite(article.slug)}
                            className="btn btn-sm btn-outline-primary">
                            <i className="ion-heart"></i>
                            &nbsp;
                            {article.favorited ? favorite && `Unfavorite Article (${article.favoritesCount})` ||
                                !favorite && `Favorite Article (${article.favoritesCount - 1})` :
                                favorite && `Unfavorite Article (${article.favoritesCount + 1})` ||
                                !favorite && `Favorite Article (${article.favoritesCount})`}
                            <span className="counter"></span>
                        </button>}
                        {isAuthor && <button className="btn btn-outline-danger btn-sm" onClick={handleDeletaArticle}>
                            <i className="ion-trash-a"></i> Delete Article
                        </button>}
                    </div>

                </div>
            </div>

            <div className="container page">

                <div className="row article-content">
                    <div className="col-md-12">
                        <p>
                            {article.description}
                        </p>
                        <p>{article.body}</p>
                    </div>
                    <ul className="tag-list">
                        {article.tagList?.map((tag, index) => {
                            return (
                                <li key={index} className="tag-default tag-pill tag-outline ng-binding ng-scope" ng-repeat="tag in ::$ctrl.article.tagList">
                                    {tag}
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <hr />

                <div className="article-actions">
                    <div className="article-meta">
                        <a href="profile.html"><img src={article.author?.image} /></a>
                        <div className="info">
                            <a href="" className="author">{article.author?.username}</a>
                            <span className="date">{moment(article.createdAt).format('DD/MM/YYYY')}</span>
                        </div>

                        {!isAuthor && <button
                            onClick={() => {
                                setFollowBtn(!followBtn)
                                handleFollow(followBtn)
                            }}
                            className="btn btn-sm btn-outline-secondary">
                            <i className="ion-plus-round"></i>
                            &nbsp;
                            {followBtn ? `Unfollow ${article.author?.username}` : `Follow ${article.author?.username}`}
                        </button>}
                        {isAuthor && <a className="btn btn-outline-secondary btn-sm" ui-sref="app.editor({ slug: $ctrl.article.slug })"
                            href={`/editor/${article.slug}`}>
                            <i className="ion-edit"></i> Edit Article
                        </a>}
                        &nbsp;
                        {!isAuthor && <button
                            onClick={() => {
                                setFavorite(!favorite)
                                handleFavorite(article.slug)
                            }}
                            className="btn btn-sm btn-outline-primary">
                            <i className="ion-heart"></i>
                            &nbsp;
                            {article.favorited ? favorite && `Unfavorite Article (${article.favoritesCount})` ||
                                !favorite && `Favorite Article (${article.favoritesCount - 1})` :
                                favorite && `Unfavorite Article (${article.favoritesCount + 1})` ||
                                !favorite && `Favorite Article (${article.favoritesCount})`}
                            <span className="counter"></span>
                        </button>}
                        {isAuthor && <button className="btn btn-outline-danger btn-sm" onClick={handleDeletaArticle}>
                            <i className="ion-trash-a"></i> Delete Article
                        </button>}
                    </div>
                </div>

                <div className="row">

                    <div className="col-xs-12 col-md-8 offset-md-2">

                        <form onSubmit={handleSubmit}

                            className="card comment-form">
                            <div className="card-block">
                                <textarea
                                    value={bodyComment}
                                    onChange={e => setBodyComment(e.target.value)}
                                    className="form-control"
                                    placeholder="Write a comment..." rows="3"></textarea>
                            </div>
                            <div className="card-footer">
                                <img src={localdata?.image} className="comment-author-img" />
                                <button type="submit" className="btn btn-sm btn-primary">
                                    Post Comment
                                </button>
                            </div>
                        </form>

                        {comments?.map((conmment) => {
                            return <CommentCard
                                setRenderComment={setRenderComment}
                                renderComment={renderComment}
                                username={conmment.author.username}
                                image={conmment.author.image}
                                body={conmment.body}
                                id={conmment.id}
                                createdAt={conmment.createdAt}
                                slug={slugComment}
                            />
                        })}

                    </div>

                </div>

            </div>

        </div>
    )
}
export default ArticleDetail;
