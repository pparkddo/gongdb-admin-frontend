SubmitButton.defaultProps = {
  isLoading: false,
};

function SubmitButton(props) {
  const name = props.children;
  const { onClick, isLoading, ...buttonConfig } = props; 

  const renderName = () => {
    if (isLoading) {
      return <span className="spinner-border spinner-border-sm"></span>;
    }
    return <span>{name}</span>;
  };

  return (
    <button className="btn btn-sm" onClick={onClick} disabled={isLoading} {...buttonConfig}>
      {renderName()}
    </button>
  );
}

export default SubmitButton;