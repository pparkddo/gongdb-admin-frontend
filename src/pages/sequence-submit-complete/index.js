import { Link, useHistory } from "react-router-dom";
import "./index.css";
import completeImage from "../../images/complete.png";

function SequenceSubmitComplete(props) {

  const history = useHistory();
  const message = props.location.state.message;
  const previousPath = props.location.state.previousPath;

  const moveToSequenceListPage = () => history.replace("/sequence");

  return (
    <div className="con_wrap">
      {/*inner*/}
      <div className="container sequence-submit-complete">
        <div className="com-img">
          <img src={completeImage} alt="complete" />
        </div>
        <div>
          <h3 className="compl-mes">{message}</h3>
        </div>
        <div className="row button-wrap">
          <div className="col-xs-12 col-sm-6">
            <button className="btn" onClick={moveToSequenceListPage}>
              차수 목록 바로가기
            </button>
          </div>
          <div className="col-xs-12 col-sm-6">
            <Link to={previousPath} replace className="btn btn-link">
              입력 화면 바로가기
            </Link>
          </div>
        </div>
      </div>
      {/*inner*/}
    </div>  
  );
}

export default SequenceSubmitComplete;