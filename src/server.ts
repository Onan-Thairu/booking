import express, { json } from 'express'
import router from './router'
import authRouter from './router/authRoutes'

const app = express()
app.use(json())
app.use('/flights', router)
app.use('/auth', authRouter)

app.listen(4000, () => {
  console.log("App running on port 4000");
})