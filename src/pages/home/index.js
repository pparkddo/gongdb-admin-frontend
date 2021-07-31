import { useState } from "react";

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
      console.log(file);
      formData.append("files", file);
    }

    fetch("/api/sequence", {
        method: "POST",
        body: formData,
    }).then(console.log);
  };

  return (
    <div>
      <div>
        <label>회사명</label>
        <input type="text" onChange={e => setCompanyName(e.target.value)} />
      </div>
      <div>
        <label>차수명</label>
        <input type="text" onChange={e => setSequence(e.target.value)} />
      </div>
      <div>
        <label>접수시작일</label>
        <input type="datetime-local" onChange={e => setReceiptStartTimestamp(e.target.value)} />
      </div>
      <div>
        <label>접수종료일</label>
        <input type="datetime-local" onChange={e => setReceiptEndTimestamp(e.target.value)} />
      </div>
      <div>
        <label>링크</label>
        <input type="text" onChange={e => setLink(e.target.value)} />
      </div>
      <div>
        <label>첨부파일</label>
        <input type="file" onChange={e => setFiles(e.target.files)} multiple />
      </div>
      <div>
        <button onClick={post}>차수 입력</button>
      </div>
    </div>
  );
}

export default Home;
