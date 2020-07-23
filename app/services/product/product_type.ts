import * as MongoDb from 'mongodb'

export type Product = {
  id: MongoDb.ObjectId;
  sku: string;
  description: string;
  name: string;
  unitPrice: number;
}

export type ProductAny = {
  id?: MongoDb.ObjectId;
  sku?: string;
  description?: string;
  name?: string;
  unitPrice?: number;
}
