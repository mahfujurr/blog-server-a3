import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { entityService } from "./entity.service";

const createEntity = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body; 

    const result = await entityService.createEntityIntoDB(payload);
    sendResponse(res, {
        success: true,
        message: "Data added successfully",
        statusCode: httpStatus.CREATED,
        data: result
    });
});

const getAllEntities = catchAsync(async (req: Request, res: Response) => {
    const result = await entityService.getAllEntitiesFromDB();
    sendResponse(res, {
        success: true,
        message: "Data fetched successfully",
        statusCode: httpStatus.OK,
        data: result
    });
});

const getSingleEntity = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await entityService.getSingleEntityFromDB(id);

    sendResponse(res, {
        success: true,
        message: "Data fetched successfully",
        statusCode: httpStatus.OK,
        data: result
    });
});

const updateEntity = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await entityService.updateEntityIntoDB(id, req.body);

    sendResponse(res, {
        success: true,
        message: "Data updated successfully",
        statusCode: httpStatus.OK,
        data: result
    });
});

const deleteEntity = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    await entityService.deleteEntityFromDB(id);
    sendResponse(res, {
        success: true,
        message: "Data deleted successfully",
        statusCode: httpStatus.OK
    });
});

export const entityController = {
    createEntity,
    getAllEntities,
    getSingleEntity,
    updateEntity,
    deleteEntity
};
