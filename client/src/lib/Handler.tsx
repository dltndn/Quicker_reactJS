/* eslint-disable import/no-anonymous-default-export */
export default {
    post: async (data: Object, url: string) => {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        return response.json()
    },

    get: async (url: string) => {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        return response.json()
    },

    patch: async (data: any, url: string) => {
        const response = await fetch(url, {
            method: "PATCH", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },

    put: async (data: any, url: string) => {
        const response = await fetch(url, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },

}



