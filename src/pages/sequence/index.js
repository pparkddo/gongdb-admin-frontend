import { useEffect, useState } from "react";
import Spinner from "../../components/spinner";
import completeImage from "../../images/pencil.png";
import "./index.css";
import dayjs from "dayjs";

const formatTimestamp = (value) => {
  return dayjs(value).format("YYYY-MM-DD HH:mm");
};

function Sequence() {
  
  const [isLoading, setLoading] = useState(true);
  const [sequences, setSequences] = useState([]);

  const getSequences = () => {
    fetch("/api/sequence", {cache: "no-cache"})
      .then(response => response.json())
      .then(data => setSequences(data.content))
      .then(() => setLoading(false));
  };

  const renderSequence = (sequence, index) => {
    return (
      <div className="con_wrap sequence" key={index}>
        <div className="container conbox">
          {/*inner*/}
          <div className="row table-wrap" style={{padding:'0 15px'}}>
            <h3 style={{ padding:'0', width:'auto'}}>
              {sequence.company.name} {sequence.sequence}
            </h3>
            <span style={{width:'auto'}}>
              <a href={`/sequence/${sequence.id}`}>
                < img className="editImg" src={completeImage} />
              </a>
            </span>
            <table className="col-xs-12">
              <colgroup className="colgroupW">
                <col style={{ width:'10%'}} />
                <col style={{ width:'90%'}} />
              </colgroup>
              <tbody>
                <tr>
                  <th><p>차수아이디</p></th>
                  <td><p>{sequence.id}</p></td>
                </tr>
                <tr>
                  <th><p>근무유형</p></th>
                  <td><p>{sequence.workingType}</p></td>
                </tr>
                <tr>
                  <th><p>채용수준</p></th>
                  <td><p>{sequence.recruitLevel}</p></td>
                </tr>
                <tr>
                  <th><p>접수시작일</p></th>
                  <td>
                    <p>{formatTimestamp(sequence.receiptStartTimestamp)}</p>
                  </td>
                </tr>
                <tr>
                  <th><p>접수종료일</p></th>
                  <td>
                    <p>{formatTimestamp(sequence.receiptEndTimestamp)}</p>
                  </td>
                </tr>
                <tr>
                  <th><p>링크</p></th>
                  <td><p>{sequence.link}</p></td>
                </tr>
                <tr>
                  <th><p>첨부파일</p></th>
                  <td>{sequence.files.map(renderFile)}</td>
                </tr>
                <tr>
                  <th><p>작성일</p></th>
                  <td><p>{formatTimestamp(sequence.createdTimestamp)}</p></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-center">
            <a className="btn btn-primary mx-1" href={`/sequence/${sequence.id}/announcement`}>공고입력</a>
            <a className="btn btn-primary mx-1" href={`/sequence/${sequence.id}/examination-schedule`}>전형일정입력</a>
            <a className="btn btn-primary mx-1" href={`/sequence/${sequence.id}/cover-letter`}>자소서입력</a>
          </div>
          {/*inner*/}
          <style jsx>{`
            .delete-button-container > :global(button > .submit-button-content) {
              color: #333;
            }
          `}</style>
        </div>
      </div>
    );
  };

  const renderFile = file => {
    return (
      <p key={file.id}>{file.id}, {file.fileName}</p>
    );
  };

  useEffect(() => {
    getSequences();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (sequences.length === 0) {
    return (
      <div className="text-center">
        <div className="com-img">
          <img src={completeImage} alt="complete" />
        </div>
        <h5>입력된 공고 차수가 없어요</h5>
      </div>
    )
  }
  
  return (
    <div>
      {sequences.map(renderSequence)}
    </div>
  );
}

export default Sequence;