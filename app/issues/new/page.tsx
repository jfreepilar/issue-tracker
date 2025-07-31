'use client';

import { TextField, Button, Callout } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { MdErrorOutline } from "react-icons/md";
import { useState } from 'react';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, reset, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();
  const [error, setError] = useState('');

  const onSubmit = async (data: IssueForm) => {
    try {
      await axios.post('/api/issues', data);
      router.push('/issues')
    } catch (error) {
      setError('An unexpected error occured.')
    }
    reset();
  }

  return (
    <div className='max-w-xl'>
      {error &&
        <Callout.Root color='red' 
                      className='mb-5'
        >
          <Callout.Icon>
            <MdErrorOutline />
          </Callout.Icon>
          <Callout.Text>
            {error}
          </Callout.Text>
        </Callout.Root>
      }

      <form className='space-y-3'
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField.Root placeholder='Title'
          {...register('title')}
        >
        </TextField.Root>

        <Controller name='description'
          control={control}
          render={({ field }) =>
            <SimpleMDE placeholder='Description'
              {...field}
            />
          }
        />
        <Button >Submit New Issue</Button>
      </form>

    </div>

  )
}

export default NewIssuePage