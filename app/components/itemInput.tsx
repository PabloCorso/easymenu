import { useSubmit } from "@remix-run/react";
import clsx from "clsx";
import type { Item } from "~/models/menu.server";
import { AutoSubmitForm } from "./autoSubmitForm";
import { MetaInput } from "./metaInput";
import { TextInput } from "./textInput";

function ItemInput({ item }: { item: Item }) {
  const hasPrice1 = Boolean(item.price1);
  const hasText1 = Boolean(item.text1);

  const submit = useSubmit();
  function handleBlur(event: React.FocusEvent<HTMLFormElement>) {
    const isEmptyText1 =
      event.target.name === "text1" && event.target.value === "";
    if (isEmptyText1) {
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
          className="m-auto w-full"
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
            className="max-w-[56px] bg-inherit pr-1 pl-2 text-right placeholder:italic"
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

export { ItemInput };

/// POPPER

// import { useSubmit } from "@remix-run/react";
// import clsx from "clsx";
// import type { Item } from "~/models/menu.server";
// import { AutoSubmitForm } from "./autoSubmitForm";
// import { MetaInput } from "./metaInput";
// import { TextInput } from "./textInput";

// import React, { useState } from "react";
// import { usePopper } from "react-popper";
// import { Trash } from "react-feather";

// function ItemInput({ item }: { item: Item }) {
//   const hasPrice1 = Boolean(item.price1);
//   const hasText1 = Boolean(item.text1);

//   const submit = useSubmit();
//   function handleBlur(event: React.FocusEvent<HTMLFormElement>) {
//     const isEmptyText1 =
//       event.target.name === "text1" && event.target.value === "";
//     if (isEmptyText1) {
//       submit(event.currentTarget, { method: "delete" });
//     }
//   }

//   const [referenceElement, setReferenceElement] = useState(null);
//   const [popperElement, setPopperElement] = useState(null);
//   const [arrowElement, setArrowElement] = useState(null);
//   const { styles, attributes } = usePopper(referenceElement, popperElement, {
//     modifiers: [{ name: "arrow", options: { element: arrowElement } }],
//     placement: "top",
//   });
//   const [isOpen, setIsOpen] = useState(false);

//   const handleOuterClick = React.useCallback(
//     (event: Event) => {
//       if (
//         !popperElement ||
//         (popperElement as any).contains(event.target as Node) ||
//         !referenceElement ||
//         (referenceElement as any).contains(event.target as Node)
//       ) {
//         return;
//       }

//       setIsOpen(false);
//     },
//     [popperElement, referenceElement]
//   );

//   React.useEffect(() => {
//     document.addEventListener("mousedown", handleOuterClick);
//     return () => {
//       document.removeEventListener("mousedown", handleOuterClick);
//     };
//   }, [handleOuterClick, popperElement, referenceElement]);

//   return (
//     <AutoSubmitForm onBlur={handleBlur}>
//       <MetaInput name="model" value="item" />
//       <MetaInput name="id" value={item.id} />
//       <MetaInput name="_action" value={"update"} />
//       <fieldset
//         ref={setReferenceElement as any}
//         className="flex items-center gap-2"
//       >
//         <TextInput
//           name="text1"
//           className="m-auto w-full"
//           defaultValue={item.text1 || ""}
//           placeholder="Nuevo..."
//           autoFocus={!hasText1}
//           onFocus={() => setIsOpen(true)}
//         />
//         {isOpen && (
//           <div
//             ref={setPopperElement as any}
//             style={styles.popper}
//             {...attributes.popper}
//             className="inline-block w-20 rounded-md border-2 border-solid border-blue-200 bg-white px-2 py-1 font-bold text-blue-800"
//           >
//             <Trash className="text-blue-400" onClick={console.log} />
//             <div
//               ref={setArrowElement as any}
//               style={styles.arrow}
//               className="absolute -bottom-1 hidden h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:bg-inherit before:content-['']"
//             />
//           </div>
//         )}
//         <label className="relative flex font-bold">
//           <span
//             className={clsx("absolute left-1", {
//               "italic text-gray-400": !hasPrice1,
//             })}
//           >
//             $
//           </span>
//           <input
//             type="number"
//             name="price1"
//             className="max-w-[56px] bg-inherit pr-1 pl-2 text-right placeholder:italic"
//             defaultValue={item.price1 || ""}
//             placeholder="100"
//             min={0}
//             max={9999}
//           />
//         </label>
//       </fieldset>
//     </AutoSubmitForm>
//   );
// }

// export { ItemInput };
