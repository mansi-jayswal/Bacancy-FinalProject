import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Input from "./Input";
import FormExtra from "./FromExtra";
import FormAction from "./formActions";
import { loginFields } from "../constants/formFields";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../../utils/axios";
import { setRole } from "../../../redux/actions/actions";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser(loginState);
    console.log(loginState);
  };

  const authenticateUser = (loginState) => {

    const { email, password } = loginState;
    if (email === "admin@gmail.com" && password === "Admin@123") {
        const admin=loginState ; 
        dispatch(setRole("admin",admin));
        navigate('/admin');
    } 
    else {
      const user = users.find((user) => user.email === email);
      if (user && user.password === password) {
        dispatch(setRole("user", user));
        navigate("/");

      }
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>
      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}
