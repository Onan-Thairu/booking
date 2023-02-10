import { NextFunction, Request, RequestHandler, Response } from 'express'
import dotenv from 'dotenv'
import path from 'path'
import jwt from 'jsonwebtoken'

dotenv.config({ path: path.resolve(__dirname, '../../.env')})

export function verifyToken (req:Request, res: Response, next: NextFunction){}