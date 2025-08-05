'use client';

import { TextField, Button, Callout, Text } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { MdErrorOutline } from "react-icons/md";
import { useState } from 'react';
import { z } from 'zod';
import { createIssueSchema } from '@/app/createIssueSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

const SimpleMDE = dynamic(
  () => import('react-simplemde-editor'),
  { ssr: false}
);


type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const { 
    register,
    control,
    reset,
    handleSubmit,
    formState: {errors, isSubmitting}
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
        <ErrorMessage>
          {errors.title?.message}
        </ErrorMessage>
        <Controller name='description'
          control={control}
          render={({ field }) =>
            <SimpleMDE placeholder='Description'
              {...field}
            />
          }
        />
        <ErrorMessage>
          {errors.description?.message}
        </ErrorMessage>
        <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner/> }</Button>
      </form>
    </div>

  )
}

export default NewIssuePage