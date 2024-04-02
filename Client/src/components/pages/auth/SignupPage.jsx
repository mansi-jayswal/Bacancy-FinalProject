import React from 'react'
import Header from '../../common/Auth/Header'
import Signup from '../../common/Auth/Signup'

function SignupPage() {
  return (
    <>
    <div className="min-h-full h-vh flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <Header
      heading="Sign to your Account"
      paragraph="Already have an account? "
      linkName="login"
      linkUrl="/"
      />
      <Signup />
      </div>
      </div>
    </>
  )
}

export default SignupPage
