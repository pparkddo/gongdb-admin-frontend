import useWorkingType from "./working-type";
import useRecruitLevel from "./recruit-level";

export default function useCodes() {

  const workingTypeResponse = useWorkingType();
  const recruitLevelResponse = useRecruitLevel();

  return {
    workingTypes: workingTypeResponse.workingTypes,
    recruitLevels: recruitLevelResponse.recruitLevels,
    isLoading: workingTypeResponse.isLoading || recruitLevelResponse.isLoading,
    isError: workingTypeResponse.isError || recruitLevelResponse.isError,
  };
}