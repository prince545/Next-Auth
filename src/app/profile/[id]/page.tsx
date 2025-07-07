import React from 'react';

export default function UserProfile({ params }: { params: { id: string } }) {
  return (
    <div>
      Profile page {params.id}
    </div>
  );
}
