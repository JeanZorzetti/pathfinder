/**
 * Comparison Code Generator
 * Generates unique comparison codes for users
 * Format: MBTI-XXXXXX (e.g., "INTJ-A7K9M2")
 */

export class CodeGenerator {
  // Excluding I, O, 0, 1 for clarity
  private static readonly CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  private static readonly CODE_LENGTH = 6;

  /**
   * Generate a unique comparison code
   * @param mbtiType - The user's MBTI type (e.g., "INTJ")
   * @returns Formatted code (e.g., "INTJ-A7K9M2")
   */
  static generate(mbtiType: string): string {
    const randomPart = this.generateRandomString(this.CODE_LENGTH);
    return `${mbtiType.toUpperCase()}-${randomPart}`;
  }

  /**
   * Parse a comparison code into its components
   * @param code - The comparison code to parse
   * @returns Object with mbtiType and id, or null if invalid
   */
  static parse(code: string): { mbtiType: string; id: string } | null {
    const parts = code.split('-');
    if (parts.length !== 2) return null;

    const [mbtiType, id] = parts;

    // Validate MBTI type (must be 4 letters)
    if (mbtiType.length !== 4) return null;

    // Validate ID (must be 6 characters from our charset)
    if (id.length !== this.CODE_LENGTH) return null;

    return { mbtiType: mbtiType.toUpperCase(), id };
  }

  /**
   * Validate a comparison code format
   * @param code - The code to validate
   * @returns true if valid, false otherwise
   */
  static isValid(code: string): boolean {
    return this.parse(code) !== null;
  }

  /**
   * Generate a random string from the charset
   * @param length - Length of the string to generate
   * @returns Random string
   */
  private static generateRandomString(length: number): string {
    let result = '';
    const charsLength = this.CHARS.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charsLength);
      result += this.CHARS[randomIndex];
    }

    return result;
  }

  /**
   * Extract MBTI type from a comparison code
   * @param code - The comparison code
   * @returns MBTI type or null if invalid
   */
  static extractMbtiType(code: string): string | null {
    const parsed = this.parse(code);
    return parsed ? parsed.mbtiType : null;
  }
}
