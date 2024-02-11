import React from 'react'

export default function Footer() {
  return (
    <>
      <div className='bottom-0 d-flex justify-content-center position-absolute l-45'>
            <p>Vaasu | &copy;{(new Date().getFullYear())}</p>
      </div>
    </>
  )
}
