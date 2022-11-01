import * as React from "react";
import "src/css/layout.css";

const Header = () => {
	return (
		<header className="headerSection" id="headerSection">
			<nav className="nav">
			</nav>
			<h1 className="logo">
				<a href="/"><img width="95" src="assets/logo.png" alt="" /></a>
			</h1>
			<div className="rBox">
			</div>
		</header>
	)
}

export default Header;