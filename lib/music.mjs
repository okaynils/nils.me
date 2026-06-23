export function getArtists() {
  const params = new URLSearchParams({
    method: "user.gettopartists",
    user: process.env.NEXT_PUBLIC_LASTFM_USERNAME,
    api_key: process.env.NEXT_PUBLIC_LASTFM_API_KEY,
    format: "json",
    limit: "5",
    period: process.env.NEXT_PUBLIC_LASTFM_TIME_PERIOD,
  });

  return fetch(`https://ws.audioscrobbler.com/2.0/?${params}`)
    .then((res) => res.json())
    .then(
      (data) => data.topartists?.artist ?? [],
      () => []
    );
}
