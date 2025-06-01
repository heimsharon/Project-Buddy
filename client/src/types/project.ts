export interface BudgetItem {
    id: string;
    name: string;
    estimatedCost: number;
    actualCost?: number;
    category: 'materials' | 'labor' | 'tools' | 'other';
}

export interface Task {
    id: string;
    description: string;
    dueDate?: Date;
    completed: boolean;
    assignedTo?: string;
}

export interface Project {
    id: string;
    title: string;
    description?: string;
    type: string;
    dimensions: {
        length: number | null;
        width: number | null;
        height: number | null;
    };
    estimatedBudget: number | null;
    actualBudget?: number;
    userId: string;
    materialIds: Material[];
    createdAt: Date;
    dueDate?: Date | null;
}

export interface unitCoverage {
    length_ft: number;
    width_ft: number;
    height_ft: number;
    width_in: number;
    length_in: number;
    thickness_in: number;
    weight_lb: number;
    weight_ton: number;
    sqft: number;
}

export interface Material {
    id: string;
    name: string;
    category: 'fencing' | 'paint' | 'drywall' | 'lumber' | 'concrete' | 'roofing' | 'plumbing' | 'electrical' | 'flooring' | 'insulation' | 'decking' | 'stain' | 'landscaping' | 'hardware' | 'tools' | 'HVAC' | 'siding' | 'masonry';
    unit: string;  
    unitCoverage: unitCoverage;
    quantity: number;
    priceUSD: number;
    vendor?: string;
    lastUpdated: Date;
}
