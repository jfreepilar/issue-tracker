'use client';

import { TextField, Button, Callout, Text } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { MdErrorOutline } from "react-icons/md";
import { useState } from 'react';
import { z } from 'zod';
import { createIssueSchema } from '@/app/createIssueSchema';
import { zodResolver } from '@hookform/resolvers/zod';

const errorMb: string = '2'

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const { 
    register,
    control,
    reset,
    handleSubmit,
    formState: {errors}
  } = useForm({
      resolver: zodResolver(createIssueSchema)
      });

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
        {errors.title && 
          <Text color='red' as='p' mb={errorMb}>
            {errors.title.message}
          </Text>
        }
        <Controller name='description'
          control={control}
          render={({ field }) =>
            <SimpleMDE placeholder='Description'
              {...field}
            />
          }
        />
        {errors.description && 
          <Text color='red' as='p' mb={errorMb}>
            {errors.description.message}
          </Text>
        }
        <Button >Submit New Issue</Button>
      </form>
    </div>

  )
}

export default NewIssuePage