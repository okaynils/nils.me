import { useEffect, useState } from 'react';
import { getArtists } from '../pages/api/music';
import Link from "next/link";
import clsx from "clsx";
import { ArrowRight, Guitar, MicrophoneStage, PianoKeys, MusicNote, VinylRecord } from "@phosphor-icons/react";

const icons = [Guitar, MicrophoneStage, PianoKeys, MusicNote, VinylRecord];

export default function MusicList() {
    const [artists, setArtists] = useState([]);
    const [loadingIconIndex, setLoadingIconIndex] = useState(0);

    useEffect(() => {
        getArtists().then((artists) => {
            setArtists(artists);
            console.log(artists);
        });

        const iconInterval = setInterval(() => {
            setLoadingIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
        }, 500); // Change icon every 500ms

        return () => clearInterval(iconInterval);
    }, []);

    const LoadingIcon = icons[loadingIconIndex];

    return (
        <div>
            {artists.length > 0 ? (
                <div>
                    {artists.map((artist) => (
                        <Link href={artist.url} target="_blank" key={artist.name}>
                            <article
                                className={clsx(
                                    "flex font-medium w-full py-3 md:py-[8px] dark:text-white items-center justify-between",
                                    "transition duration-300 ease-in-out group"
                                )}
                            >
                                <h2 className="inline-flex items-center">
                                    <span>{artist.name}</span>
                                    <ArrowRight 
                                        size={16} 
                                        className="ml-2 transition-all duration-300 ease-in-out transform opacity-0 group-hover:opacity-100 group-hover:translate-x-1" 
                                    />
                                </h2>
                                <div className="font-normal opacity-60 dark:opacity-40">
                                    {artist.playcount} plays
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="flex items-center">
                    <LoadingIcon size={18} className="mr-2" />
                    <p>Artists are loading<span className="animate-pulse">...</span></p>
                </div>
            )}
        </div>
    );
}
