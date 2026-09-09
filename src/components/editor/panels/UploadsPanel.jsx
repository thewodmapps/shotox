import React, { useRef, useState } from 'react';
import { Upload, Loader2, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Image } from '@/components/ui/image';

export default function UploadsPanel({ slide, updateSlide, project, updateProject }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const uploads = project.uploads || [];

  const onFiles = async (files) => {
    if (!files?.length) return;
    setBusy(true);
    const urls = [];
    for (const file of Array.from(files)) {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      urls.push(file_url);
    }
    updateProject({ uploads: [...uploads, ...urls] });
    if (!slide.screenshotUrl) updateSlide({ screenshotUrl: urls[0] });
    setBusy(false);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="w-full rounded-xl border border-dashed border-white/20 hover:border-violet-400 hover:bg-violet-500/10 transition-colors p-6 flex flex-col items-center gap-2 text-white/70"
      >
        {busy ? <Loader2 className="w-6 h-6 animate-spin" /> : <Upload className="w-6 h-6" />}
        <span className="text-xs font-medium">{busy ? 'Uploading…' : 'Upload screenshots'}</span>
        <span className="text-[11px] text-white/40">PNG or JPG · multiple allowed</span>
      </button>
      <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={(e) => onFiles(e.target.files)} />
      {slide.screenshotUrl && (
        <button onClick={() => updateSlide({ screenshotUrl: '' })} className="w-full flex items-center justify-center gap-1.5 h-8 rounded-lg text-xs text-white/70 border border-white/10 hover:bg-white/5">
          <X className="w-3.5 h-3.5" /> Remove from this slide
        </button>
      )}
      {uploads.length > 0 && (
        <div>
          <p className="text-xs text-white/50 mb-2">Click an image to place it on the selected slide</p>
          <div className="grid grid-cols-3 gap-2">
            {uploads.map((url) => (
              <button key={url} onClick={() => updateSlide({ screenshotUrl: url })} className={`aspect-[9/19] rounded-lg overflow-hidden border transition-transform hover:scale-105 ${slide.screenshotUrl === url ? 'ring-2 ring-violet-400 border-transparent' : 'border-white/10'}`}>
                <Image src={url} alt="Uploaded screenshot" className="w-full h-full" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}