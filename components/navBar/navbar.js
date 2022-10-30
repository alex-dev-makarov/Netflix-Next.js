import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { magic } from "../../lib/magic-client";
import arrowDown from "../../public/static/arrowDown.svg";
import logo from "../../public/static/logo.svg";
import classes from "./navBar.module.css";
const NavBar = () => {
	const [showDropdown, setShowDropdown] = useState(false);
	const [username, setUsermane] = useState("");
	const router = useRouter();
	useEffect(() => {
		async function emailData() {
			try {
				const { email } = await magic.user.getMetadata();

				const didToken = await magic.user.getIdToken();
				console.log({ didToken });
				email && setUsermane(email);
			} catch (error) {
				console.error("Error email", error);
			}
		}
		emailData();
	}, []);
	const handleOnClickHome = (e) => {
		e.preventDefault();
		router.push("/");
	};
	const handleSignOut = async () => {
		try {
			await magic.user.logout();
			router.push("/login");
			console.log(await magic.user.isLoggedIn()); // => `false`
		} catch (error) {
			router.push("/login");
			console.log("Email error Log Out", error);
		}
	};
	const handleOnClickList = (e) => {
		e.preventDefault();
		router.push("/browse/my-list");
	};
	return (
		<div className={classes.container}>
			<div className={classes.wrapper}>
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

				<ul className={classes.navItems}>
					<li
						className={classes.navItemHome}
						onClick={handleOnClickHome}
					>
						Home
					</li>
					<li
						className={classes.navItemList}
						onClick={handleOnClickList}
					>
						My List
					</li>
				</ul>

				<nav className={classes.navContainer}>
					<div>
						<button
							className={classes.userNameBtn}
							onClick={() => setShowDropdown(!showDropdown)}
						>
							<p className={classes.username}>{username}</p>
							<Image
								src={arrowDown}
								width="24px"
								height="24px "
								alt="arrowDown"
							/>
						</button>
						{showDropdown && (
							<div className={classes.dropDown}>
								<div>
									<a
										className={classes.signOut}
										onClick={handleSignOut}
									>
										Sign out{" "}
									</a>
									<div className={classes.lineWrapper}></div>
								</div>
							</div>
						)}
					</div>
				</nav>
			</div>
		</div>
	);
};

export default NavBar;
