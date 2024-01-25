import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

type Inputs = {
  username: string;
  password: string;
}

export default function Login () {

  const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  
    return (
      <div className="whole-login-container">
        <div className="login-container text-c animated flipInX">
  <div>
    <h1 className="logo-badge text-whitesmoke">
      <span className="fa fa-user-circle" />
    </h1>
  </div>
  <p className="text-whitesmoke">Sign In</p>
  <div className="container-content">
    <form onSubmit={handleSubmit(data => onSubmit(data))} className="margin-t">
      <div className="form-group">
        <input
          {...register('username')}
          placeholder="Username"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
        type="password"
          {...register('password')}
          placeholder="*****"
          className="form-control"
        />
      </div>
      <button type="submit" className="form-button button-l margin-b">
        Sign In
      </button>

      <p className="text-whitesmoke text-center">
        <small>Do not have an account?</small>
      </p>
      <Link className="text-darkyellow" to="/users/register">
        <small>Sign Up</small>
      </Link>
    </form>

  </div>
</div>
</div>
    )
}