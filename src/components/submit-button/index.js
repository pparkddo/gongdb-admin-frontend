SubmitButton.defaultProps = {
  isLoading: false,
};

function SubmitButton(props) {
  const content = props.children || props.content;
  const { onClick, isLoading, useSpinner, ...buttonConfig } = props; 

  const renderName = () => {
    if (isLoading && useSpinner) {
      return <span className="spinner-border spinner-border-sm"></span>;
    }
    return <span>{content}</span>;
  };

  return (
    <button className="btn btn-sm" onClick={onClick} disabled={isLoading} {...buttonConfig}>
      {renderName()}
    </button>
  );
}

export default SubmitButton;