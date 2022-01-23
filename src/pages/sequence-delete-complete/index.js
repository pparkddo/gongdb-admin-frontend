import { useHistory } from "react-router-dom";

function SequenceDeleteComplete(props) {

  const history = useHistory();
  const message = props.location.state.message;

  const moveToSequenceListPage = () => history.replace("/sequence");

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-auto">
          <h1>{message}</h1>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-auto">
          <button className="btn btn-primary" onClick={moveToSequenceListPage}>
            공고 차수 목록으로
          </button>
        </div>
      </div>
    </div>
  );
}

export default SequenceDeleteComplete;