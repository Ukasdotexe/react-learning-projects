import { useState } from "react";

export function Box({ className, children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={className}>
      <span onClick={() => setIsOpen((open) => !open)} className="circle">
        {isOpen ? "-" : "+"}
      </span>

      {isOpen && children}
    </div>
  );
}
