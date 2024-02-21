import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { sendWhatssapMessage } from './services/twilio'

const app = express()

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(cors())

dotenv.config()

app.post('/chat/send', async (req, res) => {
  const { to, body } = req.body

  try {
    await sendWhatssapMessage(`whatsapp:${to}`, body)
    res.status(200).json({ success: true, body })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
})

app.get('/', (req, res) => {
  res.send('Hello World')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
