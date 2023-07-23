import {Request, Response, NextFunction } from "express"

export const ErrorHander = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.send({message : err})
    next();
}