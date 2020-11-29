export const fetchRestApi = async () => {
    try {
        const response = await fetch("https://z2wzh9du86.execute-api.ap-southeast-2.amazonaws.com/live/users");
            // "https://jsonplaceholder.typicode.com/users");            
        return response.json()
    } catch (e) {
        console.log(e);
    }
}

export const fetchRestAwsApi = async () => {
    try {
        const response = await fetch("https://86tylxc8w6.execute-api.ap-southeast-2.amazonaws.com/live/awsdetails");
        return response.json()
    } catch (e) {
        console.log(e);
    }
}
