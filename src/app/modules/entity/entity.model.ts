import mongoose, { Schema } from "mongoose";
import TEntity from "./entity.interface";

const entitySchema = new Schema<TEntity>({
  entityType: { type: String, required: true },
  name: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String },
  address3: { type: String },
  phone: { type: String },
  email: { type: String },
  taxId: { type: String },
  loadingPort: { type: String },
  dischargePort: { type: String },
  country: { type: String },
});

// Compound unique index: entityType + name
entitySchema.index({ entityType: 1, name: 1 }, { unique: true });

export const EntityModel = mongoose.model<TEntity>("Entity", entitySchema);

