import { useEffect, useState } from "react";

function Sequence() {

  const [sequences, setSequences] = useState([]);

  const getSequences = () => {
    fetch("/api/sequence")
      .then(response => response.json())
      .then(data => setSequences(data.content));
  };

  const renderSequence = sequence => {
    return (
      <li key={sequence.id}>
        <a href={`/sequence/${sequence.id}`}>{sequence.id}</a>: {JSON.stringify(sequence)}
      </li>
    );
  };

  useEffect(() => {
    getSequences();
  }, []);
  
  return (
    <div>
      <div>
        <ul>
          {sequences.length !== 0
            ? sequences.map(each => renderSequence(each))
            : "입력된 공고가 없어요"}
        </ul>
      </div>
    </div>
  );
}

export default Sequence;