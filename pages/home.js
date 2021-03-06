import Layout from "../components/Layout";

import PlaylistCard from "../components/PlaylistCard";
import SkPlaylistCard from "../components/skeletons/SkPlaylistCard";
import AddNewCard from "../components/AddNewCard";
import Spinner from "../components/Spinner";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { getUserPlaylists, starPlaylist } from "../_api/api";

import { generateTimeOfDay } from "../lib/helpers";

export default function Home() {
  const [playlists, setPlaylists] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      const playlists = await getUserPlaylists();

      setPlaylists(playlists);
    })();
  }, []);

  const _starPlaylist = async (id) => {
    await starPlaylist(id);
    const newPlaylists = await getUserPlaylists();
    setPlaylists(newPlaylists);
  };

  return (
    <Layout activeIndex={0}>
      <h1 className="text-text dark:text-darkText text-2xl font-semibold lg:text-4xl">
        Good {generateTimeOfDay()}, {session.user.name.split(" ")[0]}
      </h1>

      <h3 className="text-textGrayed font-normal text-xl mt-4">
        Your Playlists
      </h3>
      <div className="flex flex-col items-center w-full md:grid md:grid-cols-3 md:grid-rows-auto md:gap-8 md:mt-4">
        {playlists ? (
          playlists.map((playlist) => (
            <PlaylistCard
              playlist={playlist}
              toToggleStar={_starPlaylist}
              key={playlist.slug}
            />
          ))
        ) : (
          <>
            <SkPlaylistCard />
            <SkPlaylistCard />
            <SkPlaylistCard />
            <SkPlaylistCard />
            <SkPlaylistCard />
          </>
        )}
        <AddNewCard />
      </div>
    </Layout>
  );
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
