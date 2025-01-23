import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query.search as string;
    if (searchTerm) {
      const searchConditions = searchableFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      }));
  
      this.modelQuery = this.modelQuery.find({
        $or: searchConditions as FilterQuery<T>[],
      });
    }
    return this;
  }
  
  filter() {
    const { filter } = this.query;
  
    if (filter) {
      const filterCondition: FilterQuery<T> = {
        author: filter as string,
      };
  
      this.modelQuery = this.modelQuery.find(filterCondition);
    }
  
    return this;
  }

  sort() {
    const sortBy = this.query.sortBy || "createdAt";
    const sortOrder = this.query.sortOrder === "asc" ? "" : "-";
    this.modelQuery = this.modelQuery.sort(`${sortOrder}${sortBy}`);
    return this;
  }
  

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
