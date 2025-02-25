'use client';

import React from 'react';
import Image from 'next/image';

interface RecentActivityProps {
  imageUrl: string;
  username: string;
  action: string;
  time: string;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ imageUrl, username, action, time }) => (
  <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
    <div className="relative w-10 h-10">
      <Image
        src={imageUrl}
        alt={username}
        fill
        className="rounded-full object-cover"
      />
    </div>
    <div className="flex-1">
      <div className="text-sm">
        <span className="font-medium">{username}</span>
        {' '}
        {action}
      </div>
      <div className="text-xs text-gray-500">{time}</div>
    </div>
  </div>
);

export default RecentActivity;
