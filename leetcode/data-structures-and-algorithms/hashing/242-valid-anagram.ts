function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) {
    return false;
  }

  let n = s.length;

  let alphabet = new Array(26).fill(0);

  for (let i = 0; i < n; i++) {
    alphabet[s.charCodeAt(i) - 97] += 1;
    alphabet[t.charCodeAt(i) - 97] -= 1;
  }

  for (let i = 0; i < 26; i++) {
    if (alphabet[i] !== 0) return false;
  }

  return true;
}
