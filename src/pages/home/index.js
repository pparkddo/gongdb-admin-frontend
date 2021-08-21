import { useState } from "react";
import "./index.css"

function Home() {

  const [companyName, setCompanyName] = useState("");
  const [sequence, setSequence] = useState("");
  const [receiptStartTimestamp, setReceiptStartTimestamp] = useState("");
  const [receiptEndTimestamp, setReceiptEndTimestamp] = useState("");
  const [link, setLink] = useState("");
  const [files, setFiles] = useState([]);

  const post = () => {
    const content = {
      companyName: companyName,
      sequence: sequence,
      receiptStartTimestamp: receiptStartTimestamp,
      receiptEndTimestamp: receiptEndTimestamp,
      link: link,
    }

    const formData = new FormData();
    formData.append("content", new Blob([JSON.stringify(content)], {type: "application/json"}));
    for (const file of files) {
      formData.append("files", file);
    }

    fetch("/api/sequence", {
        method: "POST",
        body: formData,
    }).then(console.log);
  };

  return (
    <div className="con_wrap">
      {/*inner*/}
      <div className="inner">
        
        <div className="contants">
          <ul className="con01 cf">
            <li>
              <h1>회사명</h1>
              <input type="text" onChange={e => setCompanyName(e.target.value)} />
            </li>
            <li>
              <h1>차수명</h1>
              <input type="text" onChange={e => setSequence(e.target.value)} />
            </li>
          </ul>

          <ul className="con02 cf">
            <li>
              <h1>접수시작일</h1>
              <input type="datetime-local" onChange={e => setReceiptStartTimestamp(e.target.value)} />
            </li>
            <li>  
              <h1>접수종료일</h1>
              <input type="datetime-local" onChange={e => setReceiptEndTimestamp(e.target.value)} />
            </li>  
          </ul>

          <ul className="con03 filebox cf">
            <li>
              <h1>링크</h1>
              <input type="text" onChange={e => setLink(e.target.value)} />
            </li>
            <li>
              <h1>첨부파일</h1>
              <label htmlFor="file">업로드</label>
              <input type="file" id="file" onChange={e => setFiles(e.target.files)} multiple />
            </li>
          </ul>

          <div>
            {files.length === 0 ? "none" : <p>{files[0].name + " 외 " + (files.length-1) + "개의 파일"}</p>}
          </div>

          <div className="con04">
            <button onClick={post}>차수 입력</button>
          </div>
        </div>

      </div>
      {/*inner*/}
    </div> 
    
  );
  
}


export default Home;
