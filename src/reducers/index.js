import media from '../media.json'

const DEFAULT_PLAYLIST = 'home'

export const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  media,
  addToPlaylistId: '',
  removeFromPlaylistId: '',
  currentPlaylist: DEFAULT_PLAYLIST,
  currentSongId: '',
  currentTime: 0,
  duration: 0,
  playing: false,
  playlists: {
    home: new Set(media.ids)
  },
  volume: 0.65
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.setItem('token', JSON.stringify(action.payload.token))
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      }
    case 'LOGOUT':
      localStorage.clear()
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }
    case 'ADD_PLAYLIST':
      return {
        ...state,
        playlists: { ...state.playlists, [action.playlist]: new Set() }
      }
    case 'ADD_TO_PLAYLIST':
      return { ...state, addToPlaylistId: action.songId }
    case 'ABORT_ADD_TO_PLAYLIST':
      return { ...state, addToPlaylistId: '' }
    case 'PLAY':
      return {
        ...state,
        playing: true,
        currentSongId: action.songId || state.currentSongId
      }
    case 'PAUSE':
      return { ...state, playing: false }
    case 'SAVE_TO_PLAYLIST':
      state.playlists[action.playlist].add(state.addToPlaylistId)
      return { ...state, addToPlaylistId: '' }
    case 'SET_CURRENT_TIME':
      return { ...state, currentTime: action.time }
    case 'SET_DURATION':
      return { ...state, duration: action.duration }
    case 'SET_PLAYLIST':
      return { ...state, currentPlaylist: action.playlist }
    case 'SET_VOLUME':
      return { ...state, volume: parseFloat(action.volume) }
  }

  return state
}
