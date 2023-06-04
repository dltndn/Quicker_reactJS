export default {
    post : (data: Object, url: string) => {
        const response = fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        return response.then(response => response.json())
    },

    get : (url: string) => {
        const response = fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        return response.then(res => res.json())
    },
}



