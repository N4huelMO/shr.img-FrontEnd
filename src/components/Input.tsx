import { InputProps } from "@/interfaces/interfaces";

const Input = ({
  label,
  register,
  required,
  errors,
  minLength,
  message,
  type,
}: InputProps) => (
  <>
    <label htmlFor={label} className="mt-5 first:mt-0 capitalize mb-1">
      {label}
    </label>
    <input
      id={label}
      {...register(label, {
        required,
        minLength: {
          value: minLength ? minLength : 0,
          message: message ? message : "",
        },
      })}
      type={type}
      className="p-2 outline-none text-black font-semibold w-full"
    />
    {errors && errors.type === "required" && (
      <span className="text-sm mt-1 ml-1 text-red-400">
        This field is required
      </span>
    )}

    {errors && errors.type === "minLength" && (
      <span className="text-sm mt-1 ml-1 text-red-400">{errors.message}</span>
    )}
  </>
);

export default Input;
