/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import cors from 'cors'

import { getPlaylistHandler } from './server/handler'

const app = express()

app.use(cors())
app.use(express.static('src/static'))

app.get('/spotify', getPlaylistHandler)

const port = 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
