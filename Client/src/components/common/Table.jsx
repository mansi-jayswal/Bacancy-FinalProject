import Button from './Button';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";


const Table = ({ data, headers, handleUpdate, handleDelete }) => {
  return (
    <div className="overflow x-auto m-2">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.key} className="border px-4 py-2">
                {header.label}
              </th>
            ))}
            <th className="border px-4 py-2 z-50">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item,index) => (
            <tr key={item.id}  className={`${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
              {headers.map((header) => (
                <td key={header.key} className="border px-4 py-2">
                  {item[header.key]}
                </td>
              ))}
              <td className="border px-4 py-2 flex justify-center items-center gap-2">
                <Button onClick={() => handleUpdate(item.id)} 
                buttonStyle="px-[8px] py-[4px] text-sm mt-[0px!important]">
                <CiEdit />
                </Button>
                <Button onClick={() => handleDelete(item.id)} 
                buttonStyle="px-[8px] py-[4px] text-sm mt-[0px!important] bg-[#c53030] border-[#c53030] hover:text-[#c53030]">
                <MdDeleteOutline />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;