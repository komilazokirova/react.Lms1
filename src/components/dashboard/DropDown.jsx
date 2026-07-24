import { useEffect, useRef } from "react";

function Dropdown({
  open,
  onClose,
  children,
  className = "",
}) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        onClose();
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      ref={dropdownRef}
      className={`absolute -right-2 p-2 top-16 w-40 border rounded-xl bg-white shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}

export default Dropdown;