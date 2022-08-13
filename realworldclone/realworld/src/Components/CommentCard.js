import moment from 'moment'
import getDataUser from '../localStorage';
import { apiDeleteComment } from '../apiService/apiComment';

function CommentCard(props) {
    let localdata = getDataUser()
    let isAuthor = false
    if (props.username === localdata.username) isAuthor = true
    const handleDelete = async () => {
        let res = await apiDeleteComment(props.slug, props.id)
        props.setRenderComment(!props.renderComment)
    }
    return (
        <comment key={props.id} ng-repeat="cmt in $ctrl.comments" data="cmt" delete-cb="$ctrl.deleteComment(cmt.id, $index)" className="ng-scope ng-isolate-scope"><div className="card">
            <div className="card-block">
                <p className="card-text ng-binding" ng-bind="::$ctrl.data.body">{props.body}</p>
            </div>
            <div className="card-footer">
                <a className="comment-author" ui-sref="app.profile.main({ username: $ctrl.data.author.username })" href={`/@${props.username}`}>
                    <img ng-src={"https://api.realworld.io/images/demo-avatar.png"} className="comment-author-img" src={props.image} />
                </a>
                &nbsp;
                <a className="comment-author ng-binding" ui-sref="app.profile.main({ username: $ctrl.data.author.username })" ng-bind="::$ctrl.data.author.username" href={`/@${props.username}`}>{props.username}</a>
                <span className="date-posted ng-binding" ng-bind="::$ctrl.data.createdAt | date: 'longDate' ">{moment(props.createdAt).format('DD/MM/YYYY')}</span>
                <span className="mod-options ng-hide" ng-show="$ctrl.canModify">
                    <i className="ion-trash-a" ng-click="$ctrl.deleteCb()"></i>
                </span>
                {isAuthor && <span
                    onClick={handleDelete}
                    style={{ cursor: 'pointer', color: 'red' }}
                    className="mod-options delete-author-comment" ng-show="$ctrl.canModify" >
                    Delete
                </span>}
            </div>
        </div>
        </comment>
    )
}
export default CommentCard;