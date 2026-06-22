// src\helpers\extractKeyword.js
export default function extractKeyword(text, keywords) {
  const words = text.trim().split(/\s+/);

  const keyword = words.find(word =>
    keywords.some(
      k => k.toLowerCase() === word.toLowerCase()
    )
  );

  return {
    keyword,
    remainingText: words.filter(word =>
        word.toLowerCase() !== keyword?.toLowerCase()
      ).join(" ")
  };
}