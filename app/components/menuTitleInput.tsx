import type { Menu } from "~/models/menu.server";
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
        className="text-2xl font-bold leading-7"
        name="title"
        defaultValue={menu.title || ""}
        placeholder="Mi Menu"
      />
    </AutoSubmitForm>
  );
}

export { MenuTitleInput };
