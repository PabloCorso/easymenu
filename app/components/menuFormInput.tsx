import { useSubmit } from "@remix-run/react";
import clsx from "clsx";
import type { Item, Menu, Section } from "~/models/menu.server";
import { AutoSubmitForm } from "./autoSubmitForm";
import { MetaInput } from "./metaInput";
import { TextInput } from "./textInput";

function MenuTitleInput({
  menu,
  ...delegated
}: {
  menu: Menu;
  className?: string;
}) {
  return (
    <AutoSubmitForm {...delegated}>
      <MetaInput name="model" value="menu" />
      <MetaInput name="id" value={menu.id} />
      <TextInput
        className="text-2xl font-bold"
        name="title"
        defaultValue={menu.title || ""}
        placeholder="Mi Menu"
      />
    </AutoSubmitForm>
  );
}

function SectionInput({
  section,
  ...delegated
}: {
  section: Section;
  className?: string;
}) {
  const hasTitle1 = Boolean(section.title1);
  return (
    <AutoSubmitForm {...delegated}>
      <MetaInput name="model" value="section" />
      <MetaInput name="id" value={section.id} />
      <TextInput
        name="title1"
        className="text-xl font-bold"
        defaultValue={section.title1 || ""}
        placeholder="Nueva sección"
        autoFocus={!hasTitle1}
      />
    </AutoSubmitForm>
  );
}

function ItemInput({ item }: { item: Item }) {
  const hasPrice1 = Boolean(item.price1);
  const hasText1 = Boolean(item.text1);

  const submit = useSubmit();
  function handleBlur(event: React.FocusEvent<HTMLFormElement>) {
    const isBlurOnEmptyText1 = event.target.name === "text1" && !hasText1;
    if (isBlurOnEmptyText1) {
      submit(event.currentTarget, { method: "delete" });
    }
  }
  return (
    <AutoSubmitForm onBlur={handleBlur}>
      <MetaInput name="model" value="item" />
      <MetaInput name="id" value={item.id} />
      <MetaInput name="_action" value={"update"} />
      <fieldset className="flex items-center gap-2">
        <TextInput
          name="text1"
          className="m-auto w-full text-ellipsis whitespace-nowrap"
          defaultValue={item.text1 || ""}
          placeholder="Nuevo..."
          autoFocus={!hasText1}
        />
        <label className="relative flex font-bold">
          <span
            className={clsx("absolute left-1", {
              "italic text-gray-400": !hasPrice1,
            })}
          >
            $
          </span>
          <input
            type="number"
            name="price1"
            className="max-w-[54px] bg-inherit pl-2 text-right placeholder:italic"
            defaultValue={item.price1 || ""}
            placeholder="100"
            min={0}
            max={9999}
          />
        </label>
      </fieldset>
    </AutoSubmitForm>
  );
}

export { MenuTitleInput, SectionInput, ItemInput };
