//Component No longer used. Use Modal instead

//Components
import Form from "../components/Form";

const Signup = () => {
  return (
    <main className="form-container">
      <div className="container">
        <h1>S'inscrire</h1>

        <Form action="signup" />
      </div>
    </main>
  );
};
export default Signup;
