import { memberService } from "../services/memberService.js";

const getAllMembers = (req, res) => {
  const { gender } = req.query;
  try {
    let allMembers = memberService.getAllMembers({ gender });
    if (allMembers.length) {
      res.send({ status: "OK", members: allMembers });
    } else {
      res.send({ status: "FAILED", members: "No members found" });
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneMember = (req, res) => {
  const { memberId } = req.params;
  if (!memberId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':memberId' can not be empty" },
    });
  }
  try {
    const member = memberService.getOneMember(memberId);
    res.send({ status: "OK", members: member });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", members: { error: error?.message || error } });
  }
};

const createNewMember = (req, res) => {
  const { body } = req;
  if (
    !body.id ||
    !body.name ||
    !body.gender ||
    !body.dateOfBirth ||
    !body.email ||
    !body.password
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'id', 'name', 'gender', 'dateOfBirth', 'email', 'password'",
      },
    });
    return;
  }
  const newMember = {
    id: body.id,
    name: body.name,
    gender: body.gender,
    dateOfBirth: body.dateOfBirth,
    email: body.email,
    password: body.password,
  };
  try {
    const createdMember = memberService.createNewMember(newMember);
    res.status(201).send({ status: "OK", members: createdMember });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", members: { error: error?.message || error } });
  }
};

const updateOneMember = (req, res) => {
  const { body } = req;
  const { memberId } = req.params;
  if (!memberId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':memberId' can not be empty" },
    });
  }
  try {
    const updatedMember = memberService.updateOneMember(memberId, body);
    res.send({ status: "OK", members: updatedMember });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", members: { error: error?.message || error } });
  }
};

const deleteOneMember = (req, res) => {
  const { memberId } = req.params;
  if (!memberId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':memberId' can not be empty" },
    });
  }
  try {
    memberService.deleteOneMember(memberId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", members: { error: error?.message || error } });
  }
};

export const memberController = {
  getAllMembers,
  getOneMember,
  createNewMember,
  updateOneMember,
  deleteOneMember,
};
