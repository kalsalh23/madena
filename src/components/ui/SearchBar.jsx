import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function SearchBar({ size = 'lg', placeholder = 'ابحث في الأخبار، المشاريع، الأماكن...' }) {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    navigate(`/search?q=${encodeURIComponent(value.trim())}`);
  };

  return (
    <form onSubmit={submit} className="relative w-full" role="search">
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={
          size === 'lg'
            ? 'w-full rounded-2xl border-0 bg-white/95 py-4 pr-14 pl-5 text-base text-ink-900 shadow-lift placeholder:text-ink-100/60 focus:outline-none focus:ring-4 focus:ring-gold-500/40'
            : 'w-full rounded-xl border border-[#E5E7EB] bg-white py-2.5 pr-11 pl-4 text-sm text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15'
        }
      />
      <button
        type="submit"
        aria-label="بحث"
        className={
          size === 'lg'
            ? 'absolute inset-y-0 right-0 m-2 flex w-11 items-center justify-center rounded-xl bg-brand-800 text-cream transition-colors hover:bg-brand-900'
            : 'absolute inset-y-0 right-0 flex w-11 items-center justify-center text-ink-100 transition-colors hover:text-brand-700'
        }
      >
        <Search className={size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} />
      </button>
    </form>
  );
}
