import React from 'react'
import { Login as LoginComponent } from '../components'

function Login() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-gray-950 py-12">
      <LoginComponent />
    </div>
  )
}

export default Login