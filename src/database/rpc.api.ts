type RpcRequest = {
    method: string;
    params?: any;
};

type RpcResponse<T> = {
    jsonrpc: string;
    id: number;
    result?: T;
    error?: string;
};

export async function RpcApi<T>(request: RpcRequest): Promise<T> {
    const response = await fetch("http://localhost:8080/rpc", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: request.method,
            params: request.params ?? {},
        }),
    });

    const data: RpcResponse<T> = await response.json();

    if (data.error) {
        throw new Error(data.error);
    }

    return data.result as T;
}