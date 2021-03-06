import Latex from "react-latex-next";
import Link from "next/link";
import { MdStar, MdStarOutline, MdArrowForward } from "react-icons/md";

import { useState } from "react";

import PlaylistItemModal from "./PlaylistItemModal";

function PlaylistItem({ toSaveItem, topic, ownsPlaylist, index, toggleStar }) {
  const [isStarred, setIsStarred] = useState(topic.isStarred);
  return (
    <div className="px-4 w-full bg-white dark:bg-darkElevated rounded-xl h-16 flex justify-between items-center mt-3 group border-2 border-transparent hover:border-primary dark:hover:border-darkPrimary transition">
      <div className="flex items-center w-full pr-2">
        <h3 className="hidden md:block text-textGrayed w-3 text-center">
          {index + 1}
        </h3>
        <div
          className={`md:hidden ${ownsPlaylist ? "cursor-pointer" : ""} `}
          onClick={() => {
            if (ownsPlaylist) {
              setIsStarred((prev) => !prev);
              toggleStar(index);
            }
          }}
        >
          {isStarred ? (
            <MdStar className="text-warning dark:text-darkWarning" size={25} />
          ) : (
            <MdStarOutline
              className=" text-warning dark:text-darkWarning"
              size={25}
            />
          )}
        </div>
        <div className="block md:flex md:items-center">
          <h3 className="text-text dark:text-darkText ml-2  lg:ml-8 truncate">
            {topic.topic.title}
          </h3>
          <div
            onClick={() => {
              if (ownsPlaylist) {
                setIsStarred((prev) => !prev);
                toggleStar(index);
              }
            }}
          >
            {isStarred ? (
              <MdStar
                className={`hidden md:block ${
                  ownsPlaylist ? "cursor-pointer" : ""
                }  text-warning dark:text-darkWarning ml-3`}
                size={25}
              />
            ) : (
              <MdStarOutline
                className={`hidden md:block ${
                  ownsPlaylist ? "cursor-pointer" : ""
                }  text-warning dark:text-darkWarning ml-3`}
                size={25}
              />
            )}
          </div>
        </div>
      </div>
      <div className="w-1/2 hidden md:block text-textGrayed dark:text-darkText ">
        <Latex>{`$${topic.topic.example}$`}</Latex>
      </div>
      <div className="flex w-full md:w-1/2 justify-end md:justify-between">
        <div className="w-16 hidden md:block"></div>
        <div className="flex items-center">
          <Link href={`/practice/${topic.topic.id}`}>
            <div className="text-primary dark:text-darkPrimary font-bold hidden cursor-pointer lg:flex lg:items-center ">
              <MdArrowForward size={20} className="ml-2" />
            </div>
          </Link>
          <PlaylistItemModal toSave={toSaveItem} index={index} topic={topic} />
        </div>
      </div>
    </div>
  );
}

export default PlaylistItem;
