const DisplayConfig = require("../models/displayConfig.model");
const Episodes = require("../models/episodes.model");
const GeneralConfig = require("../models/generalConfig.model");
const Project = require("../models/project.model");
const User = require("../models/user.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

const createProject = asyncHandler(async (req, res) => {
  const { projectName, userId } = req.body;

  if ((!projectName, !userId)) {
    throw new ApiError(400, "All fields are required");
  }

  const project = await Project.create({ projectName, user: userId });
  const generalConfig = await GeneralConfig.create({});
  const displayConfig = await DisplayConfig.create({});

  project.generalConfiguration = generalConfig._id;
  project.displayConfiguration = displayConfig._id;
  await project.save();

  await User.updateOne({ _id: userId }, { $push: { projects: project._id } });
  const populatedProject = await Project.findOne({ _id: project._id }).populate(
    "generalConfiguration displayConfiguration"
  );

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { project: populatedProject },
        "Created Successfully"
      )
    );
});

const getAllProjects = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const allProjects = await Project.find({ user: userId }).populate(
    "generalConfiguration displayConfiguration"
  );

  return res.status(201).json(new ApiResponse(200, { projects: allProjects }));
});

const getProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  console.log(projectId);
  const project = await Project.findOne({ _id: projectId }).populate(
    "generalConfiguration displayConfiguration"
  );

  return res.status(201).json(new ApiResponse(200, { project }));
});

const getEpisode = asyncHandler(async (req, res) => {
  const { episodeId } = req.params;

  const episode = await Episodes.findOne({ _id: episodeId });

  return res.status(201).json(new ApiResponse(200, { episode }));
});

const createEpisode = asyncHandler(async (req, res) => {
  const { name, desc, projectId } = req.body;

  if (!projectId || !desc || !name) {
    throw new ApiError(400, "All fields are required");
  }

  const episode = await Episodes.create({ desc, projectId, episodeName: name });
  await Project.updateOne(
    { _id: projectId },
    { $push: { projectEpisodes: episode._id } }
  );

  return res
    .status(201)
    .json(new ApiResponse(200, { episode }, "Created Successfully"));
});

const getAllEpisodes = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const allEpisodes = await Episodes.find({ projectId }).populate({
    path: "projectId",
    select: "projectName",
  });
  return res.status(201).json(new ApiResponse(200, { episodes: allEpisodes }));
});

const updateEpisode = asyncHandler(async (req, res) => {
  const { episodeId } = req.params;
  const { desc } = req.body;

  if (!episodeId || !desc) {
    throw new ApiError(400, "All fields are required");
  }

  const updatedEpisode = await Episodes.findOneAndUpdate(
    { _id: episodeId },
    { $set: { desc } },
    { new: true }
  );

  return res
    .status(201)
    .json(
      new ApiResponse(200, { episode: updatedEpisode }, "Updated Successfuyyl")
    );
});

const deleteEpisode = asyncHandler(async (req, res) => {
  const { episodeId } = req.params;
  const deletedEpisode = await Episodes.findOneAndDelete({ _id: episodeId });
  console.log(deleteEpisode);
  await Project.updateOne(
    { _id: deletedEpisode.projectId },
    { $pull: { projectEpisodes: episodeId } }
  );
  return res.status(201).json(new ApiResponse(200, {}, "Deleted Successfuyyl"));
});

module.exports = {
  createProject,
  getAllProjects,
  createEpisode,
  getAllEpisodes,
  updateEpisode,
  deleteEpisode,
  getEpisode,
  getProject,
};
