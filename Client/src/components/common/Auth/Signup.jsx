import { useEffect , useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormAction from './formActions';
import Input from './Input';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRole } from '../../../redux/actions/actions';
import { API, RegisterUser, getSubAdmins } from '../../../utils/axios';
import { signupFields } from "../constants/formFields";
import { toast } from "react-toastify";


export default function Signup() {

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
    .string()
    .required('Password is required!')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{4,}$/,
      'Password must contain at least one capital letter, one small letter, one special character, and one number!'
    ),
    confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
    preference: yup.string().required('Preference is required'),
});

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const [users, setUsers] = useState([]);
    const [subAdmins, setSubAdmins] = useState([]);
    const [emailError, setEmailError] = useState(false);


    useEffect(() => {
        API.get('/users')
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));

        getSubAdmins()
        .then(res=>setSubAdmins(res.data))
        .catch(err=>console.log(err))
    }, []);

    const onSubmit = async (data) => {
      const { email } = data;
      const isEmailTaken = users.some(user => user.email === email) || subAdmins.some(subAdmin => subAdmin.email === email);
      if (isEmailTaken) {
        setEmailError(true);
        toast.warn('Email already taken!');
      } else {
        setEmailError(false);
        console.log(data);
        navigate('/');
         await createAccount(data);
      }
    };
    const createAccount = (data) => {
        const newUser = {
            id: users.length !== 0 ? (parseInt(users[users.length - 1].id) + 1).toString() : '1',
            name: data.name,
            email: data.email,
            password: data.password,
            saved_recipes: [],
            created_recipes: [],
            reviews: [],
            preference: data.preference
        };

        dispatch(setRole('user', newUser));

        RegisterUser(newUser)
            .then(res => console.log('User created successfully! ' + res.data))
            .catch(err => console.log(err));

        console.log(newUser);
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="">
                <Input
                    register={register}
                    labelText="Name"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter name"
                    error={errors.name}
                />
                <Input
                    register={register}
                    labelText="Email address"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    error={errors.email|| (emailError===true)}
                />
                <Input
                    register={register}
                    labelText="Password"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    error={errors.password}
                />
                <Input
                    register={register}
                    labelText="confirm Password"
                    id="confirmpassword"
                    name="confirmpassword"
                    type="password"
                    placeholder="Confirm password"
                    error={errors.confirmpassword}
                />
                <div className="my-5">
                    <label htmlFor="preference" className="block text-sm font-medium text-gray-700">Preferred Cuisine</label>
                    <select
                        id="preference"
                        name="preference"
                        {...register('preference')}
                        className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-customRed focus:border-customRed sm:text-sm ${
                            errors.preference ? "border-red-500" : ""
                        }`}
                    >
                        <option value="" >Select preferred cuisine</option>
                        {signupFields[4].options.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    {errors.preference && <span className="text-red-500">{errors.preference.message}</span>}
                </div>
                <FormAction handleSubmit={handleSubmit} text="Signup" />
            </div>
        </form>
    )
}
