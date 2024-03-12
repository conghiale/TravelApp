export const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const randomNumberString = () => {
    // Generate a random number between 1000 and 9999
    return Math.floor(Math.random() * 9000) + 1000;
}