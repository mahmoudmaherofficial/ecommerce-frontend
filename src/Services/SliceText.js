export default function SliceText(ref, count) {
  return ref.length > count ? ref.slice(0, count) + '...' : ref;
}
