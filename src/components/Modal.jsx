import Form from "./Form";
const Modal = ({
  setVisible,
  isLoading,
  setIsLoading,
  formAction,
  handleToken,
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
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          handleToken={handleToken}
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
