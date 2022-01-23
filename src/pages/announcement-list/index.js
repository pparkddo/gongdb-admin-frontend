import { useEffect, useState } from "react";
import Spinner from "../../components/spinner";
import completeImage from "../../images/complete.png";

function AnnouncementList() {
  
  const [isLoading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);

  const getAnnouncements = () => {
    fetch("/api/announcement")
      .then(response => response.json())
      .then(data => setAnnouncements(data.content))
      .then(() => setLoading(false));
  };

  const renderAnnouncement = announcement => {
    return (
      <div className="con_wrap sequence">
        <div className="container conbox">
          {/*inner*/}
          <div className="table-wrap">
            <h3>차수리스트</h3>
            <table style={{ width:'100%'}}>
              <colgroup>
                <col style={{ width:'30%'}} />
                <col style={{ width:'70%'}} />
              </colgroup>
              <tr>
                <th><p>id</p></th>
                <td><p>{announcement.id}</p></td>
              </tr>
              <tr>
                <th><p>positionId</p></th>
                <td><p>{announcement.position.positionId}</p></td>
              </tr>
              <tr>
                <th><p>positionName</p></th>
                <td><p>{announcement.position.positionName}</p></td>
              </tr>
              <tr>
                <th><p>sequenceID</p></th>
                <td><p>{announcement.sequence.id}</p></td>
              </tr>
              <tr>
                <th><p>회사ID</p></th>
                <td><p>{announcement.sequence.company.id}</p></td>
              </tr>
              <tr>
                <th><p>회사명</p></th>
                <td><p>{announcement.sequence.company.name}</p></td>
              </tr>
              <tr>
                <th><p>차수</p></th>
                <td><p>{announcement.sequence.sequence}</p></td>
              </tr>
              <tr>
                <th><p>시작일</p></th>
                <td><p>{announcement.sequence.receiptStartTimestamp}</p></td>
              </tr>
              <tr>
                <th><p>종료일</p></th>
                <td><p>{announcement.sequence.receiptEndTimestamp}</p></td>
              </tr>
              <tr>
                <th><p>링크</p></th>
                <td><p>{announcement.sequence.link}</p></td>
              </tr>
              <tr>
                <th><p>파일id</p></th>
                <td><p>{announcement.sequence.files[0].id}</p></td>
              </tr>
              <tr>
                <th><p>파일이름</p></th>
                <td><p>{announcement.sequence.files[0].fileName}</p></td>
              </tr>
              <tr>
                <th><p>작성일</p></th>
                <td><p>{announcement.createdTimestamp}</p></td>
              </tr>
              <tr>
                <th><p>자격증</p></th>
                <td><p>{announcement.certificates}</p></td>
              </tr>
              <tr>
                <th><p>학과</p></th>
                <td><p>{announcement.departments}</p></td>
              </tr>
              <tr>
                <th><p>과목</p></th>
                <td><p>{announcement.subjects[0].subjectId}</p></td>
              </tr>
              <tr>
                <th><p>subjectId</p></th>
                <td><p>{announcement.subjects[0].subjectName}</p></td>
              </tr>
              <tr>
                <th><p>subjectName</p></th>
                <td><p>{announcement.subjects[0].subjectName}</p></td>
              </tr>
              <tr>
                <th><p>languageId</p></th>
                <td><p>{announcement.languageScores[0].languageId}</p></td>
              </tr>
              <tr>
                <th><p>languageName</p></th>
                <td><p>{announcement.languageScores[0].languageName}</p></td>
              </tr>
              <tr>
                <th><p>0</p></th>
                <th><p>score</p></th>
                <td><p>{announcement.languageScores[0].score}</p></td>
              </tr>
              <tr>
                <th><p>0</p></th>
                <th><p>perfectScore</p></th>
                <td><p>{announcement.languageScores[0].perfectScore}</p></td>
              </tr>
              <tr>
                <th><p>notes</p></th>
                <td><p>{announcement.notes}</p></td>
              </tr>
              <tr>
                <th><p>채용구분</p></th>
                <td><p>{announcement.recruitType}</p></td>
              </tr>
              <tr>
                <th><p>채용수준</p></th>
                <td><p>{announcement.recruitLevel}</p></td>
              </tr>
              <tr>
                <th><p>근무형태</p></th>
                <td><p>{announcement.workingType}</p></td>
              </tr>
              <tr>
                <th><p>지역명</p></th>
                <td><p>{announcement.districtName}</p></td>
              </tr>
              <tr>
                <th><p>인원수</p></th>
                <td><p>{announcement.headCount}</p></td>
              </tr>
              <tr>
                <th><p>직급</p></th>
                <td><p>{announcement.rank}</p></td>
              </tr>
              <tr>
                <th><p>createdTimestamp</p></th>
                <td><p>{announcement.createdTimestamp}</p></td>
              </tr>
            </table>
          </div>
          {/*inner*/}
        </div>
      </div>
    );
  };

  useEffect(() => {
    getAnnouncements();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (announcements.length === 0) {
    return (
      <div className="text-center">
        <div className="com-img text-center">
          <img src={completeImage} />
          <h3>입력된 공고가 없어요</h3>
        </div>
      </div>
    );
  }

  return (
    <div>
      {announcements.map(each => renderAnnouncement(each))}
    </div>
  );
}

export default AnnouncementList;