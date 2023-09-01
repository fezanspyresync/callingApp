export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI2NzY1YmI2NC1jMjMxLTQ1ZDctODVlYy05N2YyMTdkYjhlZTkiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY5MzI4NzAwMiwiZXhwIjoxODUxMDc1MDAyfQ.G7KNz8Nu-Qb7SJ3WAreWilg0WL_E5aNy4yX59pd6bpE";
// API call to create meeting
export const createMeeting = async ({ token }) => {
    const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
        method: "POST",
        headers: {
            authorization: `${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    });

    const { roomId } = await res.json();
    return roomId;
};