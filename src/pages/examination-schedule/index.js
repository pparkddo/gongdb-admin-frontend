import {useEffect, useState} from "react";
import SubmitButton from "components/submit-button";
import {fetchWrapper} from "helpers/fetch-wrapper";
import {fail} from "components/alert";
import {useHistory} from "react-router-dom";
import Spinner from "components/spinner";
import css from "styled-jsx/css";
import {formatDate} from "utils/dateUtil";

const requestHeader = {
  headers: {
    "Content-Type": "application/json;charset=utf8"
  },
};

const capitalize = (s) => {
  return s[0].toUpperCase() + s.slice(1);
};

const estimatedDateFormat = "YYYY-MM-DD HH:mm";

const convertToInputAcceptableFormat = (value) => {
  if (!value) {
    return "";
  }
  const inputAcceptableFormat = "YYYY-MM-DDTHH:mm";
  return formatDate(value, inputAcceptableFormat);
};

const convertExaminationSchedule = (examinationSchedule) => {
  return examinationSchedule.map((each) => ({
    ...each,
    examinationStartDate: convertToInputAcceptableFormat(each.examinationStartDate),
    examinationEndDate: convertToInputAcceptableFormat(each.examinationEndDate),
    examinationResultNoticeDate: convertToInputAcceptableFormat(each.examinationResultNoticeDate),
  }));
};

