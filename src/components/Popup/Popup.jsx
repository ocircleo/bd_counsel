import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
const Popup = ({ open, close, children }) => {
   const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      const timeout = setTimeout(() => setVisible(false), 250);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-base-300/200 backdrop-blur-sm transition-opacity duration-300"
        onClick={close}
      />

      {/* Popup Box */}
      <div
        className="
          relative z-10
          w-full md:w-auto md:min-w-md
          rounded-lg bg-base-200  p-6 shadow-xl
          transform transition-all duration-300
          scale-100 opacity-100
          animate-popup-in
        "
      >
        {/* Close Button */}
        <button
          onClick={close}
          className="
            absolute top-2 right-2
            rounded px-2 py-1 text-sm
            text-base-500 hover:text-black
          "
        >
          <RxCross2 className="font-bold text-xl cursor-pointer"/>
        </button>

        {children}
      </div>
    </div>
  );
};

export default Popup;
