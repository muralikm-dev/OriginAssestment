export const fetchRestApi = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        return response.json()
    } catch (e) {
        
    }
}