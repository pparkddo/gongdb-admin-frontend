import { useEffect, useState } from "react";
import Spinner from "../../components/spinner";

function Sequence() {
  
  const [isLoading, setLoading] = useState(true);
  const [sequences, setSequences] = useState([]);

  const getSequences = () => {
    fetch("/api/sequence", {cache: "no-cache"})
      .then(response => response.json())
      .then(data => setSequences(data.content))
      .then(() => setLoading(false));
  };

  const renderSequence = sequence => {
    return (
      <li key={sequence.id}>
        <a href={`/sequence/${sequence.id}`}>{sequence.id}</a>: {JSON.stringify(sequence)}
        <a href={`/sequence/${sequence.id}/announcement`}>공고입력</a>
      </li>
    );
  };

  useEffect(() => {
    getSequences();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (sequences.length === 0) {
    return (
      <div>
        <span>입력된 공고 차수가 없어요</span>
      </div>
    )
  }
  
  return (
    <div>
      <ul>
        {sequences.map(each => renderSequence(each))}
      </ul>
    </div>
  );
}

export default Sequence;