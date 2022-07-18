import { useState, useEffect, useRef, useCallback } from "react";
import * as React from "react";
// import { useOnClickOutside } from "src/hooks";

// Make this EditText component.
// OR
// Make an invisible span to get the text width 
// to know where to insert the edit icon.
// AND hide it whenever the input is on focus.

type Props = {
  value: string;
  onStartEdit: () => void;
  onChange: (value: string, isClickOutside?: boolean) => void;
  showEditMode: boolean;
};

const EditableText = ({
  value,
  onChange,
  onStartEdit,
  showEditMode = false
}: Props) => {
  const input = useRef<HTMLInputElement>(null);

  const [localValue, setLocalValue] = useState(value);
  useEffect(
    function updateLocalText() {
      setLocalValue(value);
    },
    [value]
  );

  const handleStartEdit = useCallback(() => {
    setIsEditing(true);
    onStartEdit();
  }, [onStartEdit]);

  const [isEditing, setIsEditing] = useState(false);
  useEffect(
    function handleShowEditMode() {
      if (showEditMode && !isEditing) {
        handleStartEdit();
      }
    },
    [showEditMode, handleStartEdit, isEditing]
  );

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const pressedEnter = event.key === "Enter";
    if (pressedEnter) {
      handleSubmit();
    }
  };

  const handleSubmit = (isClickOutside = false) => {
    if (isEditing) {
      onChange(localValue, isClickOutside);
      setLocalValue(value);
      setIsEditing(false);
    }
  };

  // useOnClickOutside(input, () => {
  //   handleSubmit(true);
  // });

  return isEditing ? (
    <input
      type="text"
      autoFocus
      ref={input}
      value={localValue}
      onChange={event => {
        setLocalValue(event.target.value);
      }}
      onBlur={() => {
        handleSubmit(true);
      }}
      onKeyDown={handleKeyDown}
      onClick={event => {
        event.stopPropagation();
      }}
    />
  ) : (
    <span
      style={{ cursor: "text" }}
      onDoubleClick={handleStartEdit}
      onClick={event => {
        event.stopPropagation();
      }}
      title={value}
    >
      {value}
    </span>
  );
};

export { EditableText };
