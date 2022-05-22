import Select from "react-select";
import useRecruitLevel from "services/recruit-level";

export default function RecruitLevelSelect(props) {
  let {recruitLevels, isLoading, isError} = useRecruitLevel();

  if (isError) {
    return <RecruitLevelSelectErrorComponent />;
  }

  if (isLoading) {
    return <Select isLoading />;
  }

  return (
      <Select
          {...props}
          isSearchable={false}
          options={recruitLevels}
          // defaultValue 로 하면 제대로 클릭안되는 현상이 있음. 그래서 value 로 대체
          // https://stackoverflow.com/questions/55460443/setting-a-default-value-with-react-select-not-working#answer-62197999
          value={getDefaultValue(props.defaultValue, recruitLevels)}
          getOptionLabel={(option) => option.recruitLevelName}
          getOptionValue={(option) => option.recruitLevel}
      />
  );
}

function RecruitLevelSelectErrorComponent() {
  return <Select placeholder="에러가 발생했습니다. 새로고침 해주세요." />;
}

function getDefaultValue(value, options) {
  if (options.includes(value)) {
    return value;
  }

  const matchedOption = options.find(option => value === option.recruitLevel || value === option.recruitLevelName);
  if (!!matchedOption) {
    return matchedOption;
  }

  return value;
}
