import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express();

app.use(cors({origin:`${process.env.COR_ORIGIN}`, credentials:true}));
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"))
app.use(cookieParser())

// Import routers
import userRoutes from './routes/user.routes.js'
import hotelRoutes from './routes/hotel.routes.js'
import roomsRoute from './routes/room.routes.js'

// route Decleration
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/hotel', hotelRoutes)
app.use('/api/v1/room', roomsRoute)

export {app}