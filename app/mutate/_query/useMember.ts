import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from '@tanstack/react-query';

export interface MemberType {
	id: number;
	name: string;
	birth: number;
	height: number;
}

// const fetchMembers = async () => {
// 	const response = await fetch('/api/members');
// 	if (!response.ok) throw new Error('Network response was not ok');
// 	return response.json();
// };

// const addMember = async (newMember: Omit<Member, 'id'>) => {
// 	const response = await fetch('/api/members', {
// 		method: 'POST',
// 		headers: {'Content-Type': 'application/json'},
// 		body: JSON.stringify(newMember),
// 	});
// 	if (!response.ok) throw new Error('멤버 추가 실패');
// 	return response.json();
// };

// const updateMember = async (updatedMember: Member) => {
// 	const response = await fetch('/api/members', {
// 		method: 'PUT',
// 		headers: {'Content-Type': 'application/json'},
// 		body: JSON.stringify(updatedMember),
// 	});
// 	if (!response.ok) throw new Error('멤버 정보 업데이트 실패');
// 	return response.json();
// };

// const deleteMember = async (id: number) => {
// 	const response = await fetch('/api/members', {
// 		method: 'DELETE',
// 		headers: {'Content-Type': 'application/json'},
// 		body: JSON.stringify({id}),
// 	});
// 	if (!response.ok) throw new Error('멤버삭제 실패');
// };

export function getMembersQuery() {
	const getMembers = useSuspenseQuery<MemberType[], Error>({
		queryKey: ['members'],
		queryFn: async (): Promise<MemberType[]> => {
			const fetchData = await fetch('/api/mutate', {
				method: 'GET',
			});
			const fetchDataJson = await fetchData.json();
			return fetchDataJson;
		},
	});

	return {
		membersData: getMembers.data,
		membersIsLoading: getMembers.isLoading,
		membersIsError: getMembers.isError,
		membersIsSuccess: getMembers.isSuccess,
		membersRefetch: getMembers.refetch,
	};
}

export function deleteMembersQuery() {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (memberId: number) => {
			const response = await fetch(`/api/mutate?memberId=${memberId}`, {
				method: 'DELETE',
			});
			if (!response.ok) {
				throw new Error('Failed to delete member');
			}
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['members']});
		},
	});

	return {
		deleteMember: mutation.mutate,
		membersIsError: mutation.isError,
		membersIsSuccess: mutation.isSuccess,
	};
}

export function postMemberQuery() {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (member: MemberType) => {
			const response = await fetch(`/api/mutate`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(member),
			});
			if (!response.ok) {
				throw new Error('Failed to add member');
			}
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['members']}); // 멤버 목록을 새로 고침
		},
	});

	return {
		postMember: mutation.mutate,
		membersIsError: mutation.isError,
		membersIsSuccess: mutation.isSuccess,
	};
}
