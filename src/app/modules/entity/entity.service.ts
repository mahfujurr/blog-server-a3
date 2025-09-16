import TEntity from "./entity.interface";
import { EntityModel } from "./entity.model";

const createEntityIntoDB = async (payload: TEntity) => {
    const result = await EntityModel.create(payload);
    const populatedResult = await EntityModel.findById(result._id);
    return populatedResult;
};

const getAllEntitiesFromDB = async () => {
    const result = await EntityModel.find();
    return result;
};

const getSingleEntityFromDB = async (id: string) => {
    const result = await EntityModel.findById(id);
    return result;
};

const updateEntityIntoDB = async (id: string, payload: Partial<TEntity>) => {
    const result = await EntityModel.findByIdAndUpdate(id, payload, { new: true });
    const populatedResult = await EntityModel.findById(result?._id);
    return populatedResult;
};

const deleteEntityFromDB = async (id: string) => {
    const result = await EntityModel.findByIdAndDelete(id);
    return result;
};

export const entityService = {
    createEntityIntoDB,
    getAllEntitiesFromDB,
    getSingleEntityFromDB,
    updateEntityIntoDB,
    deleteEntityFromDB
};
