export default function Register() {


    return (
        <div className="whole-login-container">
        <div className="login-container text-c animated flipInX">
  <div>
    <h1 className="logo-badge text-whitesmoke">
      <span className="fa fa-user-circle" />
    </h1>
  </div>
  <p className="text-whitesmoke">Sign Up</p>
  <div className="container-content">
    <form className="margin-t">
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Username"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="*****"
        />
      </div>
      <div className="form-group">
        <input
          type="repeatPassword"
          className="form-control"
          placeholder="*****"
        />
      </div>
      <button type="submit" className="form-button button-l margin-b">
        Sign Up
      </button>

      <p className="text-whitesmoke text-center">
        <small>Already have an account?</small>
      </p>
      <a className="text-darkyellow" href="/users/login">
        <small>Sign In</small>
      </a>
    </form>

  </div>
</div>
</div>
    );
}