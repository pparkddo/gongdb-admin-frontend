import Spinner from "components/spinner";
import completeImage from "images/complete.png";
import editImg from "../../images/pencil.png";
import usePagedAnnouncement from "services/announcement";
import dayjs from "dayjs";

const formatTimestamp = (value) => {
  return dayjs(value).format("YYYY-MM-DD HH:mm");
};

function AnnouncementList() {

  const page = 0;
  const {announcements, isLoading, isError} = usePagedAnnouncement(page);

  if (isError) {
    return <p>Error on fetching announcements</p>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (announcements.length === 0) {
    return (
      <div className="text-center">
        <div className="com-img text-center">
          <img src={completeImage} alt="complete" />
          <h3>입력된 공고가 없어요</h3>
        </div>
      </div>
    );
  }

  return (
    <div>
      {announcements.map(
          (each, index) => <Announcement key={index} announcement={each} />
      )}
    </div>
  );
}

function Announcement({announcement}) {
  return (
      <div className="con_wrap sequence">
        <div className="container conbox">
          {/*inner*/}
          <div className="table-wrap" style={{padding:'0 15px'}}>
          <h3 style={{padding:'0', width:'auto'}}>
              {`
                ${announcement.sequence.company.name} 
                ${announcement.sequence.sequence} 
                (${announcement.position.positionName})
              `}
            <span>
              <a href={`/announcement/${announcement.id}`}>
                <img className="editImg" src={editImg} alt="edit announcement" />
              </a>
            </span>
          </h3>
            
            
            <table style={{ width:'100%'}}>
              <colgroup>
                <col style={{ width:'30%'}} />
                <col style={{ width:'70%'}} />
              </colgroup>
              <tbody>
                <tr>
                  <th><p>공고ID</p></th>
                  <td><p>{announcement.id}</p></td>
                </tr>
                <tr>
                  <th><p>채용구분</p></th>
                  <td><p>{announcement.recruitType}</p></td>
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
                  <th><p>공고생성일</p></th>
                  <td>
                    <p>{formatTimestamp(announcement.createdTimestamp)}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/*inner*/}
        </div>
      </div>
  );
}

export default AnnouncementList;