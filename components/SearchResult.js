import { MdOutlineMoreVert, MdArrowForward, MdAdd } from "react-icons/md";

import { isMobile, isTablet } from "react-device-detect";

import Link from "next/link";

import Latex from "react-latex-next";

import AddToPlaylistModal from "./AddToPlaylistModal";
function SearchResult({ topic }) {
  const children = (
    <div className="  px-2 lg:px-4 w-full bg-white dark:bg-darkElevated rounded-xl h-16 flex justify-between items-center mt-3 group border-2 border-white dark:border-transparent hover:dark:border-darkPrimary hover:border-primary transition">
      <div className="flex md:w-1/2 pr-2">
        <h3 className="text-text text-sm lg:text-lg dark:text-darkText  truncate ">
          {topic.title}
        </h3>
      </div>

      <div className="md:w-1/2 text-textGrayed dark:text-darkText hidden md:block">
        <Latex>{`$${topic.example}$`}</Latex>
      </div>
      <div className="flex justify-end lg:justify-between">
        <div className="flex items-center">
          <Link href={`/practice/${topic.id}`}>
            <div className="text-primary dark:text-darkPrimary font-bold hidden cursor-pointer lg:flex lg:items-center ">
              <MdArrowForward size={20} className="ml-2" />
            </div>
          </Link>

          <div className=" text-text dark:text-darkText">
            <AddToPlaylistModal topic={topic} />
          </div>
        </div>
      </div>
    </div>
  );
  return isMobile || isTablet ? (
    <Link href={`/practice/${topic.id}`}>{children}</Link>
  ) : (
    children
  );
}

export default SearchResult;
