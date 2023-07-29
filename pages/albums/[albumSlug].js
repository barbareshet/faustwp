import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import SongListItem from "@/components/SiteComponents/SongListItem";
function Album() {

    const { query = {} } = useRouter();
    const { albumSlug } = query;

    const { loading, error, data } = useQuery(GET_ALBUM_DETAILS, {
        variables: { albumSlug }
    });

    const albumData = data?.album?.albumFields;

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    console.log(albumData?.genre)

    return(
        <>
            <Link href="/albums">
                <p> &#x2190; View All Albums</p>
            </Link>
            <Layout heroTitle={albumData.albumTitle}>
                <div className="single-album">
                    <p className="details">Released on {albumData.releaseDate}</p>
                    <img className="cover" src={albumData?.cover?.mediaItemUrl} alt={albumData?.albumTitle} layout="fill"/>
                    <p className="details">
                        Genre:&nbsp;
                        {albumData
                            .genre.map((genre) => genre.name)
                            .join(", ")}
                    </p>
                    <h3 className="details">Track List</h3>
                    <ol className="trackList">
                        {albumData.trackList ?
                            albumData.trackList.map((song) => (
                            <SongListItem song={song} album={albumData}/>
                        )) :
                            <>Track List Empty</>
                        }
                    </ol>
                </div>
            </Layout>
        </>
    );
}

export default Album;


const GET_ALBUM_DETAILS = gql`
query GetAlbumDetails($albumSlug: ID!) {
    album(id: $albumSlug, idType: SLUG) {
    albumFields {
      albumTitle
      genre {
        name
      }
      cover {
        mediaItemUrl
        altText
      }
      releaseDate
      trackList {
        ... on Song {
          id
          databaseId
          slug
          songFields {
            songTitle
            length
          }
        }
      }
    }
  }
}`