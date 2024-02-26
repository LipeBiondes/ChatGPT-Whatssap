import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export const getOpenAICompletion = async (input: string): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: input }]
    })
    return completion.choices[0].message?.content as string
  } catch (error) {
    console.log(`Error getting OpenAI completion: ${error}`)
    return 'Não foi possível completar a mensagem. Tente novamente mais tarde.'
  }
}
