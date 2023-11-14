import Form from "./Form";
const Modal = ({
  setVisible,
  formAction,
  handleToken,
  handleId,
  error,
  setError,
  errorMessage,
  setErrorMessage,
  requestedLink,
}) => {
  return (
    <div className="modal">
      <div className="">
        <Form
          action={formAction}
          setVisible={setVisible}
          handleToken={handleToken}
          handleId={handleId}
          error={error}
          setError={setError}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          requestedLink={requestedLink}
        />
      </div>
    </div>
  );
};
export default Modal;
