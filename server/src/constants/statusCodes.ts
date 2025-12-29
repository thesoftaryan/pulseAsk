export const STATUS = {
    SUCCESS : {
        OK : 200,
        CREATED : 201,
        NO_CONTENT : 204,
    },
    CLIENT_ERROR : {
        BAD_REQUEST : 400,
        UNAUTHORIZED : 401,
        FORBIDDEN : 403,
        NOT_FOUND : 404,
    },
    SERVER_ERROR : {
        INTERNAL : 500,
    }
} as const;