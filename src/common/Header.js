import * as React from "react";

const Header = () => {
	return (
		<header className="headerSection">
			<nav className="nav">
			</nav>
			<h1 className="logo">
				<img src={require("src/assets/logo/logo.png")} alt="" onClick={() => window.location.replace("/")}/>
			</h1>
			<div className="rBox">
			</div>
		</header>
	)
}

export default Header;