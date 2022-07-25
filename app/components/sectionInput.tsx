import { useSubmit } from "@remix-run/react";
import clsx from "clsx";
import type { SectionWithItems } from "~/models/menu.server";
import { AutoSubmitForm } from "./autoSubmitForm";
import { MetaInput } from "./metaInput";
import { TextInput } from "./textInput";

function SectionInput({
  section,
  className,
  ...delegated
}: {
  section: SectionWithItems;
  className?: string;
}) {
  const hasTitle1 = Boolean(section.title1);

  const submit = useSubmit();
  function handleBlur(event: React.FocusEvent<HTMLFormElement>) {
    const isEmptyTitle1 =
      event.target.name === "title1" && event.target.value === "";
    const hasItems = section.items?.length > 0;
    if (isEmptyTitle1 && !hasItems) {
      submit(event.currentTarget, { method: "delete" });
    }
  }
  return (
    <AutoSubmitForm
      onBlur={handleBlur}
      className={clsx(className, "flex")}
      {...delegated}
    >
      <MetaInput name="model" value="section" />
      <MetaInput name="id" value={section.id} />
      <TextInput
        name="title1"
        className="text-xl font-bold leading-6"
        defaultValue={section.title1 || ""}
        placeholder="Nueva categoría"
        autoFocus={!hasTitle1}
      />
    </AutoSubmitForm>
  );
}

export { SectionInput };
