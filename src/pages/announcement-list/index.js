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

  return (
    <div>
      {isLoading && <Spinner />}
      {
        announcements.length !== 0 && 
        <div>
          {announcements.map(each => renderAnnouncement(each))}
        </div>
      }
    </div>
  );
}

export default AnnouncementList;