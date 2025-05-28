import React from 'react';

export interface MenuItem {
    title: string;
    url?: string;
    icon?: React.ReactNode;
    action?: () => void;
    submenu?: MenuItem[];
}

export interface SingleLevelDropdownMenuProps {
    buttonLabel: string;
    items: MenuItem[];
}
