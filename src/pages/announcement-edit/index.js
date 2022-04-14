import {useCallback, useEffect, useState} from "react";
import Spinner from "../../components/spinner";
import {fetchWrapper} from "../../helpers/fetch-wrapper";
import {fail} from "../../components/alert";
import {useHistory} from "react-router-dom";
import SubmitButton from "../../components/submit-button";
import "./index.css";

function AnnouncementEdit(props) {

  const id = props.match.params.id;
  const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const [positionName, setPositionName] = useState("");
  const [recruitType, setRecruitType] = useState("");
  const [recruitLevel, setRecruitLevel] = useState("");
  const [workingType, setWorkingType] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [headCount, setHeadCount] = useState("");
  const [rank, setRank] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [languageScores, setLanguageScores] = useState([]);
  const [notes, setNotes] = useState([]);
  const [isFetching, setFetching] = useState(false);

  const getAnnouncement = useCallback(id => {
    fetch(`/api/announcement/${id}`)
      .then(response => response.json())
      .then(setAnnouncement)
      .then(() => setLoading(false));
  }, []);

  const setAnnouncement = data => {
    setPositionName(data.position.positionName);
    setRecruitType(data.recruitType);
    setRecruitLevel(data.recruitLevel);
    setWorkingType(data.workingType);
    setDistrictName(data.districtName);
    setHeadCount(data.headCount);
    setRank(data.rank);
    setCertificates(data.certificates);
    setDepartments(data.departments);
    setSubjects(data.subjects.map(value => value.subjectName));
    setLanguageScores(
        data.languageScores.map(
            value => ({
                name: value.languageName,
                score: value.score,
                perfectScore: value.perfectScore,
            })
        ));
    setNotes(data.notes);
  };

  const put = () => {
    const content = {
      positionName: positionName,
      recruitType: recruitType,
      recruitLevel: recruitLevel,
      workingType: workingType,
      districtName: districtName,
      headCount: headCount,
      rank: rank,
      certificates: certificates,
      departments: departments,
      subjects: subjects,
      languageScores: languageScores,
      notes: notes,
    };

    setFetching(true);
    fetchWrapper.put(
      `/api/announcement/${id}`,
      JSON.stringify(content),
      {headers: {"Content-Type": "application/json;charset=utf8"}})
      .then(response => response.json())
      .then(data => history.replace("/announcement/submit-complete", {
        message: data.message,
        previousPath: document.location.pathname
      }))
      .catch(handleError);
  };

  const deleteAnnouncement = () => {
    setFetching(true);
    fetchWrapper.delete(`/api/announcement/${id}`)
      .then(response => response.json())
      .then(data => history.replace("/announcement/delete-complete", {
        message: data.message,
      }))
      .catch(handleError);
  };

  const handleError = error => {
    console.log(error, error.data);
    const errorContent = JSON.stringify(error);
    fail(errorContent);
    setFetching(false);
  };

  const renderCertificates = () => {
    return certificates.map((value, index) => (
      <div key={index}>
        <input className=""
          type="text"
          value={value}
          onChange={e => changeCertificate(index, e.target.value)} />
        <button onClick={() => deleteCertificate(index)} className="btn btn-primary mi-btn">-</button>
      </div>
    ));
  };

  const changeCertificate = (index, value) => {
    const newCertificates = [...certificates];
    newCertificates[index] = value;
    setCertificates(newCertificates);
  };

  const deleteCertificate = index => {
    const newCertificates = [...certificates];
    newCertificates.splice(index, 1);
    setCertificates(newCertificates);
  };

  const addCertificate = () => {
    setCertificates([...certificates, ""])
  };

  const renderDepartments = () => {
    return departments.map((value, index) => (
      <div key={index}>
        <input
          type="text"
          value={value}
          onChange={e => changeDepartment(index, e.target.value)} />
        <button onClick={() => deleteDepartment(index)} className="btn btn-primary mi-btn">-</button>
      </div>
    ));
  };

  const changeDepartment = (index, value) => {
    const newDepartments = [...departments];
    newDepartments[index] = value;
    setDepartments(newDepartments);
  };

  const deleteDepartment = index => {
    const newDepartments = [...departments];
    newDepartments.splice(index, 1);
    setDepartments(newDepartments);
  };

  const addDepartment = () => {
    setDepartments([...departments, ""]);
  };

  const renderSubjects = () => {
    return subjects.map((value, index) => (
      <div key={index}>
        <input
          type="text"
          value={value}
          onChange={e => changeSubject(index, e.target.value)} />
        <button onClick={() => deleteSubject(index)} className="btn btn-primary mi-btn">-</button>
      </div>
    ));
  };

  const changeSubject = (index, value) => {
    const newSubjects = [...subjects];
    newSubjects[index] = value;
    setSubjects(newSubjects);
  };

  const deleteSubject = index => {
    const newSubjects = [...subjects];
    newSubjects.splice(index, 1);
    setSubjects(newSubjects);
  };

  const addSubject = () => {
    setSubjects([...subjects, ""]);
  };

  const renderLanguageScores = () => {
    return languageScores.map((value, index) => (
      <div key={index}>
        <input
          type="text"
          name="name"
          value={value.name}
          onChange={e => changeLanguageScore(index, e.target.name, e.target.value)} />
        <input
          type="text"
          name="score"
          value={value.score}
          onChange={e => changeLanguageScore(index, e.target.name, e.target.value)} />
        <input
          type="text"
          name="perfectScore"
          value={value.perfectScore}
          onChange={e => changeLanguageScore(index, e.target.name, e.target.value)} />
        <button onClick={() => deleteLanguageScore(index)} className="btn btn-primary mi-btn">-</button>
      </div>
    ));
  };

  const changeLanguageScore = (index, name, value) => {
    const newLanguageScores = [...languageScores];
    newLanguageScores[index][name] = value;
    setLanguageScores(newLanguageScores);
  };

  const deleteLanguageScore = index => {
    const newLanguageScores = [...languageScores];
    newLanguageScores.splice(index, 1);
    setLanguageScores(newLanguageScores);
  };

  const addLanguageScore = () => {
    setLanguageScores([...languageScores, {name: "", score: "", perfectScore: ""}]);
  };

  const renderNotes = () => {
    return notes.map((value, index) => (
      <div key={index}>
        <input
          type="text"
          value={value}
          onChange={e => changeNote(index, e.target.value)} />
        <button onClick={() => deleteNote(index)} className="btn btn-primary mi-btn">-</button>
      </div>
    ));
  };

  const changeNote = (index, value) => {
    const newNotes = [...notes];
    newNotes[index] = value;
    setNotes(newNotes);
  };

  const deleteNote = index => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  const addNote = () => {
    setNotes([...notes, ""]);
  };

  useEffect(() => {
    getAnnouncement(id);
  }, [getAnnouncement, id]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="con_wrap AnnounceEdit">
      {/*inner*/}
      <div className="container conbox announcement-edit-wrap">
        <ul className="row">
          <li className="col-xs-12 col-sm-6">
            <h5>공고ID</h5>
            <input type="text" value={id} disabled />
          </li>
          <li className="col-xs-12 col-sm-6">
            <h5>직무명</h5>
            <input type="text" value={positionName} onChange={e => setPositionName(e.target.value)} />
          </li>
        </ul>
        <ul className="row">
          <li className="col-xs-12 col-sm-6">
            <h5>채용구분</h5>
            <input type="text" value={recruitType} onChange={e => setRecruitType(e.target.value)} />
          </li>
          <li className="col-xs-12 col-sm-6">
            <h5>지역명</h5>
            <input type="text" value={districtName} onChange={e => setDistrictName(e.target.value)} />
          </li>
        </ul>
        <ul className="row">
          <li className="col-xs-12 col-sm-6">
            <h5>인원수</h5>
            <input type="text" value={headCount} onChange={e => setHeadCount(e.target.value)} />
          </li>
          <li className="col-xs-12 col-sm-6">
            <h5>직급</h5>
            <input type="text" value={rank} onChange={e => setRank(e.target.value)} />
          </li>
        </ul>

        <ul className="row plus-btn-wrap">
          <li className="col-xs-12 col-sm-6">
            <h5>자격증</h5>
            {renderCertificates()}
            <button onClick={addCertificate} className="btn btn-primary">+</button>
          </li>
          <li className="col-xs-12 col-sm-6">
            <h5>학과</h5>
            {renderDepartments()}
            <button onClick={addDepartment} className="btn btn-primary">+</button>
          </li>
          <li className="col-xs-12 col-sm-6">
            <h5>과목</h5>
            {renderSubjects()}
            <button onClick={addSubject} className="btn btn-primary">+</button>
          </li>
          <li className="col-xs-12 col-sm-6">
            <h5>어학점수</h5>
            {renderLanguageScores()}
            <button onClick={addLanguageScore} className="btn btn-primary">+</button>
          </li>
          <li className="col-xs-12 col-sm-6">
            <h5>기타사항</h5>
            {renderNotes()}
            <button onClick={addNote} className="btn btn-primary">+</button>
          </li>
        </ul>

        <ul className="row btn-wrap">
          <li className="col-6" style={{textAlign: 'right'}}>
            <SubmitButton
              className="btn btn-primary min-100"
              onClick={put}
              isLoading={isFetching}
              useSpinner
              content="공고 수정"/>
          </li>
          <li className="col-6 delete-button-container">
            <SubmitButton
              className="btn btn-danger"
              onClick={deleteAnnouncement}
              isLoading={isFetching}
              content="삭제"/>
          </li>
        </ul>
      </div>
      {/*inner*/}
      <style jsx>{`
        .delete-button-container > :global(button > .submit-button-content) {
          color: #4e5968;
        }
      `}</style>
    </div>
  );
}



export default AnnouncementEdit;