export default function ExaminationSchedule(props) {

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

  const handleError = error => {
    console.log(error, error.data);
    const errorContent = JSON.stringify(error);
    fail(errorContent);
    setFetching(false);
  };

  useEffect(() => {
    fetchWrapper.get(`/api/sequence/${id}/examination-schedule`)
      .then(response => response.json())
      .then(
        data => {
          if (data.examinationScheduleItems.length === 0) {
            return;
          }
          setExaminationSchedule(convertExaminationSchedule(data.examinationScheduleItems));
          setHasDataBefore(true);
        }
      )
      .then(() => setLoading(false))
      .catch(handleError);
  }, [id]);

  if (isLoading) {
    return <Spinner />
  }

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

  const changeExaminationScheduleItem = (index, name, value) => {
    const concretes = [
      "examinationStartDate", "examinationEndDate",
      "examinationResultNoticeDate"
    ];
    if (concretes.includes(name)) {
      const estimated = "estimated" + capitalize(name);
      const estimatedDate = value ? formatDate(value, estimatedDateFormat) : "";
      _changeExaminationScheduleItem(index, estimated, estimatedDate);
    }
    _changeExaminationScheduleItem(index, name, value);
  }

  const _changeExaminationScheduleItem = (index, name, value) => {
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

  const items = examinationSchedule.map((each, index) => (
      <ExaminationScheduleItem
          item={each}
          index={index}
          onChangeItem={changeExaminationScheduleItem}
          onDeleteItem={deleteExaminationScheduleItem}
          key={index}
      />
  ));

  return (
    <ul className="row contain">
      <li className="pad0">
        {items}
        <div className="pad15">
          <button className="col-12 btn-mi" onClick={addExaminationScheduleItem}>
            +
          </button>
        </div>
      </li>
      <li className="pad15">
        <SubmitButton
          className="col-12 blue-btn"
          onClick={hasDataBefore ? put : post}
          isLoading={isFetching}
          content={hasDataBefore ? "전형정보 수정" : "전형정보 입력"}
          useSpinner
        />
      </li>
      <style jsx>{styles}</style>
    </ul>
  );
}

function ExaminationScheduleItem({item, index, onChangeItem, onDeleteItem}) {

  const onChangeEvent = (event) => {
    return onChangeItem(index, event.target.name, event.target.value);
  };

  const {
    examinationType, estimatedExaminationStartDate, estimatedExaminationEndDate,
    estimatedExaminationResultNoticeDate, examinationStartDate,
    examinationEndDate, examinationResultNoticeDate, selectingRate, note
  } = item;

  return (
      <div className="contain">
        <ul className="row" key={index}>
          <li className="col-xs-12 col-sm-6">
            <label htmlFor="examinationSequenceNo">전형순서</label>
            <input name="examinationSequenceNo" value={ index+1 } disabled />
          </li>
          <li className="col-xs-12 col-sm-6">
            <label htmlFor="examinationType">전형유형</label>
            <input
                name="examinationType"
                value={examinationType}
                onChange={onChangeEvent}
            />
          </li>
          <li className="col-xs-12 col-sm-6">
            <label htmlFor="estimatedExaminationStartDate">전형시작 추정일</label>
            <input
                name="estimatedExaminationStartDate"
                value={estimatedExaminationStartDate}
                onChange={onChangeEvent}
            />
          </li>
          <li className="col-xs-12 col-sm-6">
            <label htmlFor="examinationStartDate">전형시작일</label>
            <input
                name="examinationStartDate"
                type="datetime-local"
                value={examinationStartDate}
                onChange={onChangeEvent}
            />
          </li>
          <li className="col-xs-12 col-sm-6">
            <label htmlFor="estimatedExaminationEndDate">전형종료 추정일</label>
            <input
                name="estimatedExaminationEndDate"
                value={estimatedExaminationEndDate}
                onChange={onChangeEvent}
            />
          </li>
          <li className="col-xs-12 col-sm-6">
            <label htmlFor="examinationEndDate">전형종료일</label>
            <input
                name="examinationEndDate"
                type="datetime-local"
                value={examinationEndDate}
                onChange={onChangeEvent}
            />
          </li>
          <li className="col-xs-12 col-sm-6">
            <label htmlFor="estimatedExaminationResultNoticeDate">전형결과공지 추정일</label>
            <input
                name="estimatedExaminationResultNoticeDate"
                value={estimatedExaminationResultNoticeDate}
                onChange={onChangeEvent}
            />
          </li>
          <li className="col-xs-12 col-sm-6">
            <label htmlFor="examinationResultNoticeDate">전형결과공지일</label>
            <input
                name="examinationResultNoticeDate"
                type="datetime-local"
                value={examinationResultNoticeDate}
                onChange={onChangeEvent}
            />
          </li>
          <li className="col-xs-12 col-sm-6">
            <label htmlFor="selectingRate">선발배수</label>
            <input
                name="selectingRate"
                value={selectingRate}
                onChange={onChangeEvent}
            />
          </li>
          <li className="col-xs-12 col-sm-6">
            <label htmlFor="note">기타사항</label>
            <input
                name="note"
                value={note}
                onChange={onChangeEvent}
            />
          </li>
          <li>
            <button className="col-12 btn_mi no_pad mar_b20" onClick={() => onDeleteItem(index)}>
              -
            </button>
          </li>
        </ul>
        <style jsx>{styles}</style>
      </div>
  );
}

const styles = css`
  .row {
    padding-right: 0;
    padding-left: 0;
    margin: 0 auto;
  }

  button, :global(.blue-btn) {
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

  button > span, :global(.blue-btn > span) {
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
    margin-bottom: 50px;
    font-size: 12px;
    color: #333d4b;
    background: rgba(0, 23, 51, 0.02);
    border-radius: 5px;
    border: 1px solid #f2f2f2;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  }

  .pad0 {
    padding: 0;
  }

  .pad15 {
    padding-right: calc(var(--bs-gutter-x) * .5);
    padding-left: calc(var(--bs-gutter-x) * .5);
  }

  .btn_mi {
    margin: 0 auto;
    padding: 14px 18px;
    margin-bottom: 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background-color: #3182f6;
    color: #fff;
    font-weight: 900;
    line-height: 12px;
    text-align: center;
  }

  .btn_mi:hover {
    background-color: #1B64DB;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  }

  .contain {
    max-width: 600px !important;
    margin: 0 auto;
  }
`;
