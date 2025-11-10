// src/components/ProjectCardSkeleton.jsx
import React from 'react';
import './ProjectCardSkeleton.css';

export const ProjectCardSkeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text skeleton-text-short"></div>
        <div className="skeleton-date"></div>
      </div>
      <div className="skeleton-shimmer"></div>
    </div>
  );
};