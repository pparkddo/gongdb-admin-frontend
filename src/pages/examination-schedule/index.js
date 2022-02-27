import {useEffect, useState} from "react";
import SubmitButton from "../../components/submit-button";
import {fetchWrapper} from "../../helpers/fetch-wrapper";
import {fail} from "../../components/alert";
import {useHistory} from "react-router-dom";
import Spinner from "../../components/spinner";
import css from "styled-jsx/css";

const requestHeader = {
  headers: {
    "Content-Type": "application/json;charset=utf8"
  },
};

function Index(props) {

  const history = useHistory();
  const id = props.match.params.id;
  const [hasDataBefore, setHasDataBefore] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [examinationSchedule, setExaminationSchedule] = useState(
    [
      {
        examinationSequenceNo: 1,
        examinationType: "",
        estimatedExaminationStartDate: "",
        estimatedExaminationEndDate: "",
        estimatedExaminationResultNoticeDate: "",
        examinationStartDate: "",
        examinationEndDate: "",
        examinationResultNoticeDate: "",
        selectingRate: "",
        note: "",
      },
    ]
  );

  useEffect(() => {
    fetchWrapper.get(`/api/sequence/${id}/examination-schedule`)
      .then(response => response.json())
      .then(
        data => {
          if (data.examinationScheduleItems.length === 0) {
            return;
          }
          setExaminationSchedule(data.examinationScheduleItems);
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

    const url = `/api/sequence/${id}/examination-schedule`;
    const body = { examinationScheduleItemList: examinationSchedule };

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

  const renderExaminationScheduleItem = (value, index) => {
    return (
      <li className="my-3" key={index}>
        <label htmlFor="examinationSequenceNo">전형순서</label>
        <input name="examinationSequenceNo" value={ index+1 } disabled />
        <label htmlFor="examinationType">전형유형</label>
        <input
          name="examinationType"
          value={value.examinationType}
          onChange={e => changeExaminationScheduleItem(index, e.target.name, e.target.value)}
        />
        <label htmlFor="estimatedExaminationStartDate">전형시작 추정일</label>
        <input
          name="estimatedExaminationStartDate"
          value={value.estimatedExaminationStartDate}
          onChange={e => changeExaminationScheduleItem(index, e.target.name, e.target.value)}
        />
        <label htmlFor="estimatedExaminationEndDate">전형종료 추정일</label>
        <input
          name="estimatedExaminationEndDate"
          value={value.estimatedExaminationEndDate}
          onChange={e => changeExaminationScheduleItem(index, e.target.name, e.target.value)}
        />
        <label htmlFor="estimatedExaminationResultNoticeDate">전형결과공지 추정일</label>
        <input
          name="estimatedExaminationResultNoticeDate"
          value={value.estimatedExaminationResultNoticeDate}
          onChange={e => changeExaminationScheduleItem(index, e.target.name, e.target.value)}
        />
        <label htmlFor="examinationStartDate">전형시작일</label>
        <input
          name="examinationStartDate"
          type="datetime-local"
          value={value.examinationStartDate}
          onChange={e => changeExaminationScheduleItem(index, e.target.name, e.target.value)}
        />
        <label htmlFor="examinationEndDate">전형종료일</label>
        <input
          name="examinationEndDate"
          type="datetime-local"
          value={value.examinationEndDate}
          onChange={e => changeExaminationScheduleItem(index, e.target.name, e.target.value)}
        />
        <label htmlFor="examinationResultNoticeDate">전형결과공지일</label>
        <input
          name="examinationResultNoticeDate"
          type="datetime-local"
          value={value.examinationResultNoticeDate}
          onChange={e => changeExaminationScheduleItem(index, e.target.name, e.target.value)}
        />
        <label htmlFor="selectingRete">선발배수</label>
        <input
          name="selectingRete"
          value={value.selectingRate}
          onChange={e => changeExaminationScheduleItem(index, e.target.name, e.target.value)}
        />
        <label htmlFor="note">기타사항</label>
        <input
          name="note"
          value={value.note}
          onChange={e => changeExaminationScheduleItem(index, e.target.name, e.target.value)}
        />
        <button onClick={() => deleteExaminationScheduleItem(index)}>-</button>
        <style jsx>{labelStyle}</style>
      </li>
    );
  };

  const changeExaminationScheduleItem = (index, name, value) => {
    const newExaminationSchedule = [...examinationSchedule];
    newExaminationSchedule[index][name] = value;
    setExaminationSchedule(newExaminationSchedule);
  };

  const addExaminationScheduleItem = () => {
    const newExaminationScheduleItem = {
      examinationSequenceNo: examinationSchedule.length,
      examinationType: "",
      estimatedExaminationStartDate: "",
      estimatedExaminationEndDate: "",
      estimatedExaminationResultNoticeDate: "",
      examinationStartDate: "",
      examinationEndDate: "",
      examinationResultNoticeDate: "",
      selectingRate: "",
      note: "",
    };
    setExaminationSchedule([...examinationSchedule, newExaminationScheduleItem]);
  };

  const deleteExaminationScheduleItem = (index) => {
    const newExaminationSchedule = [...examinationSchedule];
    newExaminationSchedule.splice(index, 1);
    setExaminationSchedule(newExaminationSchedule);
  };

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="con_wrap">
      <div>
        <ul>
          {examinationSchedule.map(renderExaminationScheduleItem)}
        </ul>
        <button className="background-test" onClick={addExaminationScheduleItem}>+</button>
      </div>
      <div>
        <SubmitButton
          className="styled-button"
          onClick={hasDataBefore ? put : post}
          isLoading={isFetching}
          content={hasDataBefore ? "전형정보 수정" : "전형정보 입력"}
          useSpinner
        />
      </div>
      <style jsx>{style}</style>
      <style jsx global>{globalStyle}</style>
    </div>
  );
}

const style = css`
  .background-test {
    background-color: blue;
  }
`;

const labelStyle = css`
  label {
    font-size: 12px;
  }
`;

const globalStyle = css`
  .styled-button {
    background-color: blue;
  }  
`;

export default Index;