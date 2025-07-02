'use client';
import { useState } from 'react';
import {User} from '@/app/lib/definitions';

export default function UserOverview({ user }: { user: User }) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className='rounded-xl bg-gray-50 p-2 shadow-sm'>
      <div>
        <p className='text-lg font-semibold'>Name:</p>
        <p>{user.name}</p>
      </div>

      <div>
        <p className='text-lg font-semibold'>Email:</p>
        <p>{user.email}</p>
      </div>

      <div className='mt-4'>
        <p className='text-lg font-semibold'>Profile Image:</p>

        <input type="file" accept="image/*" onChange={handleImageChange}/>
        
        {preview && (
          <div className="mt-2">
            <img
              src={preview}
              alt="Profile Preview"
              className="mt-2 w-32 h-32 object-cover rounded-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
