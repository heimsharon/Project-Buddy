import React, { useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { SingleLevelDropdownMenuProps, MenuItem } from '../../types/menu';

/**
 * Helper function to render a single menu item.
 * Supports both link and button actions, and optional submenus.
 * Closes the dropdown when a menu item is clicked.
 */
const renderMenuItem = (
    item: MenuItem,
    open: boolean,
    idx: number,
    closeDropdown: () => void
) => (
    <div className="dropdown-item-with-submenu" key={idx}>
        {item.url ? (
            // If the item has a URL, render as a Link
            <Link
                to={item.url}
                role="menuitem"
                tabIndex={open ? 0 : -1}
                onClick={closeDropdown}
            >
                {item.icon} {item.title}
            </Link>
        ) : (
            // Otherwise, render as a button for actions
            <button
                onClick={() => {
                    if (item.action) item.action();
                    closeDropdown();
                }}
                className="dropdown-action"
                type="button"
                role="menuitem"
                tabIndex={open ? 0 : -1}
            >
                {item.icon} {item.title}
            </button>
        )}
        {/* Render submenu if present */}
        {item.submenu && (
            <div className="submenu">
                {item.submenu.map((sub, subIdx) =>
                    renderMenuItem(sub, open, subIdx, closeDropdown)
                )}
            </div>
        )}
    </div>
);

/**
 * SingleLevelDropdownMenu
 *
 * Renders a dropdown menu with accessible keyboard and mouse controls.
 * Accepts a button label and an array of menu items (with optional submenus).
 * - Closes dropdown on outside click or menu item click.
 * - Handles keyboard navigation (Enter, Space, ArrowDown, Escape).
 */
const SingleLevelDropdownMenu: React.FC<SingleLevelDropdownMenuProps> = ({
    buttonLabel,
    items,
}) => {
    const [open, setOpen] = useState(false); // Dropdown open/close state
    const menuRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside the menu
    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node)
        ) {
            setOpen(false);
        }
    }, []);

    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, [handleClickOutside]);

    // Handle keyboard navigation for accessibility
    function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
            setOpen(true);
        } else if (e.key === 'Escape') {
            setOpen(false);
        }
    }

    // Close dropdown when a menu item is clicked
    const closeDropdown = () => setOpen(false);

    return (
        <div className="dropdown" ref={menuRef}>
            {/* Dropdown trigger button */}
            <button
                className="dropbtn"
                aria-haspopup="true"
                aria-expanded={open}
                aria-controls={`dropdown-menu-${buttonLabel}`}
                onClick={() => setOpen((prev) => !prev)}
                onKeyDown={handleKeyDown}
                aria-label={buttonLabel}
            >
                {buttonLabel}
            </button>

            {/* Dropdown menu content */}
            <div
                className="dropdown-content"
                id={`dropdown-menu-${buttonLabel}`}
                role="menu"
                style={{ display: open ? 'block' : 'none' }}
            >
                {items.map((item, idx) =>
                    renderMenuItem(item, open, idx, closeDropdown)
                )}
            </div>
        </div>
    );
};

export default SingleLevelDropdownMenu;
