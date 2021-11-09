import {
    addBook, addGift, getBookDetails, toggleReservation,
} from 'src/services';

const initialState = {
    users: [
        { id: 1, name: 'Felix' },
        { id: 2, name: 'Eliana' },
    ],
    currentUser: {
        id: 1, name: 'Felix',
    },
    gifts: [
        {
            id: 'immer_license',
            description: 'Description',
            image: 'https://picsum.photos/200',
            reservedBy: undefined,
        },
        {
            id: 'egghead_subscription',
            description: 'Description',
            image: 'https://picsum.photos/200',
            reservedBy: 2,
        },
    ],
};

describe('Reserving and unreserved gifts', () => {
    test('didnt modify state...', () => {
        expect(initialState.gifts).toHaveLength(2);
    });
    test('should add new gift', () => {
        const nextState = addGift(initialState, 'react_license', 'test');
        expect(nextState.gifts).toHaveLength(3);
    });
});

describe('Reserving an unreserved gift', () => {
    const nextState = toggleReservation(initialState, 'egghead_subscription');

    test('correctly stores reservedBy', () => {
        expect(nextState.gifts[1].reservedBy).toBe(2);
    });

    test("didn't the original state", () => {
        expect(initialState.gifts[0].reservedBy).toBe(undefined);
    });

    test('when egghead_subscription change, the rest of state does not change', () => {
        expect(nextState.gifts[0]).toBe(initialState.gifts[0]);
    });

    test("can't accidentally modify the produced state", () => {
        expect(() => {
            nextState.gifts[1].reservedBy = undefined;
        }).toThrow('read only');
    });
});

describe('Reserving an already reserved gift', () => {
    const nextState = toggleReservation(initialState, 'immer_license');

    test('preserves stored reservedBy', () => {
        expect(nextState.gifts[0].reservedBy).toBe(1);
    });
});

describe('Can add books async', () => {
    test('Can add math book', async () => {
        const book = await getBookDetails('0201558025');
        const nextState = addBook(initialState, book);
        expect(nextState.gifts[2].description).toBe('Concrete mathematics');
    });

    test('Can add two books in parallel', async () => {
        const promise1 = getBookDetails('0201558025');
        const promise2 = getBookDetails('9781598560169');
        const nextState = addBook(addBook(initialState, await promise1), await promise2);
        expect(nextState.gifts.length).toBe(4);
    });
});
