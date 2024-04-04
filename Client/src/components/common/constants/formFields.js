const loginFields=[
    {
        labelText:"Email address",
        labelFor:"email-address",
        id:"email-address",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password"   
    }
]

const signupFields=[
    {
        labelText:"Username",
        labelFor:"username",
        id:"name",
        name:"name",
        type:"text",
        autoComplete:"name",
        isRequired:true,
        placeholder:"Username"   
    },
    {
        labelText:"Email address",
        labelFor:"email_address",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current_password",
        isRequired:true,
        placeholder:"Password"   
    },
    {
        labelText:"Confirm Password",
        labelFor:"confirm_password",
        id:"confirm_password",
        name:"confirm_password",
        type:"password",
        autoComplete:"confirm_password",
        isRequired:true,
        placeholder:"Confirm Password"   
    },
    {
        labelText:"Preferred Cuisine",
        labelFor:"preferred_cuisine",
        id:"preference",
        name:"preference",
        type:"dropdown",
        isRequired:true,
        options: ["Italian", "Mexican", "Indian", "Chinese", "Thai"] // Add your preferred cuisines here
    }
]

export {loginFields,signupFields}