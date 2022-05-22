import "./index.css";
import {saveAs} from 'file-saver';
import {useHistory} from "react-router-dom";
import {useState} from "react";
import {fetchWrapper} from "helpers/fetch-wrapper";
import {fail, success} from "components/alert";
import Spinner from "components/spinner";
import SubmitButton from "components/submit-button";
import useSequence from "services/sequence";
import dayjs from "dayjs";
import WorkingTypeSelect from "components/workingTypeSelect";
import RecruitLevelSelect from "components/recruitLevelSelect";

const dayFormat = "YYYY-MM-DDTHH:mm:ss";

function SequenceEdit(props) {

  const params = props.match.params;
  const sequenceId = params.id;

  const history = useHistory();
  const sequenceResponse = useSequence(sequenceId);
  const {sequence, mutate: mutateSequence, isLoading, isError} = sequenceResponse;

  const [files, setFiles] = useState([]);  // 새로 추가할 파일
  const [uploadedFiles, setUploadedFiles] = useState([]); // 기존에 들어있는 파일들
  const [isFetching, setFetching] = useState(false);

  const updateSequence = (key, value) => {
    return mutateSequence({...sequence, [key]: value}, false);
  }

  const put = () => {
    setFetching(true);
    fetchWrapper.put(`/api/sequence/${sequenceId}`, getFormData())
      .then(response => response.json())
      .then(data => history.replace("/sequence/submit-complete", {
          message: data.message,
          previousPath: document.location.pathname
        }))
      .catch(handleError);
  };

  const getFormData = () => {
    const content = {
      companyName: sequence.companyName || sequence.company.name,
      sequence: sequence.sequence,
      workingType: sequence.workingType,
      recruitLevel: sequence.recruitLevel,
      receiptStartTimestamp: sequence.receiptStartTimestamp,
      receiptEndTimestamp: sequence.receiptEndTimestamp,
      link: sequence.link,
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
    fetchWrapper.delete(`/api/sequence/${sequenceId}`)
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

  const renderFile = file => {
    return (
      <li key={file.id} className="mar-top">
        <SubmitButton
          className="btn btn-link btn-primary down-btn"
          onClick={() => download(file.id, file.fileName)}
          content={file.id}
          isLoading={isFetching} />
          <span className="ren-span">{file.fileName}</span>
        <SubmitButton
          className="btn btn-danger ren-file"
          onClick={() => deleteAttachment(sequenceId, file.id)}
          content="삭제"
          isLoading={isFetching} />
      </li>
    );
  };

  if (isError) {
    return <p>Error on fetching</p>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="con_wrap sequence-edit-wrap">
        {/*inner*/}
        <div className="container conbox">

          <ul className="row">
            <li className="col-xs-12 col-sm-6">
              <h5 className="col-12">회사명</h5>
              <input
                  type="text"
                  value={sequence.companyName || sequence.company.name}
                  onChange={e => updateSequence("companyName", e.target.value)}
              />
            </li>
            <li className="col-xs-12 col-sm-6">
              <h5 className="col-12">링크</h5>
              <input
                  type="text"
                  value={sequence.link}
                  onChange={e => updateSequence("link", e.target.value)}
              />
            </li>
          </ul>

          <ul className="row">
            <li className="col-xs-12 col-sm-6">
              <h5 className="col-12">차수명</h5>
              <input
                  type="text"
                  value={sequence.sequence}
                  onChange={e => updateSequence("sequence", e.target.value)}
              />
            </li>
            <li className="col-xs-12 col-sm-6">
              <h5 className="col-12">차수ID</h5>
              <input type="text" value={sequenceId} disabled />
            </li>
          </ul>

          <ul className="row">
            <li className="col-xs-12 col-sm-6">
              <h5 className="col-12">근무형태</h5>
              <WorkingTypeSelect
                  defaultValue={sequence.workingType}
                  onChange={(option) => updateSequence("workingType", option.workingType)}
              />
            </li>
            <li className="col-xs-12 col-sm-6">
              <h5 className="col-12">채용수준</h5>
              <RecruitLevelSelect
                  defaultValue={sequence.recruitLevel}
                  onChange={(option) => updateSequence("recruitLevel", option.recruitLevel)}
              />
            </li>
          </ul>

          <ul className="row">
            <li className="col-xs-12 col-sm-6">
              <h5 className="col-12">접수시작일</h5>
              <input
                  type="datetime-local"
                  value={dayjs(sequence.receiptStartTimestamp).format(dayFormat)}
                  onChange={e => updateSequence("receiptStartTimestamp", e.target.value)}
              />
            </li>
            <li className="col-xs-12 col-sm-6">
              <h5 className="col-12">접수종료일</h5>
              <input
                  type="datetime-local"
                  value={dayjs(sequence.receiptEndTimestamp).format(dayFormat)}
                  onChange={e => updateSequence("receiptEndTimestamp", e.target.value)}
              />
            </li>
          </ul>

          <ul className="row">
            <li className="col-xs-12 margin-bz">
              <h5>첨부파일</h5>
              <ul>
                {sequence.files.map(renderFile)}
              </ul>
            </li>
            <li className="col-xs-12">
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
            <li className="col-6 delete-button-container">
              <SubmitButton
                  className="btn btn-danger"
                  onClick={deleteSequence}
                  isLoading={isFetching}
                  content="삭제" />
            </li>

            <style jsx>{`
              .delete-button-container > :global(button > .submit-button-content) {
                color: #4e5968;
              }
            `}</style>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SequenceEdit; 