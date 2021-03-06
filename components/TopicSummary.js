import SummaryQuestion from "./SummaryQuestion";

import { MdClear, MdCheck } from "react-icons/md";

import { useState, useEffect } from "react";

function TopicSummary({
  topicTitle,
  correctNumber,
  incorrectNumber,
  noQuestions,
  completedQuestions,
  toRestart,
  toNextTopic,
  canRestart,
}) {
  console.log(completedQuestions);
  return (
    <div className="mt-4 w-full md:w-3/4">
      <h1 className="text-textGrayed">Topic Summary</h1>
      <div className="flex items-center">
        <h3 className="text-3xl font-bold mt-2">{topicTitle}</h3>
      </div>
      <div className="flex items-center mt-2">
        {/* percentage */}
        <h3 className="font-bold text-lg text-text dark:text-darkText">
          {Math.floor((correctNumber / noQuestions) * 100)}%
        </h3>

        <h3 className="text-lg ml-4 text-success dark:text-darkSuccess flex items-center">
          {correctNumber}

          <MdCheck size={20} />
        </h3>
        <h3 className="ml-2 text-lg text-error dark:text-darkError flex items-center">
          {incorrectNumber}

          <MdClear size={20} />
        </h3>
      </div>
      <div className="flex items-center mt-2">
        {canRestart && (
          <div
            onClick={toRestart}
            className="cursor-pointer bg-transparent border-2 text-text dark:text-darkText border-primary dark:border-darkPrimary w-fit p-2 text-sm rounded-md text-center"
          >
            Restart topic
          </div>
        )}
        <div
          onClick={toNextTopic}
          className={`cursor-pointer ${
            canRestart && "ml-2"
          } bg-primary border-2 border-transparent dark:bg-darkPrimary w-fit p-2 text-sm rounded-md text-center text-darkText `}
        >
          Continue
        </div>
      </div>

      <h3 className="text-textGrayed mt-4">Review Questions</h3>

      {completedQuestions.map((question, index) => (
        <SummaryQuestion
          number={index}
          key={index}
          isLast={index === completedQuestions.length - 1}
          questionLatex={question.latex}
          userResponses={question.userResponses}
          solution={question.solution}
          isCorrect={question.isCorrect}
        />
      ))}
    </div>
  );
}

export default TopicSummary;
