'use client';
import { useState, useTransition } from 'react';
import { updateUserImage } from '@/app/lib/actions';
import {User} from '@/app/lib/definitions';
import Image from 'next/image';

export default function UserOverview({ user }: { user: User }) {
  const [imageUrl, setImageUrl] = useState(user.image_url || '');
  const [inputValue, setInputValue] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(() => {
      updateUserImage(user.id, inputValue);
      setImageUrl(inputValue); // update local image preview immediately
      setInputValue('');
    });
  };

  return (
    <div className='rounded-xl bg-gray-50 p-2 shadow-sm'>
      <div>
        <p className='text-lg font-semibold'>Name</p>
        <p>{user.name}</p>
      </div>

      <div>
        <p className='text-lg font-semibold'>Email</p>
        <p>{user.email}</p>
      </div>

      <div className='mt-4'>
        <p className='text-lg font-semibold'>Profile Image</p>

          <div className="mt-2">
            <Image
              src={user.image_url}
              alt="Profile Preview"
              className="mt-2 w-32 h-32 object-cover rounded-full"
            />
          </div>
          <div className="space-y-2">
        <input
          type="text"
          placeholder="Enter new image URL"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
        />
        <button
          onClick={handleSubmit}
          disabled={isPending || inputValue.trim() === ''}
          className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? 'Updating...' : 'Update Profile Image'}
        </button>
      </div>
      </div>
    </div>
  );
}
