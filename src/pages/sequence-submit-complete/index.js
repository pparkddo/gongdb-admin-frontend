import { Link, useHistory } from "react-router-dom";
import "./index.css";

function SequenceSubmitComplete(props) {

  const history = useHistory();
  const message = props.location.state.message;
  const previousPath = props.location.state.previousPath;

  const moveToSequenceListPage = () => history.replace("/sequence");

  return (
    <div className="row con_wrap">
      {/*inner*/}
      <div className="container conbox">
        <div className="justify-content-center">
          <div className="col-auto">
            <p>{message}</p>
          </div>
        </div>

        <div class="row">
          <div className="col-sm-6 justify-content-center">
            <div className="col-auto">
              <button className="btn" onClick={moveToSequenceListPage}>
                공고 차수 목록 바로가기
              </button>
            </div>
          </div>
          <div className="col-sm-6 justify-content-center">
            <div className="col-auto">
              <Link to={previousPath} replace className="btn btn-link">입력 화면 바로가기</Link>
            </div>
          </div>
        </div>
      </div> 
      {/*inner*/}
    </div>  
  );
}

export default SequenceSubmitComplete;