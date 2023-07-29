import React from 'react';
import Link from "next/link";

function SongListItem({song, album}) {

    return (
        <li key={song.id} className="song listItem">
            <Link href={`/songs/${song.slug}`}>
                <a>
                    <span>{song.songFields.songTitle}</span>
                    <span>{song.songFields.length}</span>
                </a>
            </Link>
        </li>
    );
}

export default SongListItem;