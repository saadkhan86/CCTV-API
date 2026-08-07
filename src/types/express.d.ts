declare namespace Express {
    interface Request {
        user?: import("../interfaces/IUser.ts").IUser.Doc
    }
}
interface DecodedToken extends jwt.JwtPayload {
    _id: string
}