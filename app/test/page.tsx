'use client';
import Container from '@/components/Container';
import RemoveComponent from './_components/RemoveComponent';
import {useState} from 'react';

export default function Test() {
	const [isRemoved, setIsRemoved] = useState<boolean>(false);

	return (
		<Container>
			<Container.Title>Test용 컴포넌트 들</Container.Title>
			<RemoveComponent isRemoved={isRemoved} setIsRemoved={setIsRemoved} />
		</Container>
	);
}
