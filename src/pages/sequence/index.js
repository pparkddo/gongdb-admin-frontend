import { useEffect, useState } from "react";
import Spinner from "../../components/spinner";
import completeImage from "../../images/complete.png";
import "./index.css";

function Sequence() {
  
  const [isLoading, setLoading] = useState(true);
  const [sequences, setSequences] = useState([]);

  const getSequences = () => {
    fetch("/api/sequence", {cache: "no-cache"})
      .then(response => response.json())
      .then(data => setSequences(data.content))
      .then(() => setLoading(false));
  };

  const renderSequence = sequence => {
    return (
      <div className="con_wrap sequence">
        <div className="container conbox">
          {/*inner*/}
          <div className="row table-wrap" style={{padding:'0 15px'}}>
            <h3>차수리스트</h3>
            <table className="col-xs-12">
              <colgroup className="colgroupW">
                <col style={{ width:'10%'}} />
                <col style={{ width:'90%'}} />
              </colgroup>
              <tr>
                <th><p>차수아이디</p></th>
                <td><p>{sequence.id}</p></td>
              </tr>
              <tr>
                <th><p>회사아이디</p></th>
                <td><p>{sequence.company.id}</p></td>
              </tr>
              <tr>
                <th><p>회사명</p></th>
                <td><p>{sequence.company.name}</p></td>
              </tr>
              <tr>
                <th><p>차수명</p></th>
                <td><p>{sequence.sequence}</p></td>
              </tr>
              <tr>
                <th><p>접수시작일</p></th>
                <td><p>{sequence.receiptStartTimestamp}</p></td>
              </tr>
              <tr>
                <th><p>접수종료일</p></th>
                <td><p>{sequence.receiptEndTimestamp}</p></td>
              </tr>
              <tr>
                <th><p>링크</p></th>
                <td><p>{sequence.link}</p></td>
              </tr>
              <tr>
                <th><p>첨부파일</p></th>
                <td><p>{sequence.files.map(renderFile)}</p></td>
              </tr>
              <tr>
                <th><p>작성일</p></th>
                <td><p>{sequence.createdTimestamp}</p></td>
              </tr>
            </table>
          </div>
          <div className="text-center">
            <a className="btn btn-primary" href={`/sequence/${sequence.id}/announcement`}>공고입력</a>
          </div>
          {/*inner*/}
        </div>
      </div>
    );
  };

  const renderFile = file => {
    return (
      <p>{file.id}, {file.fileName}</p>
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
          <img src={completeImage}/>
        </div>
        <h5>입력된 공고 차수가 없어요</h5>
      </div>
    )
  }
  
  return (
    <div>
      {sequences.map(each => renderSequence(each))}
    </div>
  );
}

export default Sequence;