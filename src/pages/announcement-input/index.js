import { useState } from "react";

function AnnouncementInput(props) {

  const id = props.match.params.id;
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

  const post = () => {
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

    fetch(`/api/sequence/${id}/announcement`, {
        method: "POST",
        body: JSON.stringify(content),
        headers: {"Content-Type": "application/json;charset=utf8"}
    }).then(console.log);
  };

  const renderCertificates = () => {
    return certificates.map((value, index) => (
      <div key={index}>
        <input
          type="text"
          value={value}
          onChange={e => changeCertificate(index, e.target.value)} />
        <button onClick={() => deleteCertificate(index)}>-</button>
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
        <button onClick={() => deleteDepartment(index)}>-</button>
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
        <button onClick={() => deleteSubject(index)}>-</button>
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
        <button onClick={() => deleteLanguageScore(index)}>-</button>
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
        <button onClick={() => deleteNote(index)}>-</button>
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

  return (
    <div>
      <div>
        <label>직무명</label>
        <input type="text" value={positionName} onChange={e => setPositionName(e.target.value)} />
      </div>
      <div>
        <label>채용구분</label>
        <input type="text" value={recruitType} onChange={e => setRecruitType(e.target.value)} />
      </div>
      <div>
        <label>채용수준</label>
        <input type="text" value={recruitLevel} onChange={e => setRecruitLevel(e.target.value)} />
      </div>
      <div>
        <label>근무형태</label>
        <input type="text" value={workingType} onChange={e => setWorkingType(e.target.value)} />
      </div>
      <div>
        <label>지역명</label>
        <input type="text" value={districtName} onChange={e => setDistrictName(e.target.value)} />
      </div>
      <div>
        <label>인원수</label>
        <input type="text" value={headCount} onChange={e => setHeadCount(e.target.value)} />
      </div>
      <div>
        <label>직급</label>
        <input type="text" value={rank} onChange={e => setRank(e.target.value)} />
      </div>
      <div>
        <label>자격증</label>
        {renderCertificates()}
        <button onClick={addCertificate}>+</button>
      </div>
      <div>
        <label>학과</label>
        {renderDepartments()}
        <button onClick={addDepartment}>+</button>
      </div>
      <div>
        <label>과목</label>
        {renderSubjects()}
        <button onClick={addSubject}>+</button>
      </div>
      <div>
        <label>어학점수</label>
        {renderLanguageScores()}
        <button onClick={addLanguageScore}>+</button>
      </div>
      <div>
        <label>기타사항</label>
        {renderNotes()}
        <button onClick={addNote}>+</button>
      </div>
      <div>
        <button onClick={post}>공고 입력</button>
      </div>
    </div> 
  );
}

export default AnnouncementInput;
