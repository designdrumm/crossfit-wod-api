import * as uuid from "uuid";
import { Record } from "../database/Record.js";

const getAllRecords = (workoutId, filterParams) => {
  try {
    const allRecords = Record.getAllRecords(workoutId, filterParams);
    return allRecords;
  } catch (error) {
    throw error;
  }
};

const getRecordForWorkout = (workoutId, recordId) => {
  try {
    const record = Record.getRecordForWorkout(workoutId, recordId);
    return record;
  } catch (error) {
    throw error;
  }
};

const createNewWorkoutRecord = (newRecord) => {
  const recordToInsert = {
    ...newRecord,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };
  try {
    const createdRecord = Record.createNewWorkoutRecord(recordToInsert);
    return createdRecord;
  } catch (error) {
    throw error;
  }
};

const updateWorkoutRecord = (workoutId, recordId, changes) => {
  try {
    const updatedWorkout = Record.updateWorkoutRecord(
      workoutId,
      recordId,
      changes
    );
    return updatedWorkout;
  } catch (error) {
    throw error;
  }
};

const deleteWorkoutRecord = (workoutId, recordId) => {
  try {
    Record.deleteWorkoutRecord(workoutId, recordId);
  } catch (error) {
    throw error;
  }
};

export const recordService = {
  getAllRecords,
  getRecordForWorkout,
  createNewWorkoutRecord,
  updateWorkoutRecord,
  deleteWorkoutRecord,
};
