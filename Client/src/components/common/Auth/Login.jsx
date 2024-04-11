import { useEffect , useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Input from "./Input";
import FormAction from "./formActions";
import { loginFields } from "../constants/formFields";
import { useNavigate } from "react-router-dom";
import { getSubAdmins, getUsers } from "../../../utils/axios";
import { setRole } from "../../../redux/actions/actions";
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
  .string()
  .required('Password is required!')
  .matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{4,}$/,
    'Password must contain at least one capital letter, one small letter, one special character, and one number!'
  ),
});

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [users, setUsers] = useState([]);
  const [subAdmins, setSubAdmins] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));

    getSubAdmins()
    .then(res=> setSubAdmins(res.data))
    .catch(err=> console.log('errror in fetching sub admins', err));
  }, []);

  const onSubmit = (data) => {
    authenticateUser(data);
  };

  const authenticateUser = ({ email, password }) => {
    if (email === "admin@gmail.com" && password === "Admin@123") {
      const admin = { email, password }; 
      dispatch(setRole("admin", admin));
      navigate('/admin');
    } 
    else {
      const subAdmin = subAdmins.find((subAdmin) => subAdmin.email === email);
      if (subAdmin && subAdmin.password === password) {
          dispatch(setRole("sub_admin", subAdmin));
          navigate('/subadmin');
      } else {
          const user = users.find((user) => user.email === email);
          if (user && user.password === password) {
              dispatch(setRole("user", user));
              navigate("/");
          }
          else{
            toast.warn('Invalid Email or password!');
          }
      }
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="-space-y-px">
        {loginFields.map((field) => (
          <Input
            key={field.id}
            register={register}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
            error={errors[field.name]}
          />
        ))}
        
      </div>
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}

