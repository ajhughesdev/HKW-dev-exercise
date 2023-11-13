import { useState, ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Form from '../utilities/Form'

import { ReactComponent as EyeOpen } from './assets/eye-open.svg'
import { ReactComponent as EyeClosed } from './assets/eye-closed.svg'

interface ValidationErrors {
  [key: string]: string[]
}

interface ValidateOptions {
  [key: string]: {
    value: string
    isRequired?: boolean
    isEmail?: boolean
    minLength?: number
  }
}

const Login = (): JSX.Element => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [validate, setValidate] = useState<ValidationErrors>({})

  const validateLogin = (): boolean => {
    let isValid = true

    let validator = Form.validator({
      email: {
        value: email,
        isRequired: true,
        isEmail: true,
      },
      password: {
        value: password,
        isRequired: true,
        minLength: 6,
      },
    })

    if (validator !== null) {
      setValidate(validator.errors)
      isValid = false
    }
    return isValid
  }

  const authenticate = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const validateResult = validateLogin()

    if (validateResult) {
      setValidate({})
      setEmail('')
      setPassword('')
      alert('Successful Login')
    }
  }

  const togglePassword = (): void => {
    setShowPassword(!showPassword)
  }

  const handleInputChange =
    (
      setterFunction: React.Dispatch<React.SetStateAction<string>>,
      field: string
    ) =>
    (e: ChangeEvent<HTMLInputElement>): void => {
      setterFunction(e.target.value)

      setValidate((prevState) => {
        const newState = { ...prevState }
        if (newState[field]) {
          delete newState[field]
        }
        return newState
      })
    }

  return (
    <div className='auth-wrapper'>
      <div className='auth-background'>
        <div className='auth-background-holder'></div>
        <div className='auth-background-mask'></div>
      </div>

      <div className='auth-main'>
        <div className='auth-body'>
          <h2 className='auth-heading'>Login to your account</h2>
          <p>Business customer access</p>
          <form
            className='auth-form'
            method='POST'
            onSubmit={authenticate}
            autoComplete={'off'}
            noValidate
          >
            <div className='form-group'>
              <label htmlFor='email' className='form-label'>
                Email Address
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={email}
                  onChange={handleInputChange(setEmail, 'email')}
                />
                <div className='validation-message'>
                  {validate['email'] && validate['email'][0]}
                </div>
              </label>
            </div>

            <div className='form-group'>
              <label htmlFor='password' className='form-label'>
                Password
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  id='password'
                  value={password}
                  onChange={handleInputChange(setPassword, 'password')}
                />
                <button type='button' onClick={togglePassword}>
                  {showPassword ? <EyeOpen /> : <EyeClosed />}
                </button>
                <div className='validation-message'>
                  {validate['password'] && validate['password'][0]}
                </div>
              </label>

              <div className='ccare-link-wrapper'>
                <Link to='/forgot-password'>Forgot Password?</Link>
              </div>
            </div>

            <button type='submit' className='btn btn-primary'>
              Log In
            </button>
          </form>

          <div className='auth-option'>
            Don't have an account?{' '}
            <Link className='text-link' to='/register'>
              Sign up{' '}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
