import Sidebar from "../components/Sidebar";

import { MdEdit } from "react-icons/md";

import { useState, useEffect } from "react";
import axios from "axios";

import CreateSearchResult from "../components/CreateSearchResult";
import AddedTopic from "../components/AddedTopic";
import MiniSpinner from "../components/MiniSpinner";
import { getSession } from "next-auth/react";
function Create() {
  const [results, setResults] = useState([]);
  const [inputPrompt, setInputPrompt] = useState("");
  const [resultsLoading, setResultsLoading] = useState(true);
  const [addedTopics, setAddedTopics] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState("");

  useEffect(() => {
    let reqPrompt = inputPrompt;
    if (reqPrompt === "") {
      reqPrompt = "all";
    }

    (async () => {
      setResultsLoading(true);
      const res = await axios.get(`/api/search?prompt=${reqPrompt}`);
      const data = res.data;
      setResults(data.results);

      setResultsLoading(false);
    })();
  }, [inputPrompt]);

  const addTopic = (topic) => {
    setAddedTopics((topics) => [...topics, topic]);
  };
  const removeTopic = (topic) => {
    setAddedTopics((topics) => topics.filter((_topic) => _topic !== topic));
  };
  return (
    <div className="flex justify-center w-screen h-screen bg-lightBg overflow-y-auto ">
      <div className="flex w-full px-4 md:w-5/6 md:px-0 z-0">
        <Sidebar activeIndex={3} />
        <div className="flex flex-col py-24 w-full items-start  lg:w-full lg:ml-16 lg:overflow-y-auto lg:px-8">
          <div className="flex items-center">
            <input
              className="text-3xl lg:text-5xl text-text rounded-none font-bold outline-none bg-transparent w-full lg:w-1/2 border-b-textGrayed border-b-2 focus:border-b-primary  transition"
              type="text"
              placeholder="My New Playlist #55"
              onChange={(e) => setPlaylistTitle(e.target.value)}
            ></input>
            <MdEdit size={30} color="#000000" className=" ml-2 lg:ml-4" />
            <div
              onClick={async () => savePlaylist(playlistTitle, addedTopics)}
              className="hidden md:block bg-primary text-white rounded-xl px-4 py-2 font-bold ml-4 text-xl cursor-pointer"
            >
              Save
            </div>
          </div>
          <h3 className="text-textGrayed mt-4">by Leon Rode</h3>
          <div className=" md:hidden bg-primary text-white rounded-xl px-4 py-2 font-bold text-xl cursor-pointer mt-4">
            Save
          </div>
          <div className="w-full flex flex-col lg:w-3/4 mt-4">
            {addedTopics.map((topic, i) => (
              <AddedTopic
                topic={topic}
                removeHandler={removeTopic}
                number={i}
                key={topic.meta.title}
              />
            ))}
          </div>

          <h3 className="text-text text-lg mt-4 md:mt-8">
            Start by searching for some topics
          </h3>

          <div className="flex w-full items-center mt-4 lg:w-3/4 relative">
            <input
              className="border-2 border-textGrayed bg-red h-12  px-5 pr-16 py-2 lg:rounded-md rounded focus:outline-none focus:border-primary focus:border-2 w-full text-black text-lg  transition-[border]"
              type="text"
              placeholder="Search for a topic"
              onChange={(e) => {
                setInputPrompt(e.target.value);
              }}
            />
            {resultsLoading && <MiniSpinner />}
          </div>
          <div className="flex justify-between w-full lg:w-3/4 px-2 md:px-8 my-4 ">
            <div className="flex w-1/2">
              <h3 className="text-textGrayed ">Topic</h3>
            </div>
            <div className="flex w-1/2 justify-start">
              <h3 className="text-textGrayed">Example</h3>
            </div>
          </div>
          <div className="flex flex-col w-full lg:w-3/4 mt-2">
            {results.map((result) => (
              <CreateSearchResult
                topic={result}
                key={result.meta.title}
                addHandler={addTopic}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

async function savePlaylist(title, topics) {
  if (title === "") title = "My New Playlist #55";
  const res = await axios.post("/api/playlist/create", { title, topics });
  console.log(res);
}
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: session,
  };
}

export default Create;
