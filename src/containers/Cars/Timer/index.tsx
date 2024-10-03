import React, { useEffect, useState } from 'react';

export const Timer = (carCode) => {
	const [seconds, setSeconds] = useState<number>(0);
	const [minutes, setMinutes] = useState<number>(0);

	useEffect(() => {
		const updateTime = () => {
			setSeconds((seconds1) => {
				if (seconds < 60) {
					return seconds1 + 1;
				}
				setSeconds(0);
				setMinutes((minutes1) => minutes1 + 1);
				return null;
			});
		};

		const timeId = setInterval(updateTime, 100);
		return () => {
			clearInterval(timeId);
			setSeconds(0);
			setMinutes(0);
		};
	}, [carCode]);

	return (
		<div>
			{minutes} : {seconds}
		</div>
	);
};
