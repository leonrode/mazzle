import { MdOutlineMoreVert } from "react-icons/md";

import { isMobile, isTablet } from "react-device-detect";

import Link from "next/link";

import Latex from "react-latex-next";

function SearchResult({ title, example, number, _id }) {
  const children = (
    <div className="px-4 w-full bg-white rounded-xl h-16 flex justify-between items-center mt-3 group border-2 border-white hover:border-primary transition">
      <div className="flex w-1/2 pr-2">
        <h3 className="text-text truncate">{title}</h3>
      </div>
      <div className="flex w-1/2 justify-between">
        <div className="text-textGrayed">
          <Latex>{`$${example}$`}</Latex>
        </div>
        <div className="flex items-center">
          <Link href={`/practice/${_id}`}>
            <h3 className="text-primary font-bold hidden cursor-pointer lg:flex lg:items-center ">
              Practice{" "}
            </h3>
          </Link>
          <MdOutlineMoreVert
            color="#000000"
            size={20}
            className="lg:ml-4 lg:cursor-pointer lg:group-hover:visible lg:invisible hover:bg-divider transition rounded-sm"
          />
        </div>
      </div>
    </div>
  );
  return isMobile || isTablet ? (
    <Link href={`/practice/${_id}`}>{children}</Link>
  ) : (
    children
  );
}

export default SearchResult;
