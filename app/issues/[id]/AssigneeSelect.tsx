'use client';

import { Skeleton } from '@/app/components';
import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const AssigneeSelect = () => {
  const {data: users, error, isLoading} = useQuery({
    queryKey: ['users'] ,
    queryFn: async () => {
      const res = await axios.get<User[]>('/api/users')
      return res.data
    },
    staleTime: 1000 * 60,
    retry: 2
  })

  if (error) return null;
  if (isLoading) return <Skeleton height='2rem'/>


  return (
    <Select.Root>
      <Select.Trigger placeholder='Assign...'>
      </Select.Trigger>
      <Select.Content position='popper'>
        <Select.Group>
          <Select.Label>Suggestion...</Select.Label>
            {users?.map( (user) => 
              (<Select.Item key={user.id} 
                            value={user.id}
               >
                {user.name}
              </Select.Item>)
            )}
        </Select.Group> 
      </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect