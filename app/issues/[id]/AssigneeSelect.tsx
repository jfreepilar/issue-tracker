'use client'

import { Select } from '@radix-ui/themes'

const AssigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder='Assign...'>
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestion...</Select.Label>
          <Select.Item value='1'>Joeffrey</Select.Item>
        </Select.Group> 
      </Select.Content>

    </Select.Root>
  )
}

export default AssigneeSelect