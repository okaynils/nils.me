import { useEffect, useState } from 'react';
import { getArtists } from 'lib/music.mjs';
import Link from "next/link";
import { Guitar, MicrophoneStage, PianoKeys, MusicNote, VinylRecord } from "@phosphor-icons/react";

const icons = [Guitar, MicrophoneStage, PianoKeys, MusicNote, VinylRecord];

export default function MusicList() {
    const [artists, setArtists] = useState([]);
    const [loadingIconIndex, setLoadingIconIndex] = useState(0);

    useEffect(() => {
        getArtists().then((artists) => {
            setArtists(artists);
        });

        const iconInterval = setInterval(() => {
            setLoadingIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
        }, 500); // Change icon every 500ms

        return () => clearInterval(iconInterval);
    }, []);

    const LoadingIcon = icons[loadingIconIndex];

    return (
        <div>
            {artists?.length > 0 ? (
                <ol className="space-y-1">
                    {artists.map((artist) => (
                        <li className="grid text-sm md:grid-cols-[1fr_auto] md:gap-x-4" key={artist.name}>
                            <Link href={artist.url} target="_blank" rel="noopener noreferrer">
                                <span>{artist.name}</span>
                            </Link>
                            <span className="plain-meta">
                                {artist.playcount} plays
                            </span>
                        </li>
                    ))}
                </ol>
            ) : (
                <div className="plain-meta my-3 flex items-center">
                    <LoadingIcon size={18} className="mr-2" />
                    <p>Artists are loading<span className="animate-pulse">...</span></p>
                </div>
            )}
        </div>
    );
}
