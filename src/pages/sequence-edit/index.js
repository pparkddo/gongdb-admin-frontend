import "./index.css";
import { saveAs } from 'file-saver';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchWrapper } from "../../helpers/fetch-wrapper";
import { fail, success } from "../../components/alert";
import Spinner from "../../components/spinner";
import SubmitButton from "../../components/submit-button";


function SequenceEdit(props) {

  const params = props.match.params;
  const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [companyName, setCompanyName] = useState("");
  const [sequence, setSequence] = useState("");
  const [receiptStartTimestamp, setReceiptStartTimestamp] = useState("");
  const [receiptEndTimestamp, setReceiptEndTimestamp] = useState("");
  const [link, setLink] = useState("");
  const [files, setFiles] = useState([]);  // 새로 추가할 파일
  const [uploadedFiles, setUploadedFiles] = useState([]); // 기존에 들어있는 파일들
  const [isFetching, setFetching] = useState();

  const getData = sequenceId => {
    fetch(`/api/sequence/${sequenceId}`)
      .then(response => response.json())
      .then(data => setData(data))
      .then(() => setLoading(false));
  };

  const put = () => {
    setFetching(true);
    fetchWrapper.put(`/api/sequence/${data.id}`, getFormData())
      .then(response => response.json())
      .then(data => history.replace("/sequence/submit-complete", {
          message: data.message,
          previousPath: document.location.pathname
        }))
      .catch(handleError);
  };

  const getFormData = () => {
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

    return formData;
  };

  const deleteSequence = () => {
    setFetching(true);
    fetchWrapper.delete(`/api/sequence/${data.id}`)
      .then(response => response.json())
      .then(data => history.replace("/sequence/delete-complete", {
          message: data.message,
        }))
      .catch(handleError);
  };

  const download = (fileId, fileName) => {
    setFetching(true);
    fetchWrapper.get(`/api/file/${fileId}`)
      .then(response => response.blob())
      .then(blob => saveAs(blob, fileName))
      .then(() => setFetching(false))
      .catch(handleError);
  };

  const deleteAttachment = (sequenceId, fileId) => {
    fetchWrapper.delete(`/api/sequence/${sequenceId}/attachment/${fileId}`)
      .then(response => response.json())
      .then(data => success(data.message))
      .then(() => setUploadedFiles(uploadedFiles.filter(value => value.id !== fileId)))
      .catch(handleError);
  };

  const handleError = error => {
    console.log(error, error.data);
    const errorContent = JSON.stringify(error);
    fail(errorContent);
    setFetching(false);
  };

  const renderForm = () => (
    <div className="con_wrap sequence-edit-wrap">
      {/*inner*/}
      <div className="container conbox">

        <ul className="row">       
          <li className="col-xs-12 col-sm-6">
            <h5 class="col-12">회사명</h5>
            <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} />
          </li>
          <li className="col-xs-12 col-sm-6">
            <h5 class="col-12">링크</h5>
            <input type="text" value={link} onChange={e => setLink(e.target.value)} />
          </li>
        </ul>

        <ul className="row">
          <li className="col-xs-12 col-sm-6">
            <h5 class="col-12">차수명</h5>
            <input type="text" value={sequence} onChange={e => setSequence(e.target.value)} />
          </li>
         <li className="col-xs-12 col-sm-6">
            <h5 class="col-12">차수ID</h5>
            <input type="text" value={data.id} disabled />
          </li>
        </ul>

        <ul className="row">
          <li className="col-xs-12 col-sm-6">
            <h5 class="col-12">접수시작일</h5>
            <input type="datetime-local" value={receiptStartTimestamp} onChange={e => setReceiptStartTimestamp(e.target.value)} />
          </li>
          <li className="col-xs-12 col-sm-6">
            <h5 class="col-12">접수종료일</h5>
            <input type="datetime-local" value={receiptEndTimestamp} onChange={e => setReceiptEndTimestamp(e.target.value)} />
          </li>
        </ul>

        <ul class="row">
          <li className="col-xs-12 margin-bz">
            <h5>첨부파일</h5>
            {uploadedFiles.map(renderFile)}
          </li>
          <li class="col-xs-12">
            <input type="file" onChange={e => setFiles(e.target.files)} multiple />
          </li>
        </ul>  

        <ul className="row btn-wrap">
          <li className="col-6" style={{textAlign: 'right'}}>
            <SubmitButton
              className="btn btn-primary"
              onClick={put}
              isLoading={isFetching}
              content="차수 수정" />
          </li> 
          <li className="col-6">
          <SubmitButton
            className="btn btn-danger"
            onClick={deleteSequence}
            isLoading={isFetching}
            content="삭제" />
          </li>
        </ul>
      </div>
    </div>
  );

  const renderFile = file => {
    return (
      <li key={file.id} className="mar-top">
        <SubmitButton
          className="btn btn-link btn-primary down-btn"
          onClick={() => download(file.id, file.fileName)}
          content={file.id}
          isLoading={isFetching} />
          <span className="ren-span">: {JSON.stringify(file)} </span>
        <SubmitButton
          className="btn btn-danger ren-file"
          onClick={() => deleteAttachment(data.id, file.id)}
          content="삭제"
          isLoading={isFetching} />
      </li>
    );
  };

  useEffect(() => {
    const sequenceId = params.id;
    getData(sequenceId);
  }, [params]);

  useEffect(() => {
    if (!data) {
      return;
    } 
    setCompanyName(data.company.name);
    setSequence(data.sequence);
    setReceiptStartTimestamp(data.receiptStartTimestamp);
    setReceiptEndTimestamp(data.receiptEndTimestamp);
    setLink(data.link);
    setUploadedFiles(data.files);
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {data && renderForm()}
    </div>
  );
}

export default SequenceEdit; 