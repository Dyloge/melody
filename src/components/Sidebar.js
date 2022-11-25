/** @jsx jsx */
import React, { useState, useRef, useContext } from 'react'
import { css, jsx } from '@emotion/core'
import { StoreContext } from './index'
import Modal from './Modal'
import Toast from './Toast'

const Sidebar = () => {
  const [sidebarState, setState] = useState({
    modal: false,
    toast: ''
  })

  const { state, dispatch } = useContext(StoreContext)

  const playlistRef = useRef(null)
  const playlists = Object.keys(state.playlists)

  const addPlaylist = e => {
    e.preventDefault()
    const list = playlistRef.current.value

    dispatch({ type: 'ADD_PLAYLIST', playlist: list })

    setState({
      ...sidebarState,
      modal: false,
      toast: 'Playlist was created successfully!'
    })
  }

  const handleModal = () =>
    setState({ ...sidebarState, modal: !sidebarState.modal })

  return (
    <ul className="Sidebar" css={CSS}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 30
        }}
      >
        <i
          className="fa fa-music"
          aria-hidden="true"
          style={{
            fontSize: 80,
            color: '#480ca8'
          }}
        ></i>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'start',
            marginLeft: 10
          }}
        >
          <h2 style={{ margin: 0, color: '#480ca8' }}>Melody</h2>
          <p style={{ fontSize: 10, color: '#480ca8' }}>
            Hotelian interview project
          </p>
        </div>
      </div>

      {playlists.map(list => (
        <li
          key={list}
          className={list === state.currentPlaylist ? 'active' : ''}
          onClick={() => dispatch({ type: 'SET_PLAYLIST', playlist: list })}
        >
          {list}
        </li>
      ))}

      <li className="new-playlist" onClick={handleModal}>
        <i className="fa fa-plus-circle" />
        <span>New Playlist</span>
      </li>

      <Modal show={sidebarState.modal} close={handleModal}>
        <form onSubmit={addPlaylist}>
          <div className="title">New Playlist</div>

          <div className="content-wrap">
            <label>Playlist Name</label>
            <input
              type="text"
              placeholder="eg. Jazz"
              ref={playlistRef}
              required
            />
            <label>Cover Image</label>
            <input type="file" required />
            <br />
            <button type="submit">Create</button>
          </div>
        </form>
      </Modal>

      <Toast
        toast={sidebarState.toast}
        close={() => setState({ ...sidebarState, toast: '' })}
      />
    </ul>
  )
}

const CSS = css`
  width: 200px;
  height: 100%;
  background: #ffffff;
  padding-top: 20px;
  border: 1px solid;

  li {
    padding-left: 20px;
    text-transform: capitalize;
    margin-bottom: 10px;
    cursor: pointer;
  }

  li.active {
    border-left: 2px solid white;
    padding-left: 18px;
  }

  li.library {
    cursor: unset;
    color: #000000;
    text-transform: uppercase;
    font-weight: normal;
  }
  form {
    button {
      background-color: #000000;
      color: white;
      padding: 12.5px 30px;
      border-radius: 5px;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 13px;
      border: none;
      cursor: pointer;
    }

    .title {
      margin: 0;
      margin-bottom: 35px;
    }

    input {
      margin-bottom: 20px;
      height: 35px;
      padding-left: 8px;
      font-size: 16px;
      width: 100%;
      color: black;
    }

    .content-wrap {
      margin: 0px auto;
      max-width: 250px;
      text-align: center;
    }
  }
`

export default Sidebar
