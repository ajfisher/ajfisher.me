// nav.test.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Nav from '../src/components/nav';

describe('Nav Component', () => {
  it('initially renders with menu closed', () => {
    render(<Nav />);
    const button = screen.getByTestId('nav-button');
    const overlay = screen.getByTestId('nav-overlay');
    const drawer = screen.getByTestId('nav-drawer');

    // When closed, the overlay should not be visible and the drawer should be offscreen.
    expect(overlay).toHaveStyle('display: none');
    expect(drawer).toHaveStyle('right: -100%');
    // The MainNavigation is rendered but its display is controlled by CSS on large screens.
    expect(screen.getByTestId('nav-main-navigation')).toBeInTheDocument();
  });

  it('toggles menu open and closed when the nav button and overlay are clicked', () => {
    render(<Nav />);
    const button = screen.getByTestId('nav-button');
    const overlay = screen.getByTestId('nav-overlay');
    const drawer = screen.getByTestId('nav-drawer');

    // Open the menu:
    fireEvent.click(button);
    expect(overlay).toHaveStyle('display: block');
    expect(drawer).toHaveStyle('right: 0');

    // Close the menu by clicking the overlay:
    fireEvent.click(overlay);
    expect(overlay).toHaveStyle('display: none');
    expect(drawer).toHaveStyle('right: -100%');
  });
});

