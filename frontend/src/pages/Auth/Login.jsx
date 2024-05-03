import React, {useState, useEffect} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLoginMutation } from '../../redux/api/usersApiSlice'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import Load from '../../components/Load'
import Block from '../../components/Block'



const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, {isLoading}] = useLoginMutation()
    const { userInfo }  = useSelector(state => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);


    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const res = await login({email, password}).unwrap()
            console.log(res)
            dispatch(setCredentials({...res}))
        }
        catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    }


  return (
  <>
    <Load />

    <Block />
  


    <div className='bg-[#2e2a27] h-[100vh] flex items-center justify-center main-cont'>
        <section className="pl-[5rem] pb-[5rem] flex flex-wrap w-[60%] bg-white z-[1]">
            <div className="mr-[4rem] mt-[5rem]">
                <h1 className="text-2xl font-semibold mb-4">Sign in</h1>


                <form onSubmit={submitHandler} className='container w-full flex justify-center items-center flex-col'>

                    <div className='my-[2rem]'>
                        <label htmlFor="email" className='block text-sm font-medium text-[#e8e2da]'>Email</label>

                        
                        <input type="email" id='email' className='mt-1 p-2 border rounded w-full' value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
                    </div>


                    <div className='my-[2rem]'>
                        <label htmlFor="password" className='block text-sm font-medium text-[#e8e2da]'>Password</label>


                        <input type="password" id='password' className='mt-1 p-2 border rounded w-full' style={{ backgroundColor: '#e8e2da' }} value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>



                    <button disabled={isLoading} type='submit' className='bg-[#000000] text-white px-4 py-2 rounded cursor-pointer my-[1rem]'>{isLoading ? "Logging in..." : "Login"}</button>

                    {isLoading && <Loader />}
                </form>





                <div className="mt-4">
                    <p className='text-[black]'>
                        Don't have an account? {" "} 
                        <Link
                            to={redirect ? `/register?redirect=${redirect}` : '/register'} 
                            className='text-pino-500 hover:underline'
                            >
                            Register
                        </Link>
                    </p>
                </div>

            </div>
            
        </section>
      
    </div>
    </>
  )
}

export default Login;
