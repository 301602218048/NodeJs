const Meetings = require("../models/meeting");

const passGen = () => {
  let pass = "";
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < 10; i++) {
    let char = Math.floor(Math.random() * str.length + 1);
    pass += str.charAt(char);
  }

  return pass;
};

const addMeeting = async (req, res) => {
  try {
    const { name, email, time } = req.body;
    const rand = passGen();
    const link = `http://meet.google.com/${rand}`;
    const meeting = await Meetings.create({
      name: name,
      email: email,
      time: time,
      link: link,
    });
    res.status(201).json({
      msg: `Meeting for ${name} successfully added`,
      data: meeting,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message, data: null });
  }
};

const getAllMeeting = async (req, res) => {
  try {
    const meeting = await Meetings.findAll();
    if (meeting.length == 0) {
      res.status(404).json({ msg: "No meeting in database", data: null });
      return;
    }
    res.status(200).json({
      msg: "Here is the list of all meetings",
      data: meeting,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message, data: null });
  }
};

const deleteMeeting = async (req, res) => {
  try {
    const id = req.params.id;
    const meeting = await Meetings.findByPk(id);
    if (!meeting) {
      res.status(404).json({ msg: "meeting not found", data: null });
      return;
    }
    await Meetings.destroy({ where: { id: id } });
    res
      .status(200)
      .json({ msg: `meeting with id ${id} has been deleted`, data: meeting });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message, data: null });
  }
};

module.exports = {
  addMeeting,
  getAllMeeting,
  deleteMeeting,
};
