export interface TokenResponse {
  access_token: string
  token_type: string
  duration: number
}

export interface PlaylistResponse {
  tracks: {
    items: PlaylistItemRaw[]
  }
}

export interface PlaylistSizeResponse {
  tracks: {
    total: number
  }
}

export interface AlbumImage {
  height: number
  width: number
  url: string
}

export interface PlaylistItemRaw {
  added_at: string
  track: {
    preview_url: string
    name: string
    id: string
    album: {
      images: AlbumImage[]
    }
  }
}

export interface PlaylistItem {
  added_at: string
  preview_url: string
  name: string
  id: string
  album: string | undefined
}
