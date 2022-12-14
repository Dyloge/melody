import React from 'react'
import { StoreContext } from '.'
export const Login = () => {
  const { dispatch } = React.useContext(StoreContext)
  const initialState = {
    username: '',
    password: '',
    isSubmitting: false,
    errorMessage: null
  }

  const [data, setData] = React.useState(initialState)
  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }
  const handleFormSubmit = event => {
    event.preventDefault()
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null
    })
    fetch('http://137.74.230.245:81/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw res
      })
      .then(resJson => {
        dispatch({
          type: 'LOGIN',
          payload: resJson
        })
      })
      .catch(error => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText
        })
      })
  }
  return (
    <div className="login-container">
      <div className="card">
        <div className="container">
          <form onSubmit={handleFormSubmit}>
            <h1>Login</h1>

            <label htmlFor="email">
              Username
              <input
                type="text"
                name="username"
                id="username"
                value={data.username}
                onChange={handleInputChange}
              />
            </label>

            <label htmlFor="password">
              Password
              <input
                type="password"
                name="password"
                id="password"
                value={data.password}
                onChange={handleInputChange}
              />
            </label>

            {data.errorMessage && (
              <span className="form-error">{data.errorMessage}</span>
            )}

            <button disabled={data.isSubmitting}>
              {data.isSubmitting ? 'Loading...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Login
