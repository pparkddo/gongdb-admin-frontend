import {useEffect, useState} from "react";
import {fetchWrapper} from "../../helpers/fetch-wrapper";
import {fail} from "../../components/alert";
import SubmitButton from "../../components/submit-button";
import {useHistory} from "react-router-dom";
import Spinner from "../../components/spinner";

const requestHeader = {
  headers: {
    "Content-Type": "application/json;charset=utf8"
  },
};

function CoverLetter(props) {

  const history = useHistory();
  const id = props.match.params.id;
  const initialCoverLetters = [{sequenceNo: undefined, question: undefined}];
  const [hasDataBefore, setHasDataBefore] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [coverLetters, setCoverLetters] = useState(initialCoverLetters);

  useEffect(() => {
    fetchWrapper.get(`/api/sequence/${id}/cover-letter`)
    .then(response => response.json())
    .then(
        data => {
          if (data.coverLetters.length === 0) {
            return;
          }
          setCoverLetters(data.coverLetters);
          setHasDataBefore(true);
        }
    )
    .then(() => setLoading(false))
    .catch(handleError);
  }, [id]);

  const post = () => {
    submit(fetchWrapper.post);
  };

  const put = () => {
    submit(fetchWrapper.put);
  };

  const submit = (submitMethod) => {
    setFetching(true);

    const url = `/api/sequence/${id}/cover-letter`;
    const body = {coverLetters: coverLetters};

    submitMethod(url, JSON.stringify(body), requestHeader)
      .then(response => response.json())
      .then(data => history.replace("/sequence", {
        message: data.message,
        previousPath: document.location.pathname
      }))
      .catch(handleError);
  };

  const handleError = error => {
    console.log(error, error.data);
    const errorContent = JSON.stringify(error);
    fail(errorContent);
    setFetching(false);
  };

  const handleCoverLetterChange = (index, name, value) => {
    const newCoverLetters = [...coverLetters];
    newCoverLetters[index][name] = value;
    setCoverLetters(newCoverLetters);
  };

  const addCoverLetter = () => {
    const newCoverLetters = [
      ...coverLetters, {sequenceNo: undefined, question: undefined}
    ];
    setCoverLetters(newCoverLetters);
  };

  const deleteCoverLetter = (index) => {
    const newCoverLetters = [...coverLetters];
    newCoverLetters.splice(index, 1);
    setCoverLetters(newCoverLetters);
  };

  const renderCoverLetter = (coverLetter, index) => {
    return (
      <li key={index}>
        <input
          name="sequenceNo"
          value={coverLetter.sequenceNo}
          onChange={(event) => handleCoverLetterChange(index, event.target.name, event.target.value)}
        />
        <input
          name="question"
          value={coverLetter.question}
          onChange={(event) => handleCoverLetterChange(index, event.target.name, event.target.value)}
        />
        <button onClick={() => deleteCoverLetter(index)}>-</button>
      </li>
    );
  };

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <div>
        <ul>
          {coverLetters.map(renderCoverLetter)}
        </ul>
        <button onClick={addCoverLetter}>+</button>
      </div>
      <div>
        <SubmitButton
          onClick={hasDataBefore ? put : post}
          isLoading={isFetching}
          content={hasDataBefore ? "전형정보 수정" : "전형정보 입력"}
          useSpinner
        />
      </div>
    </div>
  );
}

export default CoverLetter;