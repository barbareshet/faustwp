import { gql, useQuery } from "@apollo/client";
import AlbumCard from "@/components/SiteComponents/AlbumCard";
import Layout from "@/components/Layout";

function Albums(props) {
    const { loading, error, data } = useQuery(GET_ALBUMS);


    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    console.log(data)
    return (
        <Layout heroTitle="Albums Page">
            <ul className="gallery">
                {data.allAlbum.nodes.map((album) => (
                    <li key={album.databaseId} className="galleryItem">
                        <AlbumCard album={album} />
                    </li>
                ))}
            </ul>
        </Layout>
    );
}

export default Albums;


const GET_ALBUMS = gql`
  query getAlbums {
    allAlbum(first: 50) {
      nodes {
        albumFields {
          cover {
            databaseId
            mediaItemUrl
          }
          releaseDate
          albumTitle
        }
        databaseId
        slug
      }
    }
  }
`;
