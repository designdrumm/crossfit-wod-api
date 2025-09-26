import { recordService } from "../services/recordService.js";

const getAllRecords = (req, res) => {
  const { workoutId } = req.params;
  if (!workoutId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':workoutId' can not be empty" },
    });
  }
  const { record } = req.query;
  try {
    const allRecords = recordService.getAllRecords(workoutId, record);
    res.send({ status: "OK", records: allRecords });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", records: { error: error?.message || error } });
  }
};

const getRecordForWorkout = (req, res) => {
  const { workoutId, recordId } = req.params;
  if (!workoutId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':workoutId' can not be empty" },
    });
  }
  if (!recordId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':, recordId' can not be empty" },
    });
  }
  try {
    const record = recordService.getRecordForWorkout(workoutId, recordId);
    res.send({ status: "OK", records: record });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", records: { error: error?.message || error } });
  }
};

const createNewWorkoutRecord = (req, res) => {
  const { body } = req;
  if (!body.id || !body.workout || !body.record) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'id', 'workout', 'record'",
      },
    });
    return;
  }
  const newRecord = {
    id: body.id,
    workout: body.workout,
    record: body.record,
  };
  try {
    const createdRecord = recordService.createNewWorkoutRecord(newRecord);
    res.status(201).send({ status: "OK", records: createdRecord });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", records: { error: error?.message || error } });
  }
};

const updateWorkoutRecord = (req, res) => {
  const { body } = req;
  const { workoutId, recordId } = req.params;
  if (!workoutId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':workoutId' can not be empty" },
    });
  }
  if (!recordId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':recordId' can not be empty" },
    });
  }
  try {
    const updatedRecord = recordService.updateWorkoutRecord(
      workoutId,
      recordId,
      body
    );
    res.send({ status: "OK", records: updatedRecord });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", records: { error: error?.message || error } });
  }
};

const deleteWorkoutRecord = (req, res) => {
  // const {
  //   params: { workoutId, recordId },
  // } = req;
  const { workoutId, recordId } = req.params;
  if (!workoutId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':workoutId' can not be empty" },
    });
  }
  if (!recordId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':recordId' can not be empty" },
    });
  }
  try {
    recordService.deleteWorkoutRecord(workoutId, recordId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", records: { error: error?.message || error } });
  }
};

export const recordController = {
  getAllRecords,
  getRecordForWorkout,
  createNewWorkoutRecord,
  updateWorkoutRecord,
  deleteWorkoutRecord,
};
