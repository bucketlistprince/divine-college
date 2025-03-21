export const GALLERY_CATEGORIES = [
  "Campus",
  "Events",
  "Academic",
  "Sports",
  "Cultural",
  "Student Life",
  "Exhibitions",
  "Workshops"
] as const

export type GalleryCategory = typeof GALLERY_CATEGORIES[number]
