
const errorResponse = (method, desc, status) => {
    return {
        Success: false,
        date: new Date().toISOString(),
        status: status,
        description: desc,
        method: method
    };
}


exports.errorResponse = errorResponse;