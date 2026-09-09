import React, { useState } from 'react';
import { Sparkles, Loader2, Wand2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function AIPanel({ project, updateProject }) {
  const [desc, setDesc] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const generate = async () => {
    if (!desc.trim()) return;
    setBusy(true);
    setErr('');
    try {
      const res = await base44.functions.invoke('generateCopy', { description: desc, count: project.slides.length });
      const slides = res.data?.slides || [];
      if (!slides.length) {
        setErr('No copy generated — try a clearer description.');
        return;
      }
      updateProject({
        slides: project.slides.map((s, i) => ({
          ...s,
          heading: slides[i]?.heading || s.heading,
          subheading: slides[i]?.subheading || s.subheading
        }))
      });
    } catch (e) {
      setErr('Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2 p-3 rounded-xl bg-gradient-to-r from-violet-500/15 to-pink-500/15 border border-violet-400/20">
        <Wand2 className="w-4 h-4 text-violet-300 mt-0.5 shrink-0" />
        <p className="text-xs text-white/70 leading-relaxed">Describe your app and let AI write every slide's headline & subheadline for you.</p>
      </div>
      <div className="space-y-1.5">
        <Label className="text-white/70 text-xs">App description</Label>
        <Textarea
          rows={4}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="e.g. A meditation app that helps busy people sleep better with guided sessions and calming soundscapes."
          className="bg-white/5 border-white/10 text-white resize-none"
        />
      </div>
      {err && <p className="text-xs text-red-400">{err}</p>}
      <Button onClick={generate} disabled={busy || !desc.trim()} className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 hover:opacity-90 text-white border-0">
        {busy ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
        {busy ? 'Generating…' : 'Generate copy for all slides'}
      </Button>
      <p className="text-[11px] text-white/40 leading-relaxed">Replaces headlines & subheadlines on every slide. Backgrounds, layouts and screenshots stay as they are.</p>
    </div>
  );
}