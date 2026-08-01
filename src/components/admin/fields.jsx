import { useRef, useState } from 'react';
import { ImagePlus, X, Loader2, Bold, Italic, List, Heading2, Link2 } from 'lucide-react';
import { uploadFile } from '@/services/storage';
import { useToast } from '@/contexts/ToastContext';

export function Field({ label, children, hint }) {
  return (
    <div className="mb-5">
      <label className="label">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-ink-100">{hint}</p>}
    </div>
  );
}

export function TextInput(props) {
  return <input className="input" {...props} />;
}

export function NumberInput(props) {
  return <input type="number" className="input" {...props} />;
}

export function TextArea({ rows = 4, ...props }) {
  return <textarea rows={rows} className="input resize-y" {...props} />;
}

export function Select({ options = [], ...props }) {
  return (
    <select className="input cursor-pointer" {...props}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition-colors ${checked ? 'bg-brand-700' : 'bg-gray-300'}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${checked ? 'right-0.5' : 'right-[22px]'}`}
        />
      </button>
      {label && <span className="text-sm font-semibold text-ink-900">{label}</span>}
    </label>
  );
}

export function ImageUpload({ value = '', onChange, aspect = 'video' }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);
  const { error } = useToast();

  const handle = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file, 'images');
      onChange(url);
    } catch (err) {
      error(err);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handle} />
      {value ? (
        <div className={`relative overflow-hidden rounded-xl2 border border-[#E5E7EB] ${aspect === 'square' ? 'h-40 w-40' : 'aspect-video max-w-md'}`}>
          <img src={value} alt="معاينة" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute left-2 top-2 rounded-full bg-wine-700 p-1.5 text-white hover:bg-wine-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-2 rounded-xl2 border-2 border-dashed border-[#E5E7EB] text-ink-100 transition-colors hover:border-brand-400 hover:text-brand-700 ${
            aspect === 'square' ? 'h-40 w-40' : 'aspect-video max-w-md'
          }`}
        >
          {uploading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <>
              <ImagePlus className="h-6 w-6" />
              <span className="text-xs font-semibold">اضغط للرفع</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}

export function MultipleImageUpload({ value = [], onChange }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);
  const { error } = useToast();

  const handle = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      const urls = [];
      for (const file of files) {
        const url = await uploadFile(file, 'images');
        urls.push(url);
      }
      onChange([...value, ...urls]);
    } catch (err) {
      error(err);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const remove = (idx) => onChange(value.filter((_, i) => i !== idx));

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {value.map((url, i) => (
          <div key={i} className="relative h-24 w-28 overflow-hidden rounded-xl border border-[#E5E7EB]">
            <img src={url} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute left-1 top-1 rounded-full bg-wine-700 p-1 text-white hover:bg-wine-600"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-24 w-28 flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-[#E5E7EB] text-ink-100 transition-colors hover:border-brand-400 hover:text-brand-700"
        >
          {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ImagePlus className="h-5 w-5" />}
          <span className="text-[11px] font-semibold">إضافة صور</span>
        </button>
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handle} />
    </div>
  );
}

export function RichEditor({ value = '', onChange }) {
  const ref = useRef(null);
  const [focused, setFocused] = useState(false);

  const exec = (command) => {
    ref.current?.focus();
    document.execCommand(command, false);
    onChange(ref.current.innerHTML);
  };

  const execHeading = () => {
    ref.current?.focus();
    document.execCommand('formatBlock', false, 'h3');
    onChange(ref.current.innerHTML);
  };

  const execList = () => {
    ref.current?.focus();
    document.execCommand('insertUnorderedList', false);
    onChange(ref.current.innerHTML);
  };

  const execLink = () => {
    const url = window.prompt('رابط الرابط:');
    if (url) {
      document.execCommand('createLink', false, url);
      onChange(ref.current.innerHTML);
    }
  };

  const tools = [
    { icon: Bold, label: 'عريض', fn: () => exec('bold') },
    { icon: Italic, label: 'مائل', fn: () => exec('italic') },
    { icon: Heading2, label: 'عنوان', fn: execHeading },
    { icon: List, label: 'قائمة', fn: execList },
    { icon: Link2, label: 'رابط', fn: execLink },
  ];

  return (
    <div>
      <div className="mb-2 flex gap-1">
        {tools.map((t, i) => (
          <button
            key={i}
            type="button"
            onClick={t.fn}
            title={t.label}
            className="rounded-lg border border-[#E5E7EB] p-2 text-ink-100 transition-colors hover:bg-brand-50 hover:text-brand-800"
          >
            <t.icon className="h-4 w-4" />
          </button>
        ))}
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={() => onChange(ref.current.innerHTML)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`rte-content ${focused ? 'border-brand-500 ring-4 ring-brand-500/15' : ''}`}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
}
