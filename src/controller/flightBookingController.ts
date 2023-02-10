import { Request, RequestHandler, Response } from 'express'
import mssql from 'mssql'
import { v4 as uid } from 'uuid'
import { sqlConfig } from '../config'
import { bookingSchema } from '../helpers'
import { Booking } from '../models'

interface ExtendedRequest extends Request {
  body: { Name:string, Email:string, Destination:string, TravelDate:string },
  params: { id:string}
}

// Get all bookings
export const getBookings: RequestHandler = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig)
    const bookings = await (await pool.request().execute('getFlights')).recordset
    res.status(200).json(bookings)
  } catch (error: any) {
    res.status(404).json(error.message)
  }
}

// Add a booking
export async function addBooking(req: ExtendedRequest, res: Response) {
  try {
    const id = uid()
    const { Name, Email, Destination, TravelDate } = req.body
    const {error} = bookingSchema.validate(req.body)
    if(error) {
      return res.status(422).json(error.message)
    }
    const pool = await mssql.connect(sqlConfig)
    await pool.request()
    .input('id', id)
    .input('name', Name)
    .input('email', Email)
    .input('destination', Destination)
    .input('date', TravelDate)
    .execute('insertOrUpdate')

    return res.status(201).json({message:"Booking Added"})

  } catch (error) {
    return res.status(422).json(error)
  }
}

// Get one booking
export const getOneBooking = async (req: ExtendedRequest, res: Response) => {
  try {
    const id = req.params.id
    const pool = await mssql.connect(sqlConfig)
    const booking:Booking = await (await pool.request()
      .input('id', id)
      .execute('getFlightBookings')
    ).recordset[0]

    if (!booking) {
      return res.status(404).json({error:"Booking not found"})
    }
    return res.status(200).json(booking)
  } catch (error) {
    return res.status(422).json(error)
  }
}


// Update Booking
export const updateBooking = async (req: ExtendedRequest, res: Response) => {
  try {
    const { Name, Email, Destination, TravelDate } = req.body
    const pool = await mssql.connect(sqlConfig)

    const booking: Booking = await (await pool.request()
      .input('id', req.params.id)
      .execute('getFlightBookings')
      ).recordset[0]

    if(booking) {
      await pool.request()
        .input('id', req.params.id)
        .input('name', Name)
        .input('email', Email)
        .input('destination', Destination)
        .input('date', TravelDate)
        .execute('insertOrUpdate')
      
      return res.status(201).json({message:"Booking updated"})
    }
    return res.status(404).json({ error: "Booking Not Found"})
    
  } catch (error) {
    return res.status(422).json(error)
  }
}

// Delete Booking
export const cancelBooking = async (req: ExtendedRequest, res: Response) => {
  try {
    const pool = await mssql.connect(sqlConfig)
    const booking: Booking = await (await pool.request().input('id', req.params.id).execute('getFlightBookings')).recordset[0]

    if (booking) {
      await pool.request().input('id', req.params.id).execute('deleteFlightBooking')
      return res.status(204).json({message: "Booking Deleted"})
    }
    return res.status(404).json({message: "Booking Does Not Exist"})
  } catch (error) {
    return res.status(500).json(error)
  }
}