import { useState } from "react";
import { useHistory } from "react-router";
import { fail } from "../../components/alert";
import SubmitButton from "../../components/submit-button";
import { fetchWrapper } from "../../helpers/fetch-wrapper";
import "./index.css";

/*부트스트랩*/

function Home() {

  const history = useHistory();

  const [companyName, setCompanyName] = useState("");
  const [sequence, setSequence] = useState("");
  const [receiptStartTimestamp, setReceiptStartTimestamp] = useState("");
  const [receiptEndTimestamp, setReceiptEndTimestamp] = useState("");
  const [link, setLink] = useState("");
  const [files, setFiles] = useState([]);
  const [isLoading, setLoading] = useState(false);

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

    setLoading(true);
    fetchWrapper.post("/api/sequence", formData)
      .then(data => history.replace("/sequence/submit-complete", {message: data.message}))
      .catch(handleError);
  };

  const handleError = error => {
    console.log(error);
    console.log(error.data);
    const errorContent = JSON.stringify(error);
    fail(errorContent);
    setLoading(false);
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
          <SubmitButton onClick={post} isLoading={isLoading}>차수 입력</SubmitButton>
        </div>

      </div>
      {/*inner*/}
    </div> 
    
  );
  
}


export default Home;
