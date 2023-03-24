const endpoint = 'http://anshulkamath.local:3000/spotify'

const extractURI = (playlistURL) => playlistURL.substring(playlistURL.lastIndexOf('/') + 1)
const defaultPlaylist = 'https://open.spotify.com/playlist/55kGYQPNVPEkK9NUtQbbUW'
let playlistURL = defaultPlaylist
let songId = ''
let previewUrl = ''
const seenIds = new Set()
let audioPlayer = null
let timeout = null

const MIN_LENGTH = 5
const MAX_LENGTH = 30 /* 30 is the maximum length possible */


const getSong = async (num_retries = 5) => {
  const requestParams = {
    type: 'GET',
    error: (xhr, textStatus, error) => {
      console.log(xhr, textStatus, error)
    }
  }

  if (playlistURL) {
    requestParams.data = {
      playlistId: extractURI(playlistURL),
    }
  }

  const response = await $.ajax(endpoint, requestParams)

  songId = response.id
  previewUrl = response.preview_url

  // if we have already seen the song, then regenerate another song
  if (seenIds.has(songId) && num_retries > 0) {
    await getSong(num_retries - 1)
    return
  }

  $('#song-title').text(response.name)
  $('#song-album').attr('src', response.album)

  seenIds.add(songId)

  return previewUrl
}

const prepareGame = async () => {
  // turn off media keyboard buttons
  navigator.mediaSession.setActionHandler('play', () => {})
  navigator.mediaSession.setActionHandler('pause', () => {})
  navigator.mediaSession.setActionHandler('seekbackward', () => {})
  navigator.mediaSession.setActionHandler('seekforward', () => {})
  navigator.mediaSession.setActionHandler('previoustrack', () => {})
  navigator.mediaSession.setActionHandler('nexttrack', () => {})

  $('#playlist-input').attr('placeholder', defaultPlaylist)
}

const closeModal = async () => {
  $('#modal-container').toggleClass('active')
  $('#modal-body').toggleClass('active')

  const newPlaylistLink = $('#playlist-input').val()
  if (newPlaylistLink) {
    playlistURL = newPlaylistLink
  }
}

const playSong = async () => {
  audioPlayer?.pause()
  const audioLink = await getSong()
  audioPlayer = new Audio(audioLink)

  const duration = (MIN_LENGTH + Math.random() * (MAX_LENGTH - MIN_LENGTH))
  audioPlayer.play()
  timeout = setTimeout(() => {
    audioPlayer.pause()
  }, duration * 1000)
}

const stopSong = async () => {
  audioPlayer.pause()
}

const changePlaylist = async () => {
  $('#playlist-input').attr('placeholder', playlistURL)
  $('#playlist-input').val('')
  $('div[id^="modal"]').toggleClass('active')
}

jQuery(async () => {
  prepareGame()
  $('div[id^="modal"]').toggleClass('active')
  $('#next-song').on('click', playSong)
  $('#stop-song').on('click', stopSong)
  $('#modal-close').on('click', closeModal)
  $('#change-playlist').on('click', changePlaylist)
})
