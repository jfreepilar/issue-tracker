'use client';

import { TextField, Button } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const {register, control, reset, handleSubmit} = useForm<IssueForm>();
  const router = useRouter()

  const onSubmit = async (data: IssueForm) => {
    console.log(data);
    await axios.post('/api/issues', data);
    router.push('/issues')
    reset();
  }

  return (
    <form className='max-w-xl space-y-3'
          onSubmit={handleSubmit(onSubmit)}
    >
        <TextField.Root placeholder='Title'
                        {...register('title')}
        >
        </TextField.Root>

        <Controller name='description'
                    control={control}
                    render={({field}) => 
                      <SimpleMDE placeholder='Description'
                                 {...field}
                      />
                    } 
        />

        <Button >Submit New Issue</Button>
    </form>
  )
}

export default NewIssuePage