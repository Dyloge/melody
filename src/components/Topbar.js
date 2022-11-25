/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'

const Topbar = () => (
  <div
    className="Topbar"
    css={css`
      border: 1px solid;
      border-left: none;
      position: absolute;
      top: 0;
      height: 50px;
      background: #ffffff;
      left: 200px;
      width: calc(100% - 200px);
      padding: 20px;
    `}
  ></div>
)

export default Topbar
