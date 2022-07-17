import type { FormProps } from "@remix-run/react";
import { Form, useSubmit } from "@remix-run/react";
import { useDebounce } from "~/hooks";

const AutoSubmitForm = (props: FormProps) => {
  const submit = useSubmit();
  const debouncedSubmit = useDebounce(submit, 500);

  function handleChange(event: React.FormEvent<HTMLFormElement>) {
    debouncedSubmit(event.currentTarget, { replace: true });
  }

  return <Form method="post" onChange={handleChange} {...props} />;
};

export { AutoSubmitForm };
