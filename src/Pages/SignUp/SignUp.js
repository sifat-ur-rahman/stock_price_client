import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
// import { AuthContext, providerLogin } from '../../Contexts/AuthProvider/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';

const SignUp = () => {
const {createUser,updateUser, providerLogin}  = useContext(AuthContext)
const [signUpError, setSignUpError] = useState('')
const googleProvider = new GoogleAuthProvider()
console.log("signUpError",signUpError);

const navigate = useNavigate()


const handleGoogleSignIn = () =>{
  providerLogin(googleProvider)
  .then(result =>{
      const user = result.user;
      console.log(user);
      toast.success("Google Login SuccessFully")
      navigate('/')
  })
  .catch(error => console.error(error))
}

    const handleSignUp = event =>{
      setSignUpError('');
        event.preventDefault()
        const form = event.target;
        const password = form.password.value;
        const email = form.email.value;
        const name = form.name.value;
        createUser(email,password)
        .then(result =>{
            const user = result.user;
            console.log(user);
           
            const userInfo = {
                displayName: name
            }
            updateUser(userInfo)
            .then(()=>{
              toast.success("Sing Up SuccessFully")
                navigate('/')
            })
        })
        .catch(err => 
          {console.error(err)
          setSignUpError(err.message)}
          )
        
    }
     // const saveUser = (name, email) =>{
    //     const user = {name, email};
    //     fetch('http://localhost:5000/users', {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(user)
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         
    //         setCreatedUserEmail(email)
    //     })
    // }

    return (
        <div className="hero e-full ">
        <div className="hero-content grid gap-10 md:grid-cols-2 flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            
            <img className='w-3/4' src={img} alt="" />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100  py-10">
          <h1 className="text-5xl text-center font-bold">Sign Up</h1>
            <form onSubmit={handleSignUp} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" name='name' placeholder="Your Name" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="text" name='email' placeholder="Email" className="input input-bordered" required/>
                
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="text" name='password' placeholder="password" className="input input-bordered" required />
                
              </div>
              <div className="form-control mt-6">
                  <input className="btn btn-primary" type="submit" value="Sign Up" />
               
              </div>
              <p className='text-center'>Already have an Account <Link className='text-orange-600 font-bold' to="/login">Login</Link></p>
              {
                    signUpError && <p className='text-red-500'>{signUpError}</p>
                }
            <div className="divider">OR</div>
            <div className="form-control ">
         <button onClick={handleGoogleSignIn} className='btn btn-outline '>CONTINUE WITH GOOGLE</button>
            </div>
            </form>
           
          </div>
        </div>
      </div>
    );
};

export default SignUp;