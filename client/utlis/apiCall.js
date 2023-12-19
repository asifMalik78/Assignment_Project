const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const loginUser = async function (userData) {
  const res = await fetch(`${apiUrl}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const { data } = await res.json();

  return data?.user;
};

export const updateUserAccount = async function (userId, userData) {
  const res = await fetch(`${apiUrl}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const { data } = await res.json();

  return data?.user;
};

export const getUserProjects = async function (userId) {
  const res = await fetch(`${apiUrl}/project/all/${userId}`);
  const data = await res.json();
  const {
    data: { projects },
  } = data;
  return projects;
};

export const createProject = async function (projectData) {
  const res = await fetch(`${apiUrl}/project/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });

  const data = await res.json();
  const {
    data: { project },
  } = data;
  return project;
};

export const getAllEpisodes = async function (projectId) {
  const res = await fetch(`${apiUrl}/project/episodes/all/${projectId}`);
  const data = await res.json();
  const {
    data: { episodes },
  } = data;
  return episodes;
};

export const uploadEpisode = async function (episodeData) {
  const res = await fetch(`${apiUrl}/project/episodes/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(episodeData),
  });

  const data = await res.json();
  const {
    data: { episode },
  } = data;

  return episode;
};

export const deleteEpisode = async function (episodeId) {
  await fetch(`${apiUrl}/project/episode/${episodeId}`, {
    method: "DELETE",
  });
};

export const getProject = async function (projectId) {
  
  const res = await fetch(`${apiUrl}/project/${projectId}`);
  const data = await res.json();
  const {
    data: { project },
  } = data;

  return project;
};

export const getEpisode = async function (episodeId) {
  const res = await fetch(`${apiUrl}/project/episode/${episodeId}`);
  const data = await res.json();
  const {
    data: { episode },
  } = data;

  return episode;
};

export const updateEpisodeDesc = async function (episodeId, episodeData) {
  const res = await fetch(`${apiUrl}/project/episode/${episodeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(episodeData),
  });
  const data = await res.json();
  const {
    data: { episode },
  } = data;

  return episode;
};

export const updateGeneralConfig = async function (configId, configData) {
  const res = await fetch(`${apiUrl}/config/general/${configId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(configData),
  });
  const data = await res.json();
  const {
    data: { generalConfiguration },
  } = data;

  return generalConfiguration;
};

export const updateDisplayConfig = async function (configId, configData) {
  const res = await fetch(`${apiUrl}/config/display/${configId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(configData),
  });
  const data = await res.json();
  const {
    data: { displConfiguration },
  } = data;

  return displConfiguration;
};
