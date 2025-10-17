// Test Compatibility Algorithm

// Simulação do algoritmo
function calculateCompatibilityScore(type1, type2) {
  // Exact match
  if (type1 === type2) return 85;

  // Get dimensions
  const t1 = type1.split('');
  const t2 = type2.split('');

  let score = 50; // Base score

  // E/I compatibility
  if (t1[0] === t2[0]) {
    score += 10; // Same energy orientation
  } else {
    score += 15; // Opposite energy can be complementary
  }

  // S/N compatibility (most important)
  if (t1[1] === t2[1]) {
    score += 20; // Same perception style is crucial
  } else {
    score -= 10; // Different perception can cause friction
  }

  // T/F compatibility
  if (t1[2] === t2[2]) {
    score += 10; // Same decision-making style
  } else {
    score += 15; // Opposite can be complementary
  }

  // J/P compatibility
  if (t1[3] === t2[3]) {
    score += 10; // Same lifestyle preference
  } else {
    score += 5; // Can be complementary but requires work
  }

  // Cap at 100
  return Math.min(100, score);
}

console.log('\n=== Testing Compatibility Algorithm ===\n');

const testCases = [
  ['INTJ', 'INTJ'],  // Same type
  ['INTJ', 'ENFP'],  // Classic "Golden Pair"
  ['INTJ', 'ENTP'],  // Similar N+T
  ['ISTJ', 'ENFP'],  // Very different
  ['INFJ', 'ENFP'],  // Similar F+N
];

testCases.forEach(([type1, type2]) => {
  const score = calculateCompatibilityScore(type1, type2);
  console.log(`${type1} + ${type2} = ${score}%`);
});

console.log('\n=== Algorithm Test Complete ===\n');
