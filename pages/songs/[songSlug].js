import React from 'react';
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Link from "next/link";
function SongSlug(props) {
    const { query = {} } = useRouter();
    const { songSlug } = query;

    const { loading, error, data } = useQuery(GET_SONG_DETAILS, {
        variables: { songSlug }
    });

    const songData = data?.song?.songFields;
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    return (
        <>
            <Link href="/albums" className="backButton">
                <p> &#x2190; View All Albums</p>
            </Link>
            <Layout heroTitle={songData.songTitle}>
                <div className="single-song">
                    <p className="details">Song Length: {songData.length}</p>

                    <h3 className="details">Lyrics</h3>
                    <div className="details lyrics">{songData.lyrics}</div>
                </div>
            </Layout>
        </>
    );
}

export default SongSlug;


const GET_SONG_DETAILS = gql`
  query getSongDetails($songSlug: ID!) {
    song(id: $songSlug, idType: SLUG) {
      songFields {
        songTitle
        lyrics
        length
        genre {
          name
        }
      }
    }
  }
`;