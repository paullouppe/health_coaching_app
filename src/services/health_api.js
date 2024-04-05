import axios from 'axios';

const API_BASE_URL = 'https://health.shrp.dev';
const PEOPLE_STORAGE_KEY = 'peopleData';
const PHYSICAL_ACTIVITIES_STORAGE_KEY = 'physicalActivitiesData'
const PHYSIOLOGICAL_DATA_STORAGE_KEY = 'physiologicalData'
const CACHE_DURATION = 1000 * 60 * 60;

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

async function fetchDataWithCache(uri, storageKey, cacheDuration) {
  const cachedData = localStorage.getItem(storageKey);
  if (cachedData) {
    const { expiry, data } = JSON.parse(cachedData);

    if (expiry > Date.now()) {
      console.log("Data from cache");
      return data;
    }
  }

  const data = await apiService.get(uri);

  localStorage.setItem(
    storageKey,
    JSON.stringify({
      expiry: Date.now() + cacheDuration,
      data,
    })
  );

  console.log("Data from distant");
  if (storageKey === PEOPLE_STORAGE_KEY)
    feedDataWithIcons(data);
  return data;
}

export const getPeople = async () => {
  return await fetchDataWithCache("/items/people", PEOPLE_STORAGE_KEY, CACHE_DURATION)
    .then(data => {
      return data.data;
    })
    .catch(error => {
      console.error('Failed to fetch data:', error);
    });
}

export const getPeopleById = async (id) => {
  const cachedData = localStorage.getItem(PEOPLE_STORAGE_KEY);
  if (cachedData) {
    const { expiry, data } = JSON.parse(cachedData);

    if (expiry > Date.now()) {
      console.log("Data from cache");
      let person = null;
      data.data.data.forEach(p => {
        if(p.id === id)
          person = p;
      });
      if (person) {
        return person;
      }
    }
  }

  try {
    const response = await apiService.get(`/items/people/${id}`);
    console.log("Data from distant");
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
};



export const getPhysicalActivities = async () => {
  return await fetchDataWithCache("/items/physicalActivities", PHYSICAL_ACTIVITIES_STORAGE_KEY, CACHE_DURATION)
    .then(data => {
      return data.data;
    })
    .catch(error => {
      console.error('Failed to fetch data:', error);
    });
}

export const getPhysiologicalData = async () => {
  return await fetchDataWithCache("/items/physiologicalData", PHYSIOLOGICAL_DATA_STORAGE_KEY, CACHE_DURATION)
    .then(data => {
      return data.data;
    })
    .catch(error => {
      console.error('Failed to fetch data:', error);
    });
}

function feedDataWithIcons(data_tofill){
  //filling img
  let img_path = "src/assets/";
  data_tofill.data.data.forEach((p, i) => {
    if(p.sex === 1)
      p.icon = `${img_path}man_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`;
    else
      p.icon = `${img_path}woman_${Math.floor(Math.random() * (5 - 1 + 1) + 1)}.png`;
  });

  //feeding cache
  const cachedData = localStorage.getItem(PEOPLE_STORAGE_KEY);
  if (cachedData) {
    const { expiry, data } = JSON.parse(cachedData);
    localStorage.setItem(
      PEOPLE_STORAGE_KEY,
      JSON.stringify({
        expiry,
        data: data_tofill,
      })
    );
  }

  console.log(data_tofill);
}
