import { useEffect, useState } from "react";
import { saveAs } from 'file-saver';

function SequenceEdit(props) {

  const params = props.match.params;
  const [data, setData] = useState();
  const [companyName, setCompanyName] = useState("");
  const [sequence, setSequence] = useState("");
  const [receiptStartTimestamp, setReceiptStartTimestamp] = useState("");
  const [receiptEndTimestamp, setReceiptEndTimestamp] = useState("");
  const [link, setLink] = useState("");
  const [files, setFiles] = useState([]);  // 새로 추가할 파일
  const [uploadedFiles, setUploadedFiles] = useState([]); // 기존에 들어있는 파일들

  const getData = sequenceId => {
    fetch(`/api/sequence/${sequenceId}`)
      .then(response => response.json())
      .then(data => setData(data));
  };

  const put = () => {
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

    fetch(`/api/sequence/${data.id}`, {
        method: "PUT",
        body: formData,
    }).then(console.log);
  };

  const deleteSequence = () => {
    fetch(`/api/sequence/${data.id}`, {
        method: "DELETE"
    }).then(console.log);
  };

  const download = (fileId, fileName) => {
    fetch(`/api/file/${fileId}`)
      .then(response => response.blob())
      .then(blob => saveAs(blob, fileName));
  };

  const handleDeleteFile = fileId => {
    deleteAttachment(data.id, fileId);
    setUploadedFiles(uploadedFiles.filter(value => value.id !== fileId));
  };

  const deleteAttachment = (sequenceId, fileId) => {
    fetch(`/api/sequence/${sequenceId}/attachment/${fileId}`, {
      method: "DELETE" 
    }).then(console.log);
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
        <button onClick={put}>차수 수정</button>
        <button onClick={deleteSequence}>삭제</button>
      </div>
    </div>
  );

  const renderFile = file => {
    return (
      <li key={file.id}>
        <button onClick={() => download(file.id, file.fileName)}>{file.id}</button>: {JSON.stringify(file)}
        <button onClick={() => handleDeleteFile(file.id)}>삭제</button>
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

  return (
    <div>
      {data && renderForm()}
    </div>
  );
}

export default SequenceEdit; 