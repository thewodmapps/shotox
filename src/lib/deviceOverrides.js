// Position & size tweaks are device-specific: nudging the phone or text for
// iPhone 15 Pro Max shouldn't move it on Android phone too. These five fields
// are stored per-device in slide.overrides[deviceId]; everything else (copy,
// colors, font, layout) stays shared across devices.
export const DEVICE_FIELDS = ['phoneX', 'phoneY', 'phoneScale', 'textX', 'textY'];

// Returns a slide copy with the five device fields resolved from the
// per-device override (falling back to the slide's base value when no override
// exists for the given device).
export function resolveSlide(slide, devId) {
  if (!slide || !devId) return slide;
  const ov = slide.overrides && slide.overrides[devId];
  if (!ov) return slide;
  const out = { ...slide };
  for (const f of DEVICE_FIELDS) {
    if (ov[f] !== undefined) out[f] = ov[f];
  }
  return out;
}

// Routes a patch so device-specific fields land in slide.overrides[devId] and
// all other fields update the shared base. Returns the new slide object.
export function applyDevicePatch(slide, devId, patch) {
  const base = {};
  const dev = {};
  for (const [k, v] of Object.entries(patch)) {
    (DEVICE_FIELDS.includes(k) ? dev : base)[k] = v;
  }
  const out = { ...slide };
  if (Object.keys(base).length) Object.assign(out, base);
  if (Object.keys(dev).length) {
    const prev = (slide.overrides && slide.overrides[devId]) || {};
    out.overrides = { ...(slide.overrides || {}), [devId]: { ...prev, ...dev } };
  }
  return out;
}