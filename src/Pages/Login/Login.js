import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import { toast } from 'react-hot-toast';



const Login = () => {

  const { signIn, providerLogin } = useContext(AuthContext)

  const location = useLocation()
  const navigate = useNavigate()

  const from = location.state?.from?.pathname || '/'
  const googleProvider = new GoogleAuthProvider()

  const handleGoogleSignIn = () =>{
    providerLogin(googleProvider)
    .then(result =>{
        const user = result.user;
        console.log(user);
        navigate(from, {replace: true})
        toast.success("Google Login SuccessFully")
    })
    .catch(error => console.error(error))
}
  const handleLogin = event => {
    event.preventDefault()
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signIn(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        toast.success("Login SuccessFully")
        navigate(from, {replace: true})
      })}

return (
      <div className="hero e-full my-20">
        <div className="hero-content grid gap-10 md:grid-cols-2 flex-col lg:flex-row">
          <div className="text-center lg:text-left">

            <img className='w-3/4' src={img} alt="" />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100  py-10">
            <h1 className="text-5xl text-center font-bold">Login</h1>
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="text" name='email' placeholder="email" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="text" name='password' placeholder="password" className="input input-bordered" />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input className="btn btn-primary" type="submit" value="Login" />

              </div>
              <p className='text-center'>New to Genius Car <Link className='text-orange-600 font-bold' to="/signUp">Sign up</Link></p>
              <div className="divider">OR</div>
         <button onClick={handleGoogleSignIn}
          className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  export default Login;