import { MdKeyboardArrowDown, MdCheck, MdClear } from "react-icons/md";

import { useState } from "react";
import Latex from "react-latex-next";
function CompletedTopic({ number, topic }) {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="flex flex-col">
      {/* header part  */}
      <div
        onClick={() => setShowDropdown((prev) => !prev)}
        className="cursor-pointer h-16 px-4 rounded-xl bg-white dark:bg-darkElevated flex items-center justify-between w-full"
      >
        <div className="flex items-center">
          <h3 className="text-textGrayed">{number}</h3>
          <h3 className="text-text dark:text-darkText ml-4 font-bold text-sm lg:text-lg select-none">
            {topic.title}
          </h3>
        </div>
        <MdKeyboardArrowDown
          className="text-text dark:text-darkText"
          size={30}
        />
      </div>
      {/* topic questions part  */}
      <div
        className={`${
          showDropdown
            ? `max-h-[${(topic.completedQuestions.length * 4).toString()}rem]`
            : "max-h-0 "
        } origin-top mb-4 overflow-hidden duration-500 transition-all`}
      >
        {/* topic question  */}
        {topic.completedQuestions.map((question, index) => (
          <div
            className={`${
              question.isCorrect
                ? "border-l-success"
                : "border-l-error dark:border-l-darkError"
            } ml-8 border-l-2 rounded-lg my-2 flex items-center px-4 bg-white dark:bg-darkElevated w-full h-14`}
            key={index}
          >
            <h3 className="hidden lg:block text-textGrayed">{index + 1}</h3>

            <div className="lg:ml-2">
              {question.isCorrect ? (
                <MdCheck className="text-success" />
              ) : (
                <MdClear className="text-error dark:border-l-darkError" />
              )}
            </div>

            <h3 className="hidden lg:block text-textGrayed ml-2 text-sm">
              Question
            </h3>
            <div className="ml-4 text-sm">
              <Latex>{`$${question.latex}$`}</Latex>
            </div>
            <h3 className="hidden lg:block text-textGrayed ml-4 text-sm">
              You Responded
            </h3>
            <div className="ml-2 text-sm">
              <Latex>{`$${
                question.userResponses[0] == "Skipped"
                  ? "\\text{Skipped}"
                  : question.userResponses[0]
              }$`}</Latex>
            </div>
            <h3 className="hidden lg:block text-textGrayed ml-4 text-sm">
              Correct Answer
            </h3>
            <div className="ml-2 text-sm">
              <Latex>{`$${question.solution}$`}</Latex>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompletedTopic;
