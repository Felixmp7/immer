import { getCurrentUserSession, setCurrentUserSession } from 'src/services/session';
import allUsers from 'src/static/users.json';
import defaultGifts from 'src/static/gifts.json';

const useSession = () => {
    const users = allUsers.map((emoji, index) => ({ id: index, name: emoji }));

    const getCurrentUser = () => {
        if (typeof sessionStorage === 'undefined') return null;
        const currentUserId = getCurrentUserSession() || Math.round(Math.random() * (users.length - 1));
        setCurrentUserSession(currentUserId);
        return users[currentUserId];
    };

    const getInitialState = () => ({
        users,
        currentUser: getCurrentUser(),
        gifts: defaultGifts,
    });

    return { getCurrentUser, getInitialState };
};

export default useSession;
