import { useState, useEffect } from "react";
import ServeLangItem from "../ServeLangItem";

export default function Selectbox({
  datas = [],
  defaultValue = "",
  className,
  action,
  children,
}) {
  const [item, setItem] = useState({ name: defaultValue });
  const [toggle, setToggle] = useState(false);
  const handler = (e, value) => {
    if (action) {
      action(value);
    }
    setItem(value);
    setToggle(!toggle);
  };
  useEffect(() => {
    if (defaultValue) {
      setItem({ name: defaultValue });
    } else {
      setItem({ name: "Select" });
    }
  }, [datas, defaultValue]);

  return (
    <>
      <div className={`my-select-box ${className || ""}`}>
        <button
          onClick={() => setToggle(!toggle)}
          type="button"
          className="my-select-box-btn "
        >
          {children ? (
            children({ item: item && item.name })
          ) : (
            <span>{item && item.name}</span>
          )}
        </button>
        {toggle && (
          <div className="click-away" onClick={() => setToggle(!toggle)}></div>
        )}
        <div className={`my-select-box-section ${toggle ? "open" : ""}`}>
          <ul className="list">
            <li className="cursor-not-allowed selected pointer-events-none">
              {ServeLangItem()?.Select_One}


            </li>
            {datas &&
              datas.length > 0 &&
              datas.map((value) => (
                <li
                  className={item && item.name === value.name ? "selected" : ""}
                  key={Math.random()}
                  onClick={(e) => handler(e, value)}
                >
                  {value.image?(
                      <div className="flex space-x-5 items-center p-2">
                        <div className="w-10 h-10">
                          <img src={process.env.NEXT_PUBLIC_BASE_URL+value.image} alt="" className="w-full h-full object-cover"/>
                        </div>
                        <span>{value.name}</span>
                      </div>
                  ):(<span>{value.name}</span>)}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
