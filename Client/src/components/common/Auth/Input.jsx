export default function Input({
  register,
  labelText,
  labelFor,
  id,
  name,
  type,
  isRequired = true,
  placeholder,
  error
}) {
  return (
      <div className="my-5">
          <label htmlFor={labelFor} className="sr-only">
              {labelText}
          </label>
          <input
              {...register(name)}
              id={id}
              name={name}
              type={type}
              required={isRequired}
              placeholder={placeholder}
              className={`rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-customRed focus:border-customRed focus:z-10 sm:text-sm ${
                  error ? "border-red-500" : ""
              }`}
          />
          {error && <span className="text-red-500">{error.message}</span>}
      </div>
  );
}

