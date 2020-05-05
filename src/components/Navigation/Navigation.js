import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
	return (
		<nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
			{isSignedIn ? (
				<p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">
					Sign Out
				</p>
			) : (
				<React.Fragment>
					<p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">
						Sign In
					</p>
					<p onClick={() => onRouteChange('register')} className="f3 link dim black underline pa3 pointer">
						Register
					</p>
				</React.Fragment>
			)}
		</nav>
	);
};

export default Navigation;
