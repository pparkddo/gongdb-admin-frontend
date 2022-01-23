import { useHistory } from "react-router-dom";
import "./index.css";
import completeImage from "../../images/complete.png";


function AnnouncementDeleteComplete(props) {

  const history = useHistory();
  const message = props.location.state.message;

  const moveToAnnouncementListPage = () => history.replace("/announcement");

  return (
    <div className="con_wrap">
      {/*inner*/}
      <div className="container announcement-delete-complete">
        <div className="com-img">
          <img src={completeImage}/>
        </div>
        <div>
          <h1 className="compl-mes">{message}</h1>
        </div>
        <div className="button-wrap">
          <button className="btn" onClick={moveToAnnouncementListPage}>
            공고 목록으로
          </button>
        </div>
      </div>
      {/*inner*/}
    </div>  
  );
}

export default AnnouncementDeleteComplete;
