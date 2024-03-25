// Filename - components/ReadMore.js

import React, { useState } from "react";

const ReadMore = ({ children }) => {
	const text = children;
	const [isReadMore, setIsReadMore] = useState(true);
	const toggleReadMore = () => {
		setIsReadMore(!isReadMore);
	};
	return (
		<p className="text">
			{isReadMore ? text.slice(0, 11) : text}
			<span
				onClick={toggleReadMore}
				className="read-or-hide"
				style={{ color: "green" }}
			>
				{isReadMore ? "...read more" : " show less"}
			</span>
		</p>
	);
};

const Content = () => {
	return (
		<div className="container">
			{/* <h2> */}
				<ReadMore>
				How To Play: 
				Get rid of all of your dice to win!
                Click the green "roll dice" button on your turn & tap the dice:
                1. Pop balloons to remove them 
                2. Gifts have a random amount of dice, choose who gets them 
                3. Share the cake with everyone else! 
                When only confetti is left, click the red "end turn" button
                ** inspired by “Pass the Pandas” and built by Joy of Coding Academy students
				</ReadMore>
			{/* </h2> */}
		</div>
	);
};

export default Content;
