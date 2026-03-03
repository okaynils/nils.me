export function getLastCommitDate() {
    return fetch("https://api.github.com/repos/okaynils/nils.me/commits?per_page=1")
        .then(res => res.json())
        .then(
            (data) => {
                if (Array.isArray(data) && data[0]?.commit?.author?.date) {
                    return data;
                }
                return null;
            },
            (error) => {
                console.error(error);
                return null;
            }
        );
}
