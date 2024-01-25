import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
    .object({
        email: yup.string().required(),
        password: yup.string().required(),
    })
    .required();
type FormData = yup.InferType<typeof schema>;

// type Inputs = {
//     email: string;
//     password: string;
// };

export default function Login() {

    const { onLoginSubmit, loginError, setLoginError} = useAuthContext();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    
    setInterval(() => setLoginError(''), 3000);

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
                    <form
                        onSubmit={handleSubmit((data) =>
                            onLoginSubmit(data.email, data.password)
                        )}
                        className="margin-t"
                    >
                        <div className="form-group">
                            <input
                                {...register("email")}
                                placeholder="Email"
                                className="form-control"
                            />
                            {errors.email ? (
                                <p className="error-p">
                                    {errors.email.message}
                                </p>
                            ) : <p><br /></p>}
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                {...register("password")}
                                placeholder="Password"
                                className="form-control"
                            />
                            {errors.password ? (
                                <p className="error-p">
                                    {errors.password.message}
                                </p>
                            ) : <p><br /></p>}
                        </div>
                        <button
                            type="submit"
                            className="form-button button-l margin-b"
                        >
                            Sign In
                        </button>
                        {loginError ? <p className="error-p">{loginError}</p> :  <p><br /></p>}
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
    );
}
