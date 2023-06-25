// https://leetcode.com/explore/interview/card/leetcodes-interview-crash-course-data-structures-and-algorithms/705/hashing/4663/

import { strictEqual } from "assert";

// Given a string text, you want to use the characters of text to form as many instances of the word "balloon" as possible.
// You can use each character in text at most once. Return the maximum number of instances that can be formed.

function maxNumberOfBalloons(text: string): number {
  let result = Number.MAX_SAFE_INTEGER;

  const charsAvailability = new Map<string, number>();
  for (let i = 0; i < text.length; i++) {
    charsAvailability.set(text[i], (charsAvailability.get(text[i]) ?? 0) + 1);
  }

  const balloonCharMap = new Map([
    ["b", 1],
    ["a", 1],
    ["l", 2],
    ["o", 2],
    ["n", 1],
  ]);

  for (const [char, counter] of balloonCharMap) {
    const chAvailavility = charsAvailability.get(char) ?? 0;

    result = Math.min(result, Math.floor(chAvailavility / counter));
  }

  return result;
}

function maxNumberOfBalloonsUsingArrays(text: string): number {
  const pattern = "balloon";

  let result = Number.MAX_SAFE_INTEGER;

  const frequencyInText = new Array(26).fill(0);
  const frequencyInPattern = new Array(26).fill(0);

  // calc frequency in text
  for (let i = 0; i < text.length; i++) {
    frequencyInText[text.charCodeAt(i) - 97] += 1;
  }

  // calc frequency in pattern
  for (let i = 0; i < pattern.length; i++) {
    frequencyInPattern[pattern.charCodeAt(i) - 97] += 1;
  }

  for (const char of pattern) {
    result = Math.min(
      result,
      Math.floor(
        frequencyInText[char.charCodeAt(0) - 97] /
          frequencyInPattern[char.charCodeAt(0) - 97]
      )
    );
  }

  return result;
}

strictEqual(maxNumberOfBalloons("nlaebolko"), 1);
strictEqual(maxNumberOfBalloons("loonbalxballpoon"), 2);
strictEqual(maxNumberOfBalloons("leetcode"), 0);
strictEqual(maxNumberOfBalloons("balon"), 0);
strictEqual(
  maxNumberOfBalloons(
    "krhizmmgmcrecekgyljqkldocicziihtgpqwbticmvuyznragqoyrukzopfmjhjjxemsxmrsxuqmnkrzhgvtgdgtykhcglurvppvcwhrhrjoislonvvglhdciilduvuiebmffaagxerjeewmtcwmhmtwlxtvlbocczlrppmpjbpnifqtlninyzjtmazxdbzwxthpvrfulvrspycqcghuopjirzoeuqhetnbrcdakilzmklxwudxxhwilasbjjhhfgghogqoofsufysmcqeilaivtmfziumjloewbkjvaahsaaggteppqyuoylgpbdwqubaalfwcqrjeycjbbpifjbpigjdnnswocusuprydgrtxuaojeriigwumlovafxnpibjopjfqzrwemoinmptxddgcszmfprdrichjeqcvikynzigleaajcysusqasqadjemgnyvmzmbcfrttrzonwafrnedglhpudovigwvpimttiketopkvqw"
  ),
  10
);

strictEqual(maxNumberOfBalloonsUsingArrays("nlaebolko"), 1);
strictEqual(maxNumberOfBalloonsUsingArrays("loonbalxballpoon"), 2);
strictEqual(maxNumberOfBalloonsUsingArrays("leetcode"), 0);
strictEqual(maxNumberOfBalloonsUsingArrays("balon"), 0);
strictEqual(
  maxNumberOfBalloonsUsingArrays(
    "krhizmmgmcrecekgyljqkldocicziihtgpqwbticmvuyznragqoyrukzopfmjhjjxemsxmrsxuqmnkrzhgvtgdgtykhcglurvppvcwhrhrjoislonvvglhdciilduvuiebmffaagxerjeewmtcwmhmtwlxtvlbocczlrppmpjbpnifqtlninyzjtmazxdbzwxthpvrfulvrspycqcghuopjirzoeuqhetnbrcdakilzmklxwudxxhwilasbjjhhfgghogqoofsufysmcqeilaivtmfziumjloewbkjvaahsaaggteppqyuoylgpbdwqubaalfwcqrjeycjbbpifjbpigjdnnswocusuprydgrtxuaojeriigwumlovafxnpibjopjfqzrwemoinmptxddgcszmfprdrichjeqcvikynzigleaajcysusqasqadjemgnyvmzmbcfrttrzonwafrnedglhpudovigwvpimttiketopkvqw"
  ),
  10
);
