import Select from "react-select";
import useWorkingType from "services/working-type";

export default function WorkingTypeSelect(props) {
  let {workingTypes, isLoading, isError} = useWorkingType();

  if (isError) {
    return <WorkingTypeSelectErrorComponent />;
  }

  if (isLoading) {
    return <Select isLoading />;
  }

  return (
      <Select
          {...props}
          isSearchable={false}
          options={workingTypes}
          // defaultValue 로 하면 제대로 클릭안되는 현상이 있음. 그래서 value 로 대체
          // https://stackoverflow.com/questions/55460443/setting-a-default-value-with-react-select-not-working#answer-62197999
          value={getDefaultValue(props.defaultValue, workingTypes)}
          getOptionLabel={(option) => option.workingTypeName}
          getOptionValue={(option) => option.workingType}
      />
  );
}

function WorkingTypeSelectErrorComponent() {
  return <Select placeholder="에러가 발생했습니다. 새로고침 해주세요." />;
}

function getDefaultValue(value, options) {
  if (options.includes(value)) {
    return value;
  }

  const matchedOption = options.find(option => value === option.workingType || value === option.workingTypeName);
  if (!!matchedOption) {
    return matchedOption;
  }

  return value;
}
