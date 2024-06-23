export function getArtists() {
    return fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettopartists
            &user=${process.env.NEXT_PUBLIC_LASTFM_USERNAME}
            &api_key=${process.env.NEXT_PUBLIC_LASTFM_API_KEY}
            &format=json
            &limit=5
            &period=${process.env.NEXT_PUBLIC_LASTFM_TIME_PERIOD}`)
        .then(res => res.json())
        .then(
            (data) => {
                return data.topartists.artist;
            },
            (error) => {
                return [];
            }
        );
}
