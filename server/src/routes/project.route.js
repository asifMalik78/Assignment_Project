const express = require("express");
const {
  createProject,
  getAllProjects,
  createEpisode,
  getAllEpisodes,
  updateEpisode,
  deleteEpisode,
  getEpisode,
  getProject,
} = require("../controllers/project.controller");
const router = express.Router();

//create project
router.route("/create").post(createProject);

//get all projects
router.route("/all/:userId").get(getAllProjects);

//get single project
router.route("/:projectId").get(getProject);

//create Episode
router.route("/episodes/create").post(createEpisode);

//get all Episode
router.route("/episodes/all/:projectId").get(getAllEpisodes);

//get single Episode
router.route("/episode/:episodeId").get(getEpisode)

//update episode
router.route("/episode/:episodeId").put(updateEpisode);

//delete episode
router.route("/episode/:episodeId").delete(deleteEpisode);

module.exports = router;
