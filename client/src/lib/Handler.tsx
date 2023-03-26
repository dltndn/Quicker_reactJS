export default {
    post : (data: Object, url: string) => {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
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



