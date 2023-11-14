//Component No longer used. Use Modal instead

//Components
import Form from "../components/Form";
const Login = () => {
  return (
    <main className="form-container">
      <div className="container">
        <h1>S'inscrire</h1>

        <Form action="login" />
      </div>
    </main>
  );
};
export default Login;
