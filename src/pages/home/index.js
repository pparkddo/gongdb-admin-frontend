import { useState } from "react";
import "./index.css"

/*부트스트랩*/

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
      <div className="container conbox">
        <ul className="row">
          <li className="col-xs-12 col-sm-6">
            <h1 class="col-12">회사명</h1>
            <input type="text" class="col-12" onChange={e => setCompanyName(e.target.value)} />
          </li>
          <li className="col-xs-12 col-sm-6">
            <h1 class="col-12">차수명</h1>
            <input type="text" class="col-12" onChange={e => setSequence(e.target.value)} />
          </li>
        </ul>

        <ul className="row">
          <li className="col-xs-12 col-sm-6">
            <h1 class="col-12">접수시작일</h1>
            <input type="datetime-local" class="col-12" onChange={e => setReceiptStartTimestamp(e.target.value)} />
          </li>
          <li className="col-xs-12 col-sm-6">
            <h1 class="col-12">접수종료일</h1>
            <input type="datetime-local" class="col-12" onChange={e => setReceiptEndTimestamp(e.target.value)} />
          </li>  
        </ul>

        <ul className="row flexbox filebox">
          <li className="col-xs-12 col-sm-6">
            <h1 class="col-12">링크</h1>
            <input type="text" class="col-12" onChange={e => setLink(e.target.value)} />
          </li>
          <li className="col-xs-12 col-sm-6">
            <h1 class="col-12">첨부파일</h1>
            <label htmlFor="file">업로드</label>
            <input type="file" id="file" class="col-12" onChange={e => setFiles(e.target.files)} multiple />
          </li>
        </ul>

        <div class="att_box">
          {files.length === 0 ? "none" : <p>{files[0].name + " 외 " + (files.length-1) + "개의 파일"}</p>}
        </div>

        <div className="con04 flexbox">
          <button onClick={post}>차수 입력</button>
        </div>

      </div>
      {/*inner*/}
    </div> 
    
  );
  
}


export default Home;
