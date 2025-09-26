import { dbConnect } from "./dbConnect.js";
import { saveToDatabase } from "./utils.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     Record:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: ad75d475-ac57-44f4-a02a-8f6def58ff56
 *         workout:
 *           type: string
 *           example: 4a3d9aaa-608c-49a7-a004-66305ad4ab50
 *         record:
 *           type: string
 *           example: 160 reps
 *         memberId:
 *           type: string
 *           example: 11817fb1-03a1-4b4a-8d27-854ac893cf41
 *         member:
 *           type: string
 *           example: /members/:memberId
 */

let rDB = {};

rDB = await dbConnect("find", "all");

const getAllRecords = (workoutId, filterParams) => {
  try {
    let records = rDB[0].records;
    //console.log("records:");
    //console.log(records);
    if (workoutId.length) {
      //let filter_records = [];
      // records.forEach((a_record) => {
      //   if (a_record.workout === workoutId) {
      //     filter_records.push(a_record);
      //   }
      // });
      // rDB[0].records.filter((record) =>
      //   record.workout === workoutId ? filter_records.push(record) : false
      // );
      var filter_records = rDB[0].records.filter((record) => {
        if (record.workout === workoutId) {
          return record;
        }
      });
      // console.log("filter records:");
      // console.log(filter_records);
      return filter_records;
    } else if (filterParams.record) {
      return rDB[0].records.filter(
        (a_record) =>
          a_record.record.toLowerCase() === filterParams.record.toLowerCase()
      );
    }
    return records;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getRecordForWorkout = (workoutId, recordId) => {
  try {
    const record = rDB[0].records.filter(
      (record) => record.workout === workoutId && record.id === recordId
    );
    if (!record) {
      throw {
        status: 400,
        message: `Can't find workout with the record id '${recordId}'`,
      };
    }
    return record;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewWorkoutRecord = (newRecord) => {
  const isAlreadyAdded =
    rDB[0].records.findIndex((record) => record.id === newRecord.id) > -1;
  if (isAlreadyAdded) {
    throw {
      status: 400,
      message: `Record with the id '${newRecord.id}' already exists`,
    };
  }
  try {
    rDB[0].records.push(newRecord);
    saveToDatabase(rDB);
    return newRecord;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateWorkoutRecord = (recordId, changes) => {
  try {
    const isAlreadyAdded =
      rDB[0].records.findIndex((record) => record.id === changes.id) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Record with the id '${changes.id}' already exists`,
      };
    }
    const indexForUpdate = rDB[0].records.findIndex(
      (record) => record.id === recordId
    );
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find record with the id '${recordId}'`,
      };
    }
    const updatedRecord = {
      ...rDB[0].records[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    rDB[0].records[indexForUpdate] = updatedRecord;
    saveToDatabase(rDB);
    return updatedRecord;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteWorkoutRecord = (recordId) => {
  try {
    const indexForDeletion = rDB[0].records.findIndex(
      (record) => record.id === recordId
    );
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find record with the id '${recordId}'`,
      };
    }
    rDB[0].records.splice(indexForDeletion, 1);
    saveToDatabase(rDB);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

export const Record = {
  getAllRecords,
  getRecordForWorkout,
  createNewWorkoutRecord,
  updateWorkoutRecord,
  deleteWorkoutRecord,
};
