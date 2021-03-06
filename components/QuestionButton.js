import Latex from "react-latex-next";

function QuestionButton({ index, toClick, content }) {
  return (
    <div
      onClick={toClick}
      className={`${
        index !== 0 ? "ml-4" : ""
      } w-10 h-10 bg-primary dark:bg-darkPrimary rounded-lg flex items-center justify-center cursor-pointer`}
    >
      <Latex>{`$${content}$`}</Latex>
    </div>
  );
}

export default QuestionButton;
