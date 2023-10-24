// https://leetcode.com/problems/sentence-similarity-iii

/**
 * =================================================================================================================================
 * SINCE WE CAN INSERT SENTENCE ONLY ONCE
 * THE ARE SEVERAL POSSIBLE CASES
 *  - S1 STARTS FROM S2.                                     s1 = "hello world qwe", s2 = "hello world" - insert at the end
 *  - S1 ENDS FROM S2.                                       s1 = "hello world qwe", s2 = "world qwe"   - insert at the start
 *  - S1 STARTS FROM S2 SUBSTRING AND END WITH S2 SUBSTRING. s1 = "hello world qwe", s2 = "hello qwe"   - insert in the middle
 * =================================================================================================================================
 */

function areSentencesSimilar(sentence1: string, sentence2: string): boolean {
  let s1 = sentence1.split(" ");
  let s2 = sentence2.split(" ");

  let prefix: string[] = [],
    suffix: string[] = [];

  let i = 0,
    j = 0;

  // find shared prefix substring
  while (i < s1.length && i < s2.length && s1[i] === s2[i]) {
    prefix.push(s1[i]);
    i++;
  }

  // find shared suffix substring
  i = s1.length - 1;
  j = s2.length - 1;
  while (i >= 0 && j >= 0 && s1[i] === s2[j]) {
    suffix.push(s1[i]);
    i--;
    j--;
  }

  return (
    // whole s1 is prefix of s2
    prefix.length === s1.length ||
    // whole s2 is prefix of s1
    prefix.length === s2.length ||
    // whole s1 is suffix of s2
    suffix.length === s1.length ||
    // whole s2 is suffix of s1
    suffix.length === s2.length ||
    // prefix + suffix have intersections
    // for example "A B C D B B" and "A B B"
    // prefix = "A B" suffix = "B B"
    prefix.length + suffix.length >= s1.length ||
    prefix.length + suffix.length >= s2.length
  );
}

function areSentencesSimilar_v2(sentence1: string, sentence2: string): boolean {
  let s1 = sentence1.split(" ");
  let s2 = sentence2.split(" ");

  let left = 0,
    // offset from the end
    right = 0;

  // it's like we dequeue from both sides until one of the arrays is empty
  // but js does not have dequeue
  // so we use indexes to track current start / end (left / right)
  while (
    left < s1.length &&
    left < s2.length &&
    // it can be treated as startIndex <= endIndex
    // when startIndex < endIndex => one of the sentences fully checked
    left <= s1.length - 1 - right &&
    left <= s2.length - 1 - right
  ) {
    // dequeue the same words from the start
    if (s1[left] === s2[left]) {
      left++;
    }
    // dequeue the same words from the end
    else if (s1[s1.length - 1 - right] === s2[s2.length - 1 - right]) {
      right++;
    }
    // different words found while both sentences has words
    // it means we cannot make them the same by single insert
    else {
      return false;
    }
  }

  return true;
}

/**
 * BEST APPROACH
 */
function areSentencesSimilar_BEST(
  sentence1: string,
  sentence2: string
): boolean {
  let s1 = sentence1.split(" ");
  let s2 = sentence2.split(" ");

  // swap sentences to be:
  // s1 - sentence
  // s2 - s1's subsentence
  if (s1.length < s2.length) {
    let tmp = s1;
    s1 = s2;
    s2 = tmp;
  }

  let n1 = s1.length,
    n2 = s2.length;

  // all sub's words should be at the beginning or at the end of the sentence
  // (ofc in correct order)
  let i = 0;

  // check the start of the s1
  while (i < n2 && s2[i] === s1[i]) i++;

  // check the end of the s1
  // s1[n1 - 1 - (n2 - 1 - i)] =
  //    s1[n1 - 1 - n2 + 1 + i] =
  //    s1[n1 - n2 + i]
  while (i < n2 && s2[i] === s1[n1 - n2 + i]) i++;

  return i === n2;
}

areSentencesSimilar_BEST("My name is Haley", "My Haley");
// areSentencesSimilar_v3("A B C D B B", "A B B");
// areSentencesSimilar_v3("of", "A lot of words");
