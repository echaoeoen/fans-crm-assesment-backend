import { createHash } from 'crypto';
export default function hash(str: string) {
  const hasher = createHash('sha256');
  hasher.update(str);
  return hasher.digest('hex');
}
