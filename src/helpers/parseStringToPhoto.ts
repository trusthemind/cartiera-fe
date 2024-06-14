export function ParseStringToPhoto(photo: string) {
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/photos/${photo.trim()}`
}
