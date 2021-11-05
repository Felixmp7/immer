import { addGift, toggleReservation } from 'src/services';

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
});

describe('Reserving an already reserved gift', () => {
    const nextState = toggleReservation(initialState, 'immer_license');

    test('preserves stored reservedBy', () => {
        expect(nextState.gifts[0].reservedBy).toBe(1);
    });
});
