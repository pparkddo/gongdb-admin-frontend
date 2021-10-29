import { useHistory } from "react-router-dom";

function AnnouncementDeleteComplete(props) {

  const history = useHistory();
  const message = props.location.state.message;

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
    </div>
  );
}

export default AnnouncementDeleteComplete;
