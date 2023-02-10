import mssql from 'mssql'
import { Request, Response } from 'express'
import { v4 as uid } from 'uuid'
import { sqlConfig } from '../config'
import { loginSchema, validationSchema } from '../helpers'
import Bcrypt from 'bcrypt'
import { User } from '../models'
import dotenv from 'dotenv'
import path from 'path'
import jwt from 'jsonwebtoken'

dotenv.config({ path: path.resolve(__dirname, '../../.env')})


interface ExtendedRequest extends Request {
  body: {Name:string, Email:string, Password:string}
}

export async function registerUser(req: ExtendedRequest, res: Response) {
  try {
    const id = uid()
    const {Name, Email, Password} = req.body
    const {error} = validationSchema.validate(req.body)
    if(error) {
      return res.status(422).json(error.details[0].message)
    }
    const pool = await mssql.connect(sqlConfig)
    const hashedPassword = await Bcrypt.hash(Password, 10)
    await pool.request()
      .input('id', id)
      .input('name', Name)
      .input('email', Email)
      .input('password', hashedPassword)
      .execute('registerUser')

      return res.status(201).json({message:'User Registered'})
  } catch (error) {
    return res.status(500).json(error)
  }
}

export async function loginUser(req: ExtendedRequest, res: Response) {
  try {
    const {Email, Password} = req.body
    const {error} = loginSchema.validate(req.body)
    if(error) {
      return res.status(422).json(error.details[0].message)
    }
    const pool = await mssql.connect(sqlConfig)
    const user: User[] = await (await pool.request().input('email', Email).execute('getUserByEmail')).recordset

    if(!user[0]) {
      return res.status(404).json({error:"User Not Found"})
    }

    const valid = await Bcrypt.compare(Password, user[0].Password)
    if(!valid) {
      return res.status(404).json({error:"User Not Found"})
    }

    const payload = user.map(item => {
      const {Password, ...rest} = item
      return rest
    })
    const token = jwt.sign(payload[0], process.env.SECRETKEY as string, {expiresIn:'3600s'})
    return res.status(200).json({message: "User Logged in!", token})
    
  } catch (error) {
    return res.status(500).json(error)
  }
}