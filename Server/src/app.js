import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express();

app.use(cors({origin:`http://localhost:3000`, credentials:true}));
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"))
app.use(cookieParser())

// Import routers
import userRoutes from './routes/user.routes.js'
import hotelRoutes from './routes/hotel.routes.js'
import roomsRoute from './routes/room.routes.js'
import bookingRoute from './routes/booking.routes.js'
import errorHandler from './utils/errorHandeler.js';

// route Decleration
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/hotel', hotelRoutes)
app.use('/api/v1/room', roomsRoute)
app.use('/api/v1/booking', bookingRoute)


app.use(errorHandler)

export {app}