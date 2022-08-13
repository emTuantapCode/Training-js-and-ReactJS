import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import getDataUser from '../localStorage'
import ArticleCard from '../Components/Articlecard';
import { handleFollow } from '../apiService/apiFollowing';
import { apiGetProfile } from '../apiService/apiUser';
import { apiGetMyFavoriteArticle, apiGetMyArticle } from '../apiService/apiArticles';

function Profiles() {
  const localdata = getDataUser()
  const [loading, setLoading] = useState(true)
  const [isAuthor, setIsAuthor] = useState(false)
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [image, setImage] = useState('')
  const [customUsername, setCustomUsername] = useState(null)
  const [articles, setArticles] = useState([])
  const [followBtn, setFollowBtn] = useState(false)
  const [tab, setTab] = useState(null)
  let location = useLocation()
  const pathName = location.pathname
  var myPathName = pathName.split("/@");
  myPathName.splice(0, 1)
  const myLocalPathName = localdata?.username?.replace(" ", "%20")
  /** hàm xử lý lấy thông tin profile
 *  sản phẩm của anhtd 3-8
 */
  useEffect(() => {
    if (String(myPathName) === myLocalPathName) setIsAuthor(true)
    const getProfile = async () => {
      let res = await apiGetProfile(String(myPathName))
      const profile = res.data.profile
      setUsername(profile.username)
      setBio(profile.bio)
      setImage(profile.image)
      setCustomUsername(profile.username?.replace(" ", "+"))
      setFollowBtn(profile.following)
      setTab('tab1')
    }
    getProfile()
  }, [pathName])
  /** hàm xử lý lấy thông tin article
 *  sản phẩm của anhtd 3-8
 * cập nhật 5-8
 */
  useEffect(() => {
    if (customUsername) {
      if (tab === 'tab1') {
        const getMyArticle = async () => {
          let res = await apiGetMyArticle(customUsername)
          setArticles([...res.data.articles])
          setLoading(false)
        }
        getMyArticle()
      } else if (tab === 'tab2') {
        const getMyFavoriteArticle = async () => {
          let res = await apiGetMyFavoriteArticle(customUsername)
          setArticles([...res.data.articles])
          setLoading(false)
        }
        getMyFavoriteArticle()
      }
    }
  }, [tab])
  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">

            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={image} className="user-img" />
              <h4>{username}</h4>
              <p style={{
                maxWidth: "400px",
                overflowWrap: "break-word",
                maxHeight: '60px',
                overflow: 'auto'
              }}>
                {bio}
              </p>

              {isAuthor && <a ui-sref="app.settings" className="btn btn-sm btn-outline-secondary action-btn" ng-show="$ctrl.isUser" href="/settings">
                <i className="ion-gear-a"></i>  Edit Profile Settings
              </a>}
              {!isAuthor && <button
                onClick={() => {
                  setFollowBtn(!followBtn)
                  handleFollow(followBtn)
                }}
                className="btn btn-sm action-btn ng-binding btn-outline-secondary">
                <i className="ion-plus-round"></i>
                &nbsp;
                {followBtn ? `Unfollow ${username}` : `Follow ${username}`}
              </button>}

            </div>

          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a
                    style={{ cursor: 'pointer' }}
                    className={`nav-link ${tab === 'tab1' && 'active'}`} onClick={() => {
                      setTab('tab1')
                      setLoading(true)
                      setArticles([])
                    }} >My Articles</a>
                </li>
                <li className="nav-item">
                  <a
                    style={{ cursor: 'pointer' }}
                    className={`nav-link ${tab === 'tab2' && 'active'}`} onClick={() => {
                      setTab('tab2')
                      setLoading(true)
                      setArticles([])
                    }}>Favorited Articles</a>
                </li>
              </ul>
            </div>
            {loading && <div style={{
              textAlign: 'left',
              marginTop: '24px'
            }}>Loading articles ...</div>}

            {articles?.map((article, index) => {
              return (<div key={index}>
                <ArticleCard
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
              </div>)

            })
            }
            {articles.length === 0 && !loading && <div className="article-preview" ng-show="!$ctrl.loading &amp;&amp; !$ctrl.list.length">
              No articles are here... yet.
            </div>
            }
          </div>

        </div>
      </div>

    </div>
  )
}
export default Profiles;