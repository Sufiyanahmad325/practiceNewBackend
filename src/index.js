// require('dotenv').config({path:'./env'})

import dotenv from 'dotenv'
import connectDB from './db/DBindex.js'




dotenv.config({path:'./.env'})


connectDB()


