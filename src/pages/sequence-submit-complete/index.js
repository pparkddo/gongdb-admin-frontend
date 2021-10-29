import { Link, useHistory } from "react-router-dom";

function SequenceSubmitComplete(props) {

  const history = useHistory();
  const message = props.location.state.message;
  const previousPath = props.location.state.previousPath;

  const moveToSequenceListPage = () => history.replace("/sequence");

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-auto">
          <p>{message}</p>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-auto">
          <button className="btn btn-primary" onClick={moveToSequenceListPage}>
            공고 차수 목록으로
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

export default SequenceSubmitComplete;