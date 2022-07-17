type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  value: string;
};

function MetaInput(props: Props) {
  return <input {...props} readOnly hidden />;
}

export { MetaInput };
