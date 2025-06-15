'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';

export default function SearchBox() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (debouncedSearch.trim()) {
      router.push(`/?search=${debouncedSearch.trim()}`);
    } else {
      router.push('/');
    }
  }, [debouncedSearch, router]);

  return (
    <>
      <Input
        placeholder='記事を検索..'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='w-[200px] lg:w-[300px]'
      />
    </>
  );
}
