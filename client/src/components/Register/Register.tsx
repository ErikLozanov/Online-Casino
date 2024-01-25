import { useForm } from "react-hook-form";
import { useAuthContext } from "../../contexts/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
    .object({
        username: yup.string().required(),
        email: yup.string().required(),
        password: yup.string().required(),
        repeatPassword: yup.string().required(),
    })
    .required();
type FormData = yup.InferType<typeof schema>;

export default function Register() {
    const { onRegisterSubmit, registerError, setRegisterError } =
        useAuthContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    setInterval(() => setRegisterError(""), 3000);

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
                    <form
                        onSubmit={handleSubmit((data) =>
                            onRegisterSubmit(data.username, data.email, data.password, data.repeatPassword)
                        )}
                        className="margin-t"
                    >
                        <div className="form-group">
                            <input
                                type="text"
                                {...register("email")}
                                className="form-control"
                                placeholder="Email"
                            />
                            {errors.email ? (
                                <p className="error-p">
                                    {errors.email.message}
                                </p>
                            ) : <p><br /></p>}
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                {...register("username")}
                                className="form-control"
                                placeholder="Username"
                            />
                            {errors.username ? (
                                <p className="error-p">
                                    {errors.username.message}
                                </p>
                            ) : <p><br /></p>}
                        </div>
                        <div className="form-group">
                            <input
                                {...register("password")}
                                type="password"
                                className="form-control"
                                placeholder="Password"
                            />
                            {errors.password ? (
                                <p className="error-p">
                                    {errors.password.message}
                                </p>
                            ) : <p><br /></p>}
                        </div>
                        <div className="form-group">
                            <input
                                {...register("repeatPassword")}
                                type="password"
                                className="form-control"
                                placeholder="Repeat Password"
                            />
                            {errors.repeatPassword ? (
                                <p className="error-p">
                                    {errors.repeatPassword.message}
                                </p>
                            ) : <p><br /></p>}
                        </div>
                        <button
                            type="submit"
                            className="form-button button-l margin-b"
                        >
                            Sign Up
                        </button>
                                {registerError ? (<p className="error-p">{registerError}</p>) : <p><br /></p>}
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
