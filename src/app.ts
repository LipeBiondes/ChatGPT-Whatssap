import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { sendWhatssapMessage } from './services/twilio'
import { getOpenAICompletion } from './services/openai'

const app = express()

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(cors())

dotenv.config()

/*
app.post('/chat/send', async (req, res) => {
  const { to, body } = req.body

  try {
    await sendWhatssapMessage(`whatsapp:${to}`, body)
    res.status(200).json({ success: true, body })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
})
*/

app.post('/chat/receive', async (req, res) => {
  const twilioRequestBody = req.body
  const messageBody = twilioRequestBody.Body
  const to = twilioRequestBody.From

  try {
    const completion = await getOpenAICompletion(messageBody)
    await sendWhatssapMessage(to, completion)
    res.status(200).json({ success: true, completion })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
