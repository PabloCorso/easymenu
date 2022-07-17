import clsx from "clsx";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

function TextInput({ className, ...props }: Props) {
  return (
    <input
      {...props}
      className={clsx(className, "w-full bg-inherit placeholder:text-gray-400")}
    />
  );
}

export { TextInput };
