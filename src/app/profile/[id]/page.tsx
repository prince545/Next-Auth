import React from 'react';

interface UserProfileProps {
  params: {
    id: string;
  };
}

export default function UserProfile({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
      <h1 className="text-2xl font-bold">Profile</h1>
      <hr className="w-1/2 my-4 border-gray-600" />
      <p className="text-4xl">
        Profile page{" "}
        <span className="p-2 rounded bg-orange-500 text-black">
          {params.id}
        </span>
      </p>
    </div>
  );
}
