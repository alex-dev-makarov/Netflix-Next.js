import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import logo from "../public/static/logo.svg";
import { magic } from "../lib/magic-client";

import classes from "../styles/Login.module.css";
const Login = () => {
	const [email, setEmail] = useState("");
	const [userMsg, setUserMsg] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	useEffect(() => {
		const handleComplete = () => {
			setIsLoading(false);
		};
		router.events.on("routeChangeComplete", handleComplete);
		router.events.on("routeChangeError", handleComplete);
		return () => {
			router.events.off("routeChangeComplete", handleComplete);
			router.events.off("routeChangeError", handleComplete);
		};
	}, [router]);
	const handleLoginIn = async (e) => {
		e.preventDefault();

		if (email) {
			if (email === "alex.makarov@surelockkey.com") {
				try {
					setIsLoading(true);
					const didToken = await magic.auth.loginWithMagicLink({
						email,
					});
					console.log("didToken:", didToken);
					if (didToken) {
						router.push("/");
					}
				} catch {
					setIsLoading(false);
					console.error("error", err);
				}
			} else {
				setUserMsg("Something went wrong");
				setIsLoading(false);
			}
		} else {
			setUserMsg("Enter a valid email please");
			// setIsLoading(false)
		}
	};

	const handleOnChangeEmail = (e) => {
		setUserMsg("");
		const email = e.target.value;
		setEmail(email);
	};
	return (
		<div className={classes.container}>
			<Head>
				<title>Netflix Sign In</title>
			</Head>

			<header className={classes.header}>
				<div className={classes.headerWrapper}>
					<Link className={classes.logoLink} href="/">
						<a className={classes.logoWrapper}>
							<Image
								src={logo}
								width="128px"
								height="34px "
								alt="Netflix"
							/>
						</a>
					</Link>
				</div>
			</header>

			<main className={classes.main}>
				<div className={classes.mainWrapper}>
					<h1 className={classes.signInTitle}>Sign in</h1>
					<input
						className={classes.signInEmail}
						type="text"
						placeholder="Enter your address"
						onChange={handleOnChangeEmail}
					/>
					<p className={classes.userMsg}>{userMsg}</p>
					<button
						className={classes.signInButton}
						onClick={handleLoginIn}
					>
						{isLoading ? "Loading..." : "Sign in"}
					</button>
				</div>
			</main>
		</div>
	);
};

export default Login;
