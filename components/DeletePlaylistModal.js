import Modal from "./Modal";

import Spinner from "./Spinner";

import { useState } from "react";
import { MdDeleteOutline, MdClear } from "react-icons/md";
import { deletePlaylist } from "../_api/api";
import { useRouter } from "next/router";

import notify from "../lib/notifier";

function DeletePlaylistModal({ ownsPlaylist, playlistSlug, playlistTitle }) {
  const [show, setShow] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  return (
    <>
      {show && (
        <Modal show={show} toClose={() => setShow(false)}>
          <div className="flex items-center justify-between w-full">
            <h1 className="text-2xl font-bold">Delete Playlist?</h1>
            <MdClear
              size={35}
              className="cursor-pointer"
              onClick={() => setShow(false)}
            />
          </div>

          <div className="flex items-center mt-8">
            <div
              onClick={async () => {
                setIsDeleting(true);
                await deletePlaylist(playlistSlug);
                setIsDeleting(false);
                router
                  .push("/home")
                  .then(() => notify(`Deleted ${playlistTitle}`, "delete"));
              }}
              className="rounded-lg border-2 border-transparent bg-error dark:bg-darkError px-8 py-2 cursor-pointer text-darkText"
            >
              {isDeleting ? (
                <Spinner />
              ) : (
                <span className=" flex items-center">
                  <MdDeleteOutline className="mr-1" size={25} />
                  Yes
                </span>
              )}
            </div>
            <div
              onClick={() => setShow(false)}
              className="rounded-lg border-2 border-text dark:border-darkText px-8 py-2 ml-8 cursor-pointer "
            >
              <span className=" flex items-center">
                <MdClear className="mr-1" size={25} />
                No
              </span>
            </div>
          </div>
        </Modal>
      )}
      <MdDeleteOutline
        className={`${
          ownsPlaylist
            ? "text-error dark:text-darkError cursor-pointer"
            : "text-textGrayed"
        } ml-4`}
        size={25}
        onClick={() => ownsPlaylist && setShow(true)}
      />
    </>
  );
}

export default DeletePlaylistModal;
