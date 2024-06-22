import { useEffect, useRef, useState } from "react";

import { ChevronDownIcon } from "@heroicons/react/24/outline";

type Option = {
  value?: string | number;
  title: string | number;
};

export default function CustomSelect({
  options,
  selected,
  onChange,
  placeholder,
}: {
  options: Readonly<Option[]>;
  onChange: (value: string | number | undefined) => void;
  selected?: Readonly<Option>;
  placeholder?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const selectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !event.composedPath().includes(selectRef.current!)
      )
        setIsOpen(false);
    };

    (isOpen ? document.addEventListener : document.removeEventListener)(
      "click",
      handleOutsideClick,
    );

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isOpen]);

  useEffect(() => {}, [selected]);

  return (
    <div className="custom-select" ref={selectRef}>
      <div
        className="input"
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        {selected ? selected.title : placeholder ?? "-"}
        <ChevronDownIcon className={isOpen ? "open" : ""} />
      </div>
      <ul className={"dropdown" + (isOpen ? " open" : "")}>
        {selected !== undefined && (
          <li
            onClick={() => {
              onChange(undefined);
              setIsOpen(false);
            }}
          >
            {placeholder ?? "-"}
          </li>
        )}
        {options
          .filter(
            ({ value, title }) =>
              (value ?? title) !== (selected?.value ?? selected?.title),
          )
          .map((option) => (
            <li
              key={option?.value ?? option.title}
              onClick={() => {
                onChange(option?.value ?? option.title);
                setIsOpen(false);
              }}
            >
              {option.title}
            </li>
          ))}
      </ul>
    </div>
  );
}
