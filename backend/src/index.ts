import 'dotenv/config'
import server from './server'
import mongoose from 'mongoose'
mongoose.set('strictQuery', false)

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        server.listen(port, () => {
            console.log('listening on port ', port)
        })
    } catch(error) {
        console.error('error', error)
        process.exit(1)
    }
}

start();