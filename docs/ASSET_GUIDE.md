# Asset Guide — Adding Your Real Photos

The codebase ships with placeholder gradient blocks where your real photography
should go. Cartoon avatars were intentionally NOT generated — the design language
is built to showcase actual photos.

## 1. Where to put images

Create this folder if it doesn't exist:

```
frontend/public/assets/
```

Add your photos:

```
frontend/public/assets/hero-photo.jpg     (recommended: 1600x2000, portrait, golden-hour outdoor shot)
frontend/public/assets/about-photo.jpg    (recommended: 1200x1500, portrait, natural light)
```

## 2. Wire them into Hero.jsx

In `frontend/src/components/sections/Hero.jsx`, find this block:

```jsx
<div className="absolute inset-0 flex items-center justify-center text-brand-brown/25 text-sm font-medium tracking-widest uppercase">
  [ Your double-exposure portrait photo goes here — see /docs/ASSET_GUIDE.md ]
</div>
```

Replace the whole placeholder `<div>` directly above it (the gradient backdrop)
with:

```jsx
<img
  src="/assets/hero-photo.jpg"
  alt="Vinayak Shinde"
  className="w-full h-full object-cover"
/>
<div className="absolute inset-0" style={{
  background: 'linear-gradient(180deg, rgba(250,247,242,0) 0%, rgba(250,247,242,0.55) 65%, rgba(250,247,242,0.96) 100%)'
}} />
```

This keeps the warm gradient fade into the page background while showing your
real photo underneath, instead of the generated gradient block.

## 3. Wire the About photo

In `frontend/src/components/sections/About.jsx`, replace the placeholder div
inside the `aspect-[4/5]` container with:

```jsx
<img src="/assets/about-photo.jpg" alt="Vinayak Shinde" className="w-full h-full object-cover" />
```

## 4. Double-exposure effect (optional, for the cinematic hero look)

If you want the literal double-exposure blend (portrait + mountains/road/forest)
described in the brief, do this in a photo editor (Photoshop / Photopea / GIMP)
before dropping the file in:

1. Place your portrait as the base layer.
2. Add a landscape photo (mountains, road, golden sunset) above it.
3. Set the landscape layer's blend mode to "Screen" or "Lighten".
4. Mask the landscape so it's confined mostly to the silhouette/hair area.
5. Export as one flattened JPG and use it as `hero-photo.jpg`.

The CSS gradient overlays already in `Hero.jsx` are tuned to sit on top of a
photo like this and fade it into the `--bg` color at the bottom of the section.

## 5. Resume PDF

Drop your resume at:

```
frontend/public/resume.pdf
```

It's already linked via the "Download Resume" buttons (`profile.resumeUrl` in
`frontend/src/utils/portfolioData.js`).
