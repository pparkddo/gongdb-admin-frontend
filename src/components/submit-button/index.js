SubmitButton.defaultProps = {
  isLoading: false,
};

function SubmitButton(props) {
  const name = props.children;
  const onClick = props.onClick;
  const isLoading = props.isLoading;

  const renderName = () => {
    if (isLoading) {
      return <span className="spinner-border spinner-border-sm"></span>;
    }
    return <span>{name}</span>;
  };

  return (
    <button className="btn btn-sm" onClick={onClick} disabled={isLoading} {...props}>
      {renderName()}
    </button>
  );
}

export default SubmitButton;