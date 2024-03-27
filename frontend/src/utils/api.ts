export interface ApiResponse<T> {
    data?: T
    status?: number
    message?: string
    error?: string
}

// const getToken = () => {
//     const stored = localStorage.getItem('user')
//     if (!stored) {
//         return { error: 'User not signed in.' }
//     }
//     const parsed = JSON.parse(stored)
//     return parsed
// }

export async function authless_api<T, U>(endpoint: string, body: U): Promise<ApiResponse<T | null>> {
    const method = body ? 'POST' : 'GET';
    const requestBody = body ? JSON.stringify(body) : null

    return await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: requestBody,
    }).then(async (response:Response) => {
        let body

        try {
            body = await response.json()
        } catch(error) { console.log('1', error) }
        return {
            data: body,
            status: response.status,
            message: response.statusText
        }
    }).catch((error: ApiResponse<null>) => {
        console.log('error:', error)
        return error
    })
}

export async function api<T, U = undefined>(endpoint: string, body?: U): Promise<ApiResponse<T | null>> {
    // const user = getToken();
    // if (user.error) return { error: 'Not signed in', data: null }

    const method = body ? 'POST' : 'GET';
    const requestBody = body ? JSON.stringify(body) : null

    console.log(requestBody)
    
    return await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${user.token}`,
        },
        body: requestBody,
    })
    .then(async (response:Response) => {
        if (response.status === 401) {
            localStorage.removeItem('user')
            window.location.replace('/login')
        }

        let body

        try {
            body = await response.json()
        } catch(error) { console.log('1', error) }
        return {
            data: body,
            status: response.status,
            message: response.statusText
        }
    }).catch((error: ApiResponse<null>) => {
        console.log('error:', error)
        return error
    })
}

export async function api_delete(endpoint: string) {
    // const user = getToken();
    // if (user.error) return { error: 'Not signed in', data: null }
    
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${user.token}`,
            },
        })
        return {
            status: response.status,
            message: response.statusText
        }
    } catch (error) {
        console.log('error', error)
       return error;
    }
}