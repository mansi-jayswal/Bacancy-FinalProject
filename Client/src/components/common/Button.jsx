
import React from 'react'

function Button({ buttonStyle="", handleClick, children, type = "button", title , ...props  }) {
    const buttonClass = "bg-customRed outline-none hover:bg-[white] mt-4 ml-0 mr-2 px-5 py-2 rounded-md text-white hover:text-customRed border-2 border-customDarkRed transition-all duration-250 ease-in-out font-semibold " + buttonStyle
	return (
		<button type={type} className={buttonClass} onClick={handleClick} title={title} {...props}>
			{children} 
		</button>
	)
}

export default Button;
