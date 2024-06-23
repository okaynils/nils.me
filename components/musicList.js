import { getArtists } from '../pages/api/music';

export default function MusicList() {
    const artists = getArtists();

    return (
        <div>
            { artists }
        </div>
    );
}