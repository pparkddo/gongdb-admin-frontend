import { useHistory } from "react-router";
import { Link } from "react-router-dom";

function AnnouncementSubmitComplete(props) {

  const history = useHistory();
  const message = props.location.state.message;
  const previousPath = props.location.state.previousPath;

  const moveToAnnouncementListPage = () => history.replace("/announcement");

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-auto">
          <p>{message}</p>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-auto">
          <button className="btn btn-primary" onClick={moveToAnnouncementListPage}>
            공고 목록으로
          </button>
        </div>
      </div>
      <div className="row justify-content-center mt-3">
        <div className="col-auto">
          <Link to={previousPath} replace className="btn btn-link">입력 화면으로</Link>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementSubmitComplete;
