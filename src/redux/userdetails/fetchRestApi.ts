export const fetchRestApi = async () => {
    try {
        const response = await fetch("https://z2wzh9du86.execute-api.ap-southeast-2.amazonaws.com/live/users");
            // "https://jsonplaceholder.typicode.com/users");            
        return response.json()
    } catch (e) {
        console.log(e);
    }
}
