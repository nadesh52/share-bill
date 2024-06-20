"use client";
import { useState } from "react";

const TabContainer = ({ children }: any) => {
  const [activeTab, setActiveTab] = useState(children[1].props.id);

  const handleClick = (event: any, newActiveTab: any) => {
    event.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <>
      <section className="flex border-b">
        {children.map((child: any) => (
          <button
            key={child.props.id}
            className={`${
              activeTab === child.props.id ? "border-b-2 border-primary" : ""
            } flex-1 text-primary font-medium py-2`}
            onClick={(e) => handleClick(e, child.props.id)}
          >
            {child.props.id}
          </button>
        ))}
      </section>

      <article>
        {children.map((child: any) => {
          if (child.props.id === activeTab) {
            return (
              <section key={child.props.id}>{child.props.children}</section>
            );
          }
          return null;
        })}
      </article>
    </>
  );
};

const Tab = ({ Children }: any) => {
  return <>{Children}</>;
};

export { TabContainer, Tab };
