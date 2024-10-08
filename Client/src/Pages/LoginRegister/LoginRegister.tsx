import { useState } from "react"
import "./LoginRegister.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Layout from "../../Layout/Layout";
const SERVER_URL = "https://localhost:7220";//I have to change it
function LoginRegister() {
	const [loginValues, setLoginValues] = useState({ username: '', password: '' });
	const [registerValues, setRegisterValues] = useState({ firstName: '', lastName: '', username: '', email: '', password: '' })

	const navigate = useNavigate();

	const handleLoginInputChange = (name: string, value: string) => {
		setLoginValues(prevValues => {
			return {
				...prevValues,
				[name]: value
			}
		});
	}
	const handleRegisterInputChange = (name: string, value: string) => {
		setRegisterValues(prevValues => {
			return {
				...prevValues,
				[name]: value
			}
		});
	}
	const Register = (event: any) => {
		event.preventDefault()
		axios.post(`${SERVER_URL}/User/Register`, registerValues)
			.then(result => {
				if (result.data.isValid) {
					navigate("/");
					toast.success("You are successfuly registered!")
					//navigate user to main page for logged in users only
				}
			})
			.catch(error => {
				//notify user that something get wrong
				console.log(error);
				toast.error("Unexpected error occurred!")
			})
	}
	const Login = (event: any) => {
		event.preventDefault()
		axios.post(`${SERVER_URL}/User/Login`, loginValues)
			.then(result => {
				if (result.data) {
					var token = result.data;
					//TODO
					localStorage.setItem("token", JSON.stringify(token));
					//save token
					navigate("/");
					toast.success("You successfuly logged in!")
				}
				else {
					toast.info("Wrong Data!");
				}
			})
			.catch(error => {
				//notify user that something get wrong
				console.log(error);
				toast.error("Unexpected error occurred!")
			})
	}

	return (
		<Layout>
			<div className="all">
				<div className="main">
					<input className="login-input" type="checkbox" id="chk" aria-hidden="true" />
					<div className="signup">
						<form action="">
							<label className="login-label" htmlFor="chk" aria-hidden="true">Sign up</label>
							<input
								className="login-input"
								type="text"
								placeholder="First Name"
								onChange={(event) => handleRegisterInputChange('firstName', event.target.value)}
								value={registerValues.firstName}
							/>
							<input
								className="login-input"
								type="text"
								placeholder="Last Name"
								onChange={(event) => handleRegisterInputChange('lastName', event.target.value)}
								value={registerValues.lastName}
							/>
							<input
								className="login-input"
								type="text"
								placeholder="Username"
								onChange={(event) => handleRegisterInputChange('username', event.target.value)}
								value={registerValues.username}
							/>
							<input
								className="login-input"
								type="email"
								placeholder="Email"
								onChange={(event) => handleRegisterInputChange('email', event.target.value)}
								value={registerValues.email}
							/>
							<input
								className="login-input"
								type="password"
								placeholder="Password"
								autoComplete=""
								onChange={(event) => handleRegisterInputChange('password', event.target.value)}
								value={registerValues.password}
							/>
							<button className="login-button" onClick={Register}>Sign up</button>
						</form>
					</div>
					<div className="login">
						<form action="">
							<label className="login-label" htmlFor="chk" aria-hidden="true">Login</label>
							<input
								className="login-input"
								type="text"
								placeholder="Username"
								onChange={(event) => handleLoginInputChange('username', event.target.value)}
								value={loginValues.username}
							/>
							<input
								className="login-input"
								type="password"
								placeholder="Password"
								autoComplete=""
								onChange={(event) => handleLoginInputChange('password', event.target.value)}
								value={loginValues.password}
							/>
							<button className="login-button" onClick={Login}>Login</button>
						</form>
					</div>
				</div>
			</div>
		</Layout>
	)
};
export default LoginRegister;