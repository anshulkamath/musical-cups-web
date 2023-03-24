export const defaultPlaylistId = '55kGYQPNVPEkK9NUtQbbUW'
export const grantType = 'client_credentials'
export const accountURL = 'https://accounts.spotify.com/api/token'
export const playlistURL = (playlistId: string): string =>
  `https://api.spotify.com/v1/playlists/${playlistId}`
export const playlistFilter = 'tracks(items(track(preview_url,name,id,album(images))))'
export const playlistTotal = 'tracks(total)'

export const clientId = process.env.SPOTIFY_CLIENT_ID ?? ''
export const clientSecret = process.env.SPOTIFY_CLIENT_SECRET ?? ''
