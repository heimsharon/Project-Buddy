export interface Project {
    id: string;
    name: string;
    description: string;
    budget: number;
    status: 'planning' | 'in-progress' | 'completed';
    materials: Material[];
  }
  
  export interface Material {
    id: string;
    name: string;
    quantity: number;
    unit: 'sqft' | 'pieces' | 'gallons';
    cost: number;
  }