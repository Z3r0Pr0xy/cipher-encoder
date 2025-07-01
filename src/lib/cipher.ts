export function vigenereCipher(text: string, key: string, decrypt: boolean = false): string {
    if (!key) return text;
    
    let result = '';
    const keyLength = key.length;
    let keyIndex = 0;

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const isUpperCase = alphabet.includes(char);
        const isLowerCase = lowerAlphabet.includes(char);

        if (isUpperCase || isLowerCase) {
            const currentAlphabet = isUpperCase ? alphabet : lowerAlphabet;
            const keyChar = key[keyIndex % keyLength].toUpperCase();
            const keyShift = alphabet.indexOf(keyChar);
            
            const charIndex = currentAlphabet.indexOf(char);
            
            let newIndex;
            if (decrypt) {
                newIndex = (charIndex - keyShift + 26) % 26;
            } else {
                newIndex = (charIndex + keyShift) % 26;
            }
            
            result += currentAlphabet[newIndex];
            keyIndex++;
        } else {
            result += char;
        }
    }

    return result;
}
