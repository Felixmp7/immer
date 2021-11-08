export const getCurrentUserSession = () => {
    const userId = sessionStorage.getItem('@currentUserId');
    return userId ? parseInt(userId) : null;
};
export const setCurrentUserSession = (userId: number) => {
    sessionStorage.setItem('@currentUserId', String(userId));
};
