"use client";

import Popup from "@/components/Popup/Popup";
import { useState } from "react";

const Page = () => {
  const [open, setOpen] = useState(false);
  const togglePopUp = () => setOpen(!open);
  const log = () => console.log("hola");
  return (
    <div>
      <p>Hi I am page</p>
      <button onClick={togglePopUp}>Open modal</button>
      <Popup open={open} close={togglePopUp}>
        <Content callback={log}></Content>
      </Popup>
    </div>
  );
};

export default Page;

const Content = ({ callback }) => {
  return (
    <div className="w-[calc(100vw-100px) h-[calc(100vh/2)] ">
      <p>This is content</p>
      <button onClick={callback}>Call callback</button>
    </div>
  );
};
