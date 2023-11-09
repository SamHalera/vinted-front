import Form from "./Form";
const Modal = ({ setVisible, formAction }) => {
  return (
    <div className="modal">
      <div className="">
        <Form action={formAction} setVisible={setVisible} />
      </div>
    </div>
  );
};
export default Modal;
