'use client';
import {useRouter} from 'next/navigation';
import React from 'react';

const First = () => {
	const router = useRouter();
	return (
		<div>
			<h1 className='mb-3 mt-2 text-2xl font-semibold'>First</h1>
			<button
				className='rounded bg-red-500 px-3 py-1 text-white'
				onClick={() => {
					router.push('/folder-practice/second');
				}}>
				GO to Second
			</button>
			<div>
				Lorem Ipsum is simply dummy text of the printing and typesetting
				industry. Lorem Ipsum has been the industrys standard dummy text ever
				since the 1500s, when an unknown printer took a galley of type and
				scrambled it to make a type specimen book. It has survived not only five
				centuries, but also the leap into electronic typesetting, remaining
				essentially unchanged. It was popularised in the 1960s with the release
				of Letraset sheets containing Lorem Ipsum passages, and more recently
				with desktop publishing software like Aldus PageMaker including versions
				of Lorem Ipsum.
			</div>
		</div>
	);
};

export default First;
