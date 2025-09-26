import { dbConnect } from "./dbConnect.js";
import { saveToDatabase } from "./utils.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 6a89217b-7c28-4219-bd7f-af119c314159
 *         name:
 *           type: string
 *           example: Greg Bronson
 *         gender:
 *           type: string
 *           example: male
 *         dateOfBirth:
 *           type: date
 *           example: 08/04/1993
 *         email:
 *           type: string
 *           example: greg@mail.com
 *         password:
 *           type: string
 *           example: a6dcde7eceb689142f21a1e30b5fdb868ec4cd25d5537d67ac7e8c7816b0e862
 *         createdAt:
 *           type: string
 *           example: 4/20/2025, 2:21:56 PM
 *         updatedAt:
 *           type: string
 *           example: 4/20/2025, 2:21:56 PM
 */

let mDB = {};

mDB = await dbConnect("find", "all");

const getAllMembers = (filterParams) => {
  try {
    let members = mDB[0].members;
    if (filterParams.gender) {
      return mDB[0].members.filter((member) =>
        member.gender.toLowerCase().includes(filterParams.gender)
      );
    }
    return members;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneMember = (memberId) => {
  try {
    const member = mDB[0].members.find((member) => member.id === memberId);
    if (!member) {
      throw {
        status: 400,
        message: `Can't find member with the id '${memberId}'`,
      };
    }
    return member;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewMember = (newMember) => {
  const isAlreadyAdded =
    mDB[0].members.findIndex((member) => member.name === newMember.name) > -1;
  if (isAlreadyAdded) {
    throw {
      status: 400,
      message: `Member with the name '${newMember.name}' already exists`,
    };
  }
  try {
    mDB[0].members.push(newMember);
    saveToDatabase(mDB);
    return newMember;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateOneMember = (memberId, changes) => {
  try {
    const isAlreadyAdded =
      mDB[0].members.findIndex((member) => member.name === changes.name) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Member with the name '${changes.name}' already exists`,
      };
    }
    const indexForUpdate = mDB[0].members.findIndex(
      (member) => member.id === memberId
    );
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find member with the id '${memberId}'`,
      };
    }
    const updatedMember = {
      ...mDB[0].members[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    mDB[0].members[indexForUpdate] = updatedMember;
    saveToDatabase(mDB);
    return updatedMember;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneMember = (memberId) => {
  try {
    const indexForDeletion = mDB[0].members.findIndex(
      (member) => member.id === memberId
    );
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find member with the id '${memberId}'`,
      };
    }
    mDB[0].members.splice(indexForDeletion, 1);
    saveToDatabase(mDB);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const Member = {
  getAllMembers,
  getOneMember,
  createNewMember,
  updateOneMember,
  deleteOneMember,
};

export default Member;
