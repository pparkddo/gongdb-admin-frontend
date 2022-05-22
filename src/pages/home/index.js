import {useState} from "react";
import {useHistory} from "react-router-dom";
import {fail} from "components/alert";
import SubmitButton from "components/submit-button";
import WorkingTypeSelect from "components/workingTypeSelect";
import RecruitLevelSelect from "components/recruitLevelSelect";
import {fetchWrapper} from "helpers/fetch-wrapper";
import "./index.css";

/*부트스트랩*/

function Home() {

  const history = useHistory();

  const [companyName, setCompanyName] = useState("");
  const [sequence, setSequence] = useState("");
  const [receiptStartTimestamp, setReceiptStartTimestamp] = useState("");
  const [receiptEndTimestamp, setReceiptEndTimestamp] = useState("");
  const [workingType, setWorkingType] = useState("");
  const [recruitLevel, setRecruitLevel] = useState("");
  const [link, setLink] = useState("");
  const [files, setFiles] = useState([]);
  const [isFetching, setFetching] = useState(false);

  const post = () => {
    const content = {
      companyName: companyName,
      sequence: sequence,
      receiptStartTimestamp: receiptStartTimestamp,
      receiptEndTimestamp: receiptEndTimestamp,
      workingType: workingType,
      recruitLevel: recruitLevel,
      link: link,
    }

    const formData = new FormData();
    formData.append("content", new Blob([JSON.stringify(content)], {type: "application/json"}));
    for (const file of files) {
      formData.append("files", file);
    }

    setFetching(true);
    fetchWrapper.post("/api/sequence", formData)
      .then(response => response.json())
      .then(data => history.replace("/sequence/submit-complete", {
          message: data.message,
          previousPath: document.location.pathname
        }))
      .catch(handleError);
  };

  const handleError = error => {
    console.log(error, error.data);
    const errorContent = JSON.stringify(error);
    fail(errorContent);
    setFetching(false);
  };

  const renderFiles = (files) => {
    if (files.length === 0) {
      return null;
    }
    return Array.from(files).map(renderFile);
  };

  const renderFile = (file, index) => {
    return (
        <div className="att_box col-9" key={index}>
           <p>{file.name}</p>
        </div>
    );
  };

  return (
    <div className="con_wrap">
      {/*inner*/}
      <div className="container conbox">
        <ul className="row">
          <li className="col-xs-12 col-sm-6">
            <h5 className="col-12">회사명</h5>
            <input type="text" className="col-12" onChange={e => setCompanyName(e.target.value)} />
          </li>
          <li className="col-xs-12 col-sm-6">
            <h5 className="col-12">차수명</h5>
            <input type="text" className="col-12" onChange={e => setSequence(e.target.value)} />
          </li>
        </ul>

        <ul className="row">
          <li className="col-xs-12 col-sm-6">
            <h5 className="col-12">접수시작일</h5>
            <input type="datetime-local" className="col-12" onChange={e => setReceiptStartTimestamp(e.target.value)} />
          </li>
          <li className="col-xs-12 col-sm-6">
            <h5 className="col-12">접수종료일</h5>
            <input type="datetime-local" className="col-12" onChange={e => setReceiptEndTimestamp(e.target.value)} />
          </li>
        </ul>

        <ul className="row">
          <li className="col-xs-12 col-sm-6">
            <h5 className="col-12">근무형태</h5>
            <WorkingTypeSelect onChange={(option) => setWorkingType(option.workingType)} />
          </li>
          <li className="col-xs-12 col-sm-6">
            <h5 className="col-12">채용수준</h5>
            <RecruitLevelSelect onChange={(option) => setRecruitLevel(option.recruitLevel)} />
          </li>
        </ul>

        <ul className="row flexbox filebox">
          <li className="col-xs-12">
            <h5 className="col-12">링크</h5>
            <input type="text" className="col-12" onChange={e => setLink(e.target.value)} />
          </li>
        </ul>

        <ul className="row flexbox filebox">
          <li className="col-xs-12">
            <h5 className="col-12">첨부파일</h5>
            <label htmlFor="file" className="col-xs-12 buttonFile">+</label>
            <input type="file" id="file" className="col-xs-12" onChange={e => setFiles(e.target.files)} multiple />
            {renderFiles(files)}
          </li>

        </ul>
        <div className="text-center">
          <SubmitButton onClick={post} isLoading={isFetching} useSpinner>차수 입력</SubmitButton>
        </div>

      </div>
      {/*inner*/}
    </div>

  );

}


export default Home;
