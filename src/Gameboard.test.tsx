import { render, screen, fireEvent} from '@testing-library/react';
import GameBoard from './Components/GameBoard';


describe('GameBoard', () => {
    test('renders a shuffled deck', () => {
        render(<GameBoard />);
        const cards = screen.getAllByRole('button');
        const cardTexts = cards.map(card => card.textContent);
        expect(cardTexts).not.toEqual(['Camping', 'Movie Night', 'Cooking Together', 'Hiking'])
    });
test.skip('flips a card when clicked', () => {
    render(<GameBoard />);
    const cards = screen.getAllByRole('button', { name: /Click to flip/i });
    const options = ['Camping', 'Movie Night', 'Cooking Together', 'Hiking', 'Picnic in the Park', 'Visit a Museum', 'Beach Day', 'Bike Ride', 'Game Night', 'Wine Tasting', 'Dance Class', 'DIY Project'];
    cards.forEach(card => {
        fireEvent.click(card);
        expect(options).toContain(card.textContent);
    });
});
});

