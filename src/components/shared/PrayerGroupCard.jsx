import React from 'react';

export default function PrayerGroupCard({ group }) {
  const bg = group?.heroImage
    ? {
        backgroundImage: `url("${group.heroImage}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};

  return (
    <div className='neu-raised-sm overflow-hidden bg-neu'>
      <div className='h-36 bg-neu-deep' style={bg} />
      <div className='p-3 space-y-2'>
        {group?.frequency && (
          <p className='m-0 text-sm text-neu-muted'>{group.frequency}</p>
        )}
        <h3 className='m-0 text-lg font-semibold text-neu-ink'>
          {group?.name}
        </h3>

        {/* Topics */}
        {!!group?.topics?.length && (
          <div className='flex flex-wrap gap-2'>
            {group.topics.map((t) => (
              <span
                key={t}
                className='text-xs px-2.5 py-1 rounded-full bg-neu text-royal-600 shadow-neu-inset-sm'
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Audience + Location */}
        <div className='flex flex-wrap gap-2 items-center'>
          {group?.audience && (
            <span className='text-xs px-2.5 py-1 rounded-full bg-neu text-neu-ink shadow-neu-xs'>
              {group.audience}
            </span>
          )}
          {group?.locationLabel && (
            <span className='text-sm text-neu-muted'>{group.locationLabel}</span>
          )}
        </div>
      </div>
    </div>
  );
}
