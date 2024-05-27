import {
    Request, Response, NextFunction
} from 'express';

export function cookieMiddleware(req: Request, res: Response, next: NextFunction) {
    if (req.cookies.user) {
        res.locals.userId = req.cookies.user;
        next();
    } else {
        res.locals.userId = "";
        res.redirect('/');
    }
}