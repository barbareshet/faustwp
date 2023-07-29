import React from 'react';
import Image from "next/image";
import Link from "next/link";
function AlbumCard({album}) {
    // const {albumFields} = album;
    console.log(album)
    return (
        <Link href={`/albums/${album.slug}`} className="album-card">
            <Image src={album?.albumFields?.cover?.mediaItemUrl} width={300} height={300} alt={album?.albumFields?.albumTitle}/>
        </Link>
    );
}

export default AlbumCard;