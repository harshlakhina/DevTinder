import { Controller, useFormContext } from "react-hook-form";

function RHFTextField({
  name,
  placeholder,
  className,
  type = "text",
  multiline,
  others,
}) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <input
            textAlignVertical={multiline ? "top" : "center"}
            type={type}
            placeholder={placeholder}
            className={`placeholder:text-[#949caa] text-black ${className}`}
            {...field}
            {...others}
          />
        );
      }}
    />
  );
}

export default RHFTextField;
