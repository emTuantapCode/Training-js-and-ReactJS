import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getDataUser from '../localStorage'
import { useLocation } from 'react-router-dom'
import { apiGetDataInput, apiCreateArticle, apiUpdateArticle } from "../apiService/apiEditor";

function Editor() {
  const localdata = getDataUser()
  let navigate = useNavigate()
  let location = useLocation()
  const pathName = location.pathname
  var mySlug = pathName.split("/editor");
  mySlug.splice(0, 1)
  const mySlugTex = String(mySlug)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [body, setBody] = useState('')
  const [tagList, setTagList] = useState([])
  const [tag, setTag] = useState('')
  const [invalid, setInvalid] = useState(false)
  const [invalidName, setInvalidName] = useState('')

  /** hàm xử lý lấy thông tin article và đổ vào input
 *  sản phẩm của anhtd 3-8
 */
  useEffect(() => {
    if (pathName === '/editor/new-article') return
    else {
      const getDataForInput = async () => {
        let res = await apiGetDataInput(mySlugTex)
        const data = res.data.article
        setTitle(data.title)
        setDescription(data.description)
        setBody(data.body)
        setTagList([...data.tagList])
      }
      getDataForInput();
    }
  }, [pathName])

  /** hàm xử lý thêm tag list
   *  sản phẩm của anhtd 2-8
   */
  const handlePushTag = (e) => {
    if (e.keyCode === 13) {
      setTagList([...tagList, tag])
      setTag('')
    }
  }
  /** hàm xử lý xóa tag list
   *  sản phẩm của anhtd 2-8
   */
  const handleDeleteTag = (e) => {
    var listTag = tagList
    const indexRemove = Number(e.target.id)
    listTag.splice(indexRemove, 1)
    setTagList([...listTag])
  }

  /** hàm xử lý chọn update hay tạo mới
   *  sản phẩm của anhtd 2-8
   */
  const handleChoiceService = () => {
    if (pathName === '/editor/new-article') {
      handleCreateArticle()
    }
    else {
      handleUpdateArticle()
    }
  }
  /** hàm xử lý tạo article
   *  sản phẩm của anhtd 2-8
   */
  const handleCreateArticle = async () => {
    setInvalid(false)
    const data = {
      "article": {
        "title": title,
        "description": description,
        "body": body,
        "tagList": tagList,
      }
    }
    if (data.article.title === '') {
      setInvalid(true)
      setInvalidName('Title')
    } else if (data.article.description === '') {
      setInvalid(true)
      setInvalidName('Description')
    } else if (data.article.body === '') {
      setInvalid(true)
      setInvalidName('Body')
    } else {
      let res = await apiCreateArticle(data)
      if (res.status === 200) navigate(`/articles/${res.data.article.slug}`)
    }
  }

  /** hàm xử lý update article
   *  sản phẩm của anhtd 2-8
   */
  const handleUpdateArticle = async () => {
    setInvalid(false)
    const data = {
      "article": {
        "title": title,
        "description": description,
        "body": body,
        "tagList": tagList,
      }
    }
    /*  Hàm tạo mới article url = base api+/articles
        Tạo bởi anhtd 3-8
    */
    if (data.article.title === '') {
      setInvalid(true)
      setInvalidName('Title')
    } else if (data.article.description === '') {
      setInvalid(true)
      setInvalidName('Description')
    } else if (data.article.body === '') {
      setInvalid(true)
      setInvalidName('Body')
    } else {
      let res = await apiUpdateArticle(data, mySlugTex)
      if (res.status === 200) navigate(`/articles/${res.data.article.slug}`)
    }
  }

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">

          <div className="col-md-10 offset-md-1 col-xs-12">

            <ul className="error-messages">
              {invalid && <li> {invalidName} can't be blank</li>}

            </ul>

            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    type="text" className="form-control form-control-lg" placeholder="Article Title" />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    type="text" className="form-control" placeholder="What's this article about?" />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    className="form-control" rows="8"
                    placeholder="Write your article (in markdown)"></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    value={tag}
                    onChange={e => setTag(e.target.value)}
                    onKeyDown={handlePushTag}
                    type="text" className="form-control" placeholder="Enter tags" />
                  <div className="tag-list">
                    {tagList?.map((tag, index) => {
                      return (
                        <span ng-repeat="tag in $ctrl.article.tagList" className="tag-default tag-pill ng-binding ng-scope" key={index}>
                          <i onClick={handleDeleteTag} id={index} className="ion-close-round" ng-click="$ctrl.removeTag(tag)">X</i>
                          {tag}
                        </span>
                      )
                    })}
                  </div>
                </fieldset>
                <button onClick={handleChoiceService} className="btn btn-lg pull-xs-right btn-primary" type="button">
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}
export default Editor;
