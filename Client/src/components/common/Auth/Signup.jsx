import { useEffect, useState } from 'react';
import { signupFields } from "../constants/formFields";
import FormAction from './formActions';
import Input from './Input';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRole } from '../../../redux/actions/actions';
import { API, RegisterUser } from '../../../utils/axios';

const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [signupState, setSignupState] = useState(fieldsState);
    const [users, setUsers]= useState();

    useEffect(()=>{
        API.get('/users')
        .then(res=> setUsers(res.data))
        .catch(err=> console.log(err));
    })

    const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(signupState)
        navigate('/');
        createAccount();
    }

    const createAccount = () => {
        const newUser = {
            id:
            users.length !== 0
              ? (parseInt(users[users.length - 1].id) + 1).toString()
              : "1",
            name: signupState.name,
            email: signupState.email,
            password: signupState.password,
            saved_recipes:[],
            created_recipes:[],
            reviews:[],
            preference:signupState.preference
        };
        dispatch(setRole('user', newUser))

        RegisterUser(newUser)
        .then(res=> console.log("user created successfully ! "+res.data))
        .catch(err=>console.log(err));

        console.log(newUser)
    }

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="">
                {
                    fields.map(field =>
                        field.type === "dropdown" ?
                            <div key={field.id}>
                                <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">{field.labelText}</label>
                                <select
                                    id={field.id}
                                    name={field.name}
                                    value={signupState[field.id]}
                                    onChange={handleChange}
                                    required={field.isRequired}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-customRed focus:border-customRed sm:text-sm rounded-md"
                                >
                                    <option value="" disabled>{field.placeholder}</option>
                                    {field.options.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            :
                            <Input
                                key={field.id}
                                handleChange={handleChange}
                                value={signupState[field.id]}
                                labelText={field.labelText}
                                labelFor={field.labelFor}
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                isRequired={field.isRequired}
                                placeholder={field.placeholder}
                            />
                    )
                }
                <FormAction handleSubmit={handleSubmit} text="Signup" />
            </div>
        </form>
    )
}

