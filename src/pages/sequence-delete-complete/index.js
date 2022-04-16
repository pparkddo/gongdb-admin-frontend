import { useHistory } from "react-router-dom";
import completeImage from "images/complete.png";
import css from "styled-jsx/css";

function SequenceDeleteComplete(props) {

  const history = useHistory();
  const message = props.location.state.message;

  const moveToSequenceListPage = () => history.replace("/sequence");

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="message-container col-auto">
          <img className="complete-image" src={completeImage} alt="complete" />
          <h3 className="complete-message">{message}</h3>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-auto">
          <button className="complete-button btn" onClick={moveToSequenceListPage}>
            공고 차수 목록으로
          </button>
        </div>
      </div>
      <style jsx>{styles}</style>
    </div>

  );
}

const styles = css`
  .message-container {
    text-align: center;
  }
  .complete-image {
    max-width: 200px;
  }
  .complete-message {
    font-weight: 700;
    margin: 60px;
  }
  .complete-button {
    font-size: 14px;
    padding: 14px 18px;
    border-radius: 8px;
    line-height: 20px;
    white-space: nowrap;
    color: #fff;
    background-color: #3182f6;
    cursor: pointer;
    text-decoration: none;
    transition: background .2s ease,color .1s ease;
    min-width: 205px;
  }
`;

export default SequenceDeleteComplete;