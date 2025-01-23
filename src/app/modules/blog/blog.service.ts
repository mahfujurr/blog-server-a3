import QueryBuilder from "../../builder/QueryBuilder";
import TBlog from "./blog.interface";
import { BlogModel } from "./blog.model";

const createBlogIntoDB = async (payload: TBlog, userId: string) => {
    const blogData = {
        ...payload,
        author: userId, // Attach the userId as the author
    };
    const result = await BlogModel.create(blogData);

    // Populate the author details after creation
    const populatedResult = await BlogModel.findById(result._id).populate('author');
    return populatedResult;
};



const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
    const modelQuery = BlogModel.find().populate('author'); // Start with base query
    const queryBuilder = new QueryBuilder<TBlog>(modelQuery, query);

    // Apply query methods
    queryBuilder.search(['title', 'content']).filter().sort().paginate().fields();

    // Execute the query
    const result = await queryBuilder.modelQuery.exec();
    return result;
};
const getSingleBlogFromDB = async (id: string) => {
    const result = await BlogModel.findById(id).populate('author');
    return result;
}

const updateBlogIntoDB = async (id: string, payload: TBlog) => {
    const result = await BlogModel.findByIdAndUpdate(id, payload, { new: true });

    // Populate the author details after update
    const populatedResult = await BlogModel.findById(result?._id).populate('author');
    return populatedResult;
};

const deleteBlogFromDB = async (id: string) => {
    const result = await BlogModel.findByIdAndDelete(id);
    return result;
}

export const blogService = {
    createBlogIntoDB,
    getAllBlogsFromDB,
    getSingleBlogFromDB,
    updateBlogIntoDB,
    deleteBlogFromDB
}