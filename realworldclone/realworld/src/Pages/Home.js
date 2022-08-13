import { useEffect, useState } from "react";
import './App.css'
import getDataUser from "../localStorage";
import ArticleCard from '../Components/Articlecard';
import { apiTagLogined, apiTagLogouted, apiTagInfo, apiTagInfoGuest } from "../apiService/apiTag";
import { apiGetYourFeed, apiGetGlobalFeed } from "../apiService/apiArticles";
function Home() {
    const [tags, setTags] = useState(null)
    const [tagIsShow, setTagsIsShow] = useState(null)
    const [tab, setTab] = useState('tab2')
    const [feedArticles, setFeedArticles] = useState(null)

    let localdata = getDataUser()
    /** hàm xử lý lấy tag
        *  sản phẩm của anhtd 4-8
        */
    useEffect(() => {
        const getTag = async () => {
            if (localdata) {
                let res = await apiTagLogined()
                setTags([...res.data.tags])
            } else {
                let res = await apiTagLogined()
                setTags([...res.data.tags])
            }
        }
        getTag()
    }, [])
    /** hàm xử lý lấy thông tin tag
        *  sản phẩm của anhtd 4-8
        */
    useEffect(() => {
        if (tagIsShow === null) return
        const getTagInfo = async () => {
            if (localdata) {
                let res = await apiTagInfo(tagIsShow)
                setFeedArticles([...res.data.articles])
            } else {
                let res = await apiTagInfo(tagIsShow)
                setFeedArticles([...res.data.articles])
            }
        }
        getTagInfo()
    }, [tagIsShow])
    /** hàm xử lý lấy thông tin feed
        *  sản phẩm của anhtd 4-8
        */
    useEffect(() => {
        if (localdata) {
            if (tab === 'tab1') {
                const getYourFeed = async () => {
                    let res = await apiGetYourFeed()
                    setFeedArticles([...res.data.articles])
                }
                getYourFeed()
            }
            else if (tab === 'tab2') {
                const getGlobalFeed = async () => {
                    let res = await apiGetGlobalFeed()
                    setFeedArticles([...res.data.articles])
                }
                getGlobalFeed()
            }
        } else {
            const getGlobalFeed = async () => {
                let res = await apiGetGlobalFeed()
                setFeedArticles([...res.data.articles])
            }
            getGlobalFeed()
        }

    }, [tab])
    return (
        <div className="home-page">

            <div className="banner">
                <div className="container">
                    <h1 className="logo-font">conduit</h1>
                    <p>A place to share your knowledge.</p>
                </div>
            </div>

            <div className="container page">
                <div className="row">

                    <div className="col-md-9">

                        <div className="feed-toggle">
                            <ul className="nav nav-pills outline-active">
                                {localdata && <li
                                    style={{ cursor: 'pointer' }}
                                    className="nav-item">
                                    <a className={`nav-link ${tab === 'tab1' && tagIsShow === null && 'active'}`}
                                        onClick={() => {
                                            setTab('tab1')
                                            setFeedArticles(null)
                                            setTagsIsShow(null)
                                        }}
                                    >Your Feed</a>
                                </li>}
                                <li
                                    style={{ cursor: 'pointer' }}
                                    className="nav-item">
                                    <a className={`nav-link ${tab === 'tab2' && tagIsShow === null && 'active'}`}
                                        onClick={() => {
                                            setTab('tab2')
                                            setFeedArticles(null)
                                            setTagsIsShow(null)
                                        }}
                                    >Global Feed</a>
                                </li>
                                <li
                                    style={{ cursor: 'pointer' }}
                                    className={`nav-item ${tagIsShow === null && 'hide'}`} >
                                    <a className="nav-link active ng-binding">
                                        # {tagIsShow}
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {feedArticles !== null && feedArticles?.map((article, index) => {
                            return <ArticleCard
                                index={index}
                                image={article.author?.image}
                                username={article.author?.username}
                                time={article.createdAt}
                                favoritesCount={article.favoritesCount}
                                slug={article.slug}
                                title={article.title}
                                description={article.description}
                                tagList={article.tagList}
                                favorite={article.favorited}
                            />
                        })
                        }
                        {feedArticles !== null && feedArticles.length === 0 && <div
                            className="article-preview"
                            ng-show="!$ctrl.loading &amp;&amp; !$ctrl.list.length">
                            No articles are here... yet.
                        </div>
                        }
                        {feedArticles === null && <div style={{
                            textAlign: 'left',
                            marginTop: '24px'
                        }}>Loading articles ...</div>}

                    </div>

                    <div className="col-md-3">
                        <div className="sidebar">
                            <p>Popular Tags</p>

                            <div className="tag-list">
                                {tags?.map((tag, index) => {
                                    return (
                                        <a
                                            key={`tag-${index}`}
                                            className="tag-pill tag-default"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                setTagsIsShow(tag)
                                                setFeedArticles(null)
                                                setTab('tag')
                                            }}
                                        >{tag}</a>
                                    )
                                })}

                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
export default Home;
