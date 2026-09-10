import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { base44 } from '@/api/base44Client';
import { CATEGORIES } from '@/lib/templates';
import { useToast } from '@/components/ui/use-toast';

export default function AIPanel({ project, updateProject }) {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generate = async () => {
    if (!description.trim() || loading) return;
    setLoading(true);
    try {
      const { data } = await base44.functions.invoke('generateSlideCopy', {
        appDescription: description,
        count: project.slides.length,
        category,
      });
      if (data?.error) throw new Error(data.error);
      const slides = data?.slides || [];
      if (!slides.length) throw new Error('No copy generated. Try again.');
      updateProject({
        slides: project.slides.map((s, i) => ({
          ...s,
          heading: slides[i]?.heading || s.heading,
          subheading: slides[i]?.subheading || s.subheading,
        })),
      });
      toast({ title: 'Copy generated', description: `Updated ${Math.min(slides.length, project.slides.length)} slides.` });
    } catch (e) {
      toast({ title: 'Generation failed', description: e.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const cats = CATEGORIES.filter((c) => c !== 'All');

  return (
    <div className="space-y-4">
      <p className="text-sm text-white/50">Describe your app and AI will write a headline and subheading for every screenshot.</p>
      <div className="space-y-1.5">
        <Label className="text-white/70 text-sm">App description</Label>
        <Textarea
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. A meditation app that helps busy people sleep better with guided sessions and calming soundscapes."
          className="bg-white/5 border-white/10 text-white resize-none"
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-white/70 text-sm">Category (optional)</Label>
        <Select value={category || undefined} onValueChange={setCategory}>
          <SelectTrigger className="bg-white/5 border-white/10 text-white h-11">
            <SelectValue placeholder="Auto-detect" />
          </SelectTrigger>
          <SelectContent>
            {cats.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        onClick={generate}
        disabled={loading || !description.trim()}
        className="w-full bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white border-0"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        {loading ? 'Generating…' : 'Generate copy'}
      </Button>
    </div>
  );
}