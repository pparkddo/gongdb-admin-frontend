import { useEffect, useState } from "react";
import Spinner from "../../components/spinner";

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
      <li key={announcement.id}>
        <a href={`/announcement/${announcement.id}`}>{announcement.id}</a>: {JSON.stringify(announcement)}
      </li>
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
      <div>
        <span>입력된 공고가 없어요</span>
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