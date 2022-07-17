import clsx from "clsx";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

function TextInput({ className, ...props }: Props) {
  return (
    <input
      type="text"
      className={clsx(
        className,
        "w-full bg-inherit placeholder:italic placeholder:text-gray-400"
      )}
      {...props}
    />
  );
}

export { TextInput };
