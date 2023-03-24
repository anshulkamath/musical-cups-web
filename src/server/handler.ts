import _ from 'lodash'

import { type Request, type Response } from 'express'

import { getPlaylist } from './playlist'

export const getPlaylistHandler = async (req: Request, res: Response): Promise<void> => {
  const playlistId: any = req.query.playlistId ?? undefined
  const [playlistItems] = await getPlaylist(playlistId)
  const chosenSong = _.sample(playlistItems)

  res.status(200).send(chosenSong)
}
