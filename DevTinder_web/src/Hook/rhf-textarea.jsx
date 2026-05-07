import { Controller, useFormContext } from "react-hook-form";

function RHFTextArea({ name, placeholder, className, others }) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <textarea
          maxLength={150}
            className="textarea textarea-md"
            placeholder={placeholder}
            className={className}
            {...field}
            {...others}
          />
        );
      }}
    />
  );
}

export default RHFTextArea;
