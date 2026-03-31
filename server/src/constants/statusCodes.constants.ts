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
        CONFLICT : 409,
    },
    SERVER_ERROR : {
        INTERNAL : 500,
        BAD_GATEWAY : 502,
    }
} as const;