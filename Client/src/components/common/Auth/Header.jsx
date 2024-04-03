import {Link} from 'react-router-dom';

export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl="#"
}){
    return(
        <div className="mb-10">
            <div className="flex justify-center">
                <img 
                    alt=""
                    className="h-14 w-14"
                    src="https://images-platform.99static.com/TOhM9KiFtS83_j9xBXMuW6cUTYs=/0x0:1600x1600/500x500/top/smart/99designs-contests-attachments/108/108678/attachment_108678654"/>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {heading}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
            {paragraph} {' '}
            <Link to={linkUrl} className="font-medium text-customRed hover:text-customDarkRed">
                {linkName}
            </Link>
            </p>
        </div>
    )
}