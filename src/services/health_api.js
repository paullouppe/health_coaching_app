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
