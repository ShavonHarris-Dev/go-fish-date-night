import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from './Components/Card';


describe('Card', () => {
    it('displays the suggestion when flipped', ()  => {
        render(
            <Card suggestion="Hiking" onFlip={() => {}} isFlipped={true} isMatch={false} />
        );

        expect(screen.getByRole('button')).toHaveTextContent('Hiking');
    });

    it('displays click to flip when not flipped', () => {
        render(
            <Card suggestion="Hiking" onFlip={() => {}} isFlipped={false} isMatch={false} />
        );
        
        expect(screen.getByRole('button')).toHaveTextContent('Click to flip');
    });

    it('calls onFlip when clicked', () => {
        const onFlip = jest.fn();
         render(
          <Card suggestion="Test" onFlip={onFlip} isFlipped={false} isMatch={false} />
        );
    
        fireEvent.click(screen.getByRole('button'));
        expect(onFlip).toHaveBeenCalled();
      });

});