function Toast({title}) {
  return (
    <div className="toast toast-top toast-center mt-15">
      <div className="alert alert-success text-center">
        <span>{title}</span>
      </div>
    </div>
  );
}

export default Toast;
