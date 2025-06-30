import React from 'react';

export function Skeleton({ width = '100%', height = 20, className = '' }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      style={{ width, height }}
    />
  );
}

export function SkeletonText({ lines = 3, width = '100%', className = '' }) {
  return (
    <div className={className}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-gray-200 rounded mb-2"
          style={{ width: typeof width === 'string' ? width : width[i] || '100%', height: 16 }}
        />
      ))}
    </div>
  );
}
