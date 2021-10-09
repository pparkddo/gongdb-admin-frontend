import { saveAs } from 'file-saver';
import { useHistory } from "react-router";
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
    <div>
      <div>
        <label>차수ID</label>
        <input type="text" value={data.id} disabled />
      </div>
      <div>
        <label>회사명</label>
        <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} />
      </div>
      <div>
        <label>차수명</label>
        <input type="text" value={sequence} onChange={e => setSequence(e.target.value)} />
      </div>
      <div>
        <label>접수시작일</label>
        <input type="datetime-local" value={receiptStartTimestamp} onChange={e => setReceiptStartTimestamp(e.target.value)} />
      </div>
      <div>
        <label>접수종료일</label>
        <input type="datetime-local" value={receiptEndTimestamp} onChange={e => setReceiptEndTimestamp(e.target.value)} />
      </div>
      <div>
        <label>링크</label>
        <input type="text" value={link} onChange={e => setLink(e.target.value)} />
      </div>
      <div>
        <label>첨부파일</label>
        <ul>
          {uploadedFiles.map(renderFile)}
        </ul>
        <input type="file" onChange={e => setFiles(e.target.files)} multiple />
      </div>
      <div>
        <SubmitButton
          className="btn btn-primary"
          onClick={put}
          isLoading={isFetching}
          content="차수 수정" />
        <SubmitButton
          className="btn btn-danger"
          onClick={deleteSequence}
          isLoading={isFetching}
          content="삭제" />
      </div>
    </div>
  );

  const renderFile = file => {
    return (
      <li key={file.id}>
        <SubmitButton
          className="btn btn-link"
          onClick={() => download(file.id, file.fileName)}
          content={file.id}
          isLoading={isFetching} />
        <span>: {JSON.stringify(file)} </span>
        <SubmitButton
          className="btn btn-danger"
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