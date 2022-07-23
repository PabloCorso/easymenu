import clsx from "clsx";
import autosize from "autosize";
import { useEffect, useRef } from "react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

function TextInput({ value, className, ...props }: Props) {
  const ref = useAutosize<HTMLTextAreaElement>();
  return (
    <textarea
      ref={ref}
      rows={1}
      value={value}
      className={clsx(
        className,
        "w-full resize-none bg-inherit p-2 px-1 leading-5 placeholder:italic placeholder:text-gray-400"
      )}
      {...props}
    />
  );
}

function useAutosize<T extends Element>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (ref.current) {
      autosize(ref.current);
    }
  }, []);

  return ref;
}

export { TextInput };
