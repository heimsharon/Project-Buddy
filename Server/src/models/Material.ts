import { Schema, model, Document } from 'mongoose';

interface IUnitCoverage {
    length_ft: number;
    width_ft: number;
    height_ft: number;
    sqft: number;
    quantity: number;
}

interface IMaterial extends Document {
    name: string;
    category: 'fencing' | 'paint' | 'drywall' | 'hardware' | 'flooring' | 'tools';
    unit: string;  
    unitCoverage: IUnitCoverage;
    priceUSD: number;
    vendor?: string;
    lastUpdated: Date;
}


const materialSchema = new Schema<IMaterial>({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['fencing', 'paint', 'drywall', 'hardware', 'flooring', 'tools'],
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  unitCoverage: {
    type: new Schema<IUnitCoverage>({
      length_ft: { type: Number },
      width_ft: { type: Number },
      height_ft: { type: Number },
      sqft: { type: Number },
      quantity: { type: Number }
    }),
    default: {
        length_ft: 0,
        width_ft: 0,
        height_ft: 0,
        sqft: 0,
        quantity: 0
    }
  },
  priceUSD: {
    type: Number
  },
  vendor: {
    type: String
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const Material = model<IMaterial>('Material', materialSchema);

export default Material;