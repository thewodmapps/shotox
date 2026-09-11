import React, { useState } from 'react';
import { Sparkles, Loader2, X, Upload, ArrowRight, RefreshCw, ImagePlus } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { getDevice, makeSlide } from '@/lib/templates';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import ScaledSlide from '@/components/editor/ScaledSlide';
import { useToast } from '@/components/ui/use-toast';

const DEVICE = getDevice('feature-graphic');

export default function FeatureGraphicModal({ open, onClose, onPick }) {
  const [description, setDescription] = useState('');
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [slides, setSlides] = useState(null);
  const { toast } = useToast();

  if (!open) return null;

  const onFiles = async (files) => {
    const arr = Array.from(files).slice(0, 3 - uploads.length);
    const next = [];
    for (const f of arr) {
      try {
        const { file_url } = await base44.integrations.Core.UploadPublicFile({ file: f });
        next.push(file_url);
      } catch {}
    }
    setUploads((u) => [...u, ...next].slice(0, 3));
  };

  const removeUpload = (i) => setUploads((u) => u.filter((_, k) => k !== i));

  const generate = async () => {
    if (loading) return;
    if (!description.trim() && !uploads.length) return;
    setLoading(true);
    setSlides(null);
    try {
      const { data } = await base44.functions.invoke('generateFeatureGraphics', {
        appDescription: description,
        screenshotUrls: uploads,
      });
      if (data?.error) throw new Error(data.error);
      const generated = (data?.slides || []).map((s) => ({
        ...makeSlide(),
        ...s,
        screenshotUrl: uploads[0] || '',
      }));
      if (!generated.length) throw new Error('No options generated. Try again.');
      setSlides(generated);
    } catch (e) {
      toast({ title: 'Generation failed', description: e.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setSlides(null); };

  return (
    <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-5xl rounded-3xl bg-[#0e0e16] border border-white/10 shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 text-white">
              <ImagePlus className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-display text-lg font-bold text-white leading-tight">Feature Graphic</h3>
              <p className="text-xs text-white/50">Describe your app — AI designs 8 banner options, 1024×500.</p>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 grid place-items-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 max-h-[78vh] overflow-y-auto">
          {!slides ? (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-white/70 text-xs">Describe your app</Label>
                <Textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. A budgeting app for couples that splits shared expenses and tracks savings goals together."
                  className="bg-white/5 border-white/10 text-white resize-none"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-white/70 text-xs">Screenshots (optional — AI will analyze them)</Label>
                <div className="flex flex-wrap gap-2">
                  {uploads.map((url, i) => (
                    <div key={i} className="relative w-16 h-28 rounded-lg overflow-hidden border border-white/10">
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      <button onClick={() => removeUpload(i)} className="absolute top-0.5 right-0.5 w-5 h-5 grid place-items-center rounded bg-black/60 text-white/80 hover:text-white">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {uploads.length < 3 && (
                    <label className="w-16 h-28 rounded-lg border border-dashed border-white/20 hover:border-violet-400 hover:bg-violet-500/10 text-white/40 hover:text-white grid place-items-center cursor-pointer transition-colors">
                      <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => onFiles(e.target.files)} />
                      <Upload className="w-4 h-4" />
                    </label>
                  )}
                </div>
              </div>
              <Button
                onClick={generate}
                disabled={loading || (!description.trim() && !uploads.length)}
                className="w-full bg-gradient-to-r from-violet-500 to-pink-500 hover:opacity-90 text-white border-0"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {loading ? 'Designing 8 options…' : 'Generate 8 feature graphics'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-white/70">Pick your favorite — you can tweak it in the editor.</p>
                <button onClick={reset} className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white px-2.5 py-1.5 rounded-full border border-white/10 hover:bg-white/10">
                  <RefreshCw className="w-3.5 h-3.5" /> Edit prompt
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {slides.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => onPick(s)}
                    className="group relative rounded-2xl overflow-hidden ring-1 ring-white/10 hover:ring-violet-400 hover:shadow-2xl hover:shadow-violet-500/20 transition-all text-left"
                  >
                    <div className="relative w-full" style={{ aspectRatio: '1024 / 500' }}>
                    <ScaledSlide slide={s} device={DEVICE} deviceId="feature-graphic" />
                  </div>
                    <span className="absolute inset-0 grid place-items-center bg-black/0 group-hover:bg-black/30 transition-colors">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-black text-xs font-semibold">
                        Use this <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}