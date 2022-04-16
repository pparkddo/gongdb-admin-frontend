import {useEffect, useState} from "react";
import {fetchWrapper} from "helpers/fetch-wrapper";
import {fail} from "components/alert";
import SubmitButton from "components/submit-button";
import {useHistory} from "react-router-dom";
import Spinner from "components/spinner";
import css from "styled-jsx/css";

const requestHeader = {
  headers: {
    "Content-Type": "application/json;charset=utf8"
  },
};

export default function CoverLetter(props) {

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

  if (isLoading) {
    return <Spinner />
  }

  const items = coverLetters.map((each, index) =>
      <CoverLetterItem
          index={index}
          coverLetter={each}
          onChangeItem={handleCoverLetterChange}
          onDeleteItem={deleteCoverLetter}
          key={index}
      />
  );

  return (
    <div className="container">
      <div className="cover-letter-container">
        <ul className="item-container">
          {items}
        </ul>
        <button className="add-button" onClick={addCoverLetter}>+</button>
      </div>
      <div className="submit-button-container">
        <SubmitButton
          onClick={hasDataBefore ? put : post}
          isLoading={isFetching}
          content={hasDataBefore ? "전형정보 수정" : "전형정보 입력"}
          useSpinner
        />
      </div>
      <style jsx>{styles}</style>
    </div>
  );
}

const styles = css`
  button, div > :global(button) {
    margin: 0 auto 20px;
    padding: 14px 18px;
    font-size: .875rem;
    line-height: 12px;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background-color: #3182f6;
  }
  :global(button > span) {
    color: #fff;
  }
  label {
    font-weight: 500;
    margin-bottom: 10px;
    font-size: 1.25rem;
  }
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 30px;
    font-size: 12px;
    color: #333d4b;
    background: rgba(0,23,51,0.02);
    border-radius: 5px;
    border: 1px solid #f2f2f2;
    -webkit-transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }
  .container {
    max-width: 720px;
  }
  .delete-button-container {
    margin-top: 40px;
  }
  .item-container {
    padding-left: 0;
  }
  .submit-button-container {
    text-align: center;
  }
  .add-button {
    width: 95%;
  }
  .cover-letter-container {
    margin-bottom: 50px;
    text-align: center;
  }
`;

function CoverLetterItem({index, coverLetter, onChangeItem, onDeleteItem}) {

  const {sequenceNo, question} = coverLetter;
  const onChangeEvent = (event) => {
    return onChangeItem(index, event.target.name, event.target.value);
  };

  return (
      <li className="row">
        <div className="col-3">
          <label>자소서번호</label>
          <input
              name="sequenceNo"
              value={sequenceNo}
              onChange={onChangeEvent}
          />
        </div>
        <div className="col-8">
          <label>문항질문</label>
          <input
              name="question"
              value={question}
              onChange={onChangeEvent}
          />
        </div>
        <div className="col-1 delete-button-container">
          <button onClick={() => onDeleteItem(index)}>-</button>
        </div>
        <style jsx>{styles}</style>
      </li>
  );
}