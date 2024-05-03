import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Load from '../../components/Load'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { useRegisterMutation } from '../../redux/api/usersApiSlice'


const Register = () => {
    const [ username, setUsername ] = useState('')
    const [ email, setEmail] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [ register, {isLoading} ] = useRegisterMutation()
    const { userInfo } = useSelector(state => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'


    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo]);



    const submitHandler = async (e) => {
        e.preventDefault();

        if (password != confirmPassword) {
            toast.error("Passwords do not match")
        }
        else {
            try {
                const res = await register({username, email, password}).unwrap();
                dispatch(setCredentials({...res}))
                navigate(redirect)
                toast.success("User successfully registered")
            }
            catch (error){
                console.log(error);
                toast.error(error.data.message)
            }
        }
    }

  return (
    <>
        <Load />

        <section className="pl-[10rem] flex flex-wrap h-[100vh]">
            <div className="mr-[4rem] mt-[5rem]">
                <h1 className="text-2xl font-semibold mb-4">Sign up</h1>

                <form onSubmit={submitHandler}
                 className="container w-[40rem]">
                    <div className="my-[2rem]">
                        <label htmlFor="name" className='block text-sm font-medium text-black'>Name</label>
                        <input type="text" id='name' className='mt-1 p-2 border rounded w-full' placeholder='Enter Name' value={username}
                        onChange={(e) => setUsername(e.target.value)}/>
                    </div>

                    <div className="my-[2rem]">
                        <label htmlFor="email" className='block text-sm font-medium text-black'>Email</label>
                        <input type="email" id='email' className='mt-1 p-2 border rounded w-full' placeholder='Enter Email' value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="my-[2rem]">
                        <label htmlFor="password" className='block text-sm font-medium text-black'>Password</label>
                        <input type="text" id='password' className='mt-1 p-2 border rounded w-full' placeholder='Enter Password' value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="my-[2rem]">
                        <label htmlFor="confirmPassword" className='block text-sm font-medium text-black'>Confirm Password</label>
                        <input type="password" id='confirmPassword' className='mt-1 p-2 border rounded w-full' placeholder='Confirm Password' value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </div>

                    <button disabled={isLoading}
                    type='submit' className='bg-black text-white cursor-pointer rounded my-[1rem] px-4 py-2'>{isLoading ? "Registering..." : "Register"}</button>


                    {isLoading && <Loader />}


                </form>

                <div className="mt-4">
                    <p className='text-black'>
                    Already have an account? {""}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className='text-black hover:underline cursor-pointer'>
                        Log in
                    </Link>

                    </p>
                </div>
            </div>
            

           
        </section>
    </>
  )
}

export default Register;
