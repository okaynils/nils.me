export function getArtists() {
    const username = process.env.NEXT_LASTFM_USERNAME;
    const api_key = process.env.NEXT_LASTFM_API_KEY;
    const time_period = process.env.NEXT_LASTFM_TIME_PERIOD;

    fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${api_key}&format=json&limit=5&period=${time_period}`)
        .then(res => res.json())
        .then(
            (data) => {
                return data["topartists"]["artist"];
            },
            (error) => {
                console.log(error)
            }
        )
}