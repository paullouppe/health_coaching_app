import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'https://health.shrp.dev';
const PEOPLE_STORAGE_KEY = 'peopleData';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

const getCachedData = (storageKey) => {
  const cachedData = localStorage.getItem(storageKey);
  if (!cachedData) return null;
  const parsedData = JSON.parse(cachedData);
  return parsedData.expiry > Date.now() ? parsedData.data : null;
};

const setCacheData = (storageKey, data, cacheDuration) => {
  const cacheObject = {
    expiry: Date.now() + cacheDuration,
    data,
  };
  localStorage.setItem(storageKey, JSON.stringify(cacheObject));
};

const fetchDataWithCache = async (uri, storageKey, cacheDuration) => {
  let data = getCachedData(storageKey);
  if (data) {
    console.log("Data from cache");
    return data;
  }

  try {
    const response = await apiService.get(uri);
    data = response.data;
    setCacheData(storageKey, data, cacheDuration);
    console.log("Data from distant");
    if (storageKey === PEOPLE_STORAGE_KEY) feedDataWithIcons(data);
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
};

const makeApiRequest = async (url, params = {}) => {
  try {
    const response = await apiService.get(url, { params });
    return response.data.data;
  } catch (error) {
    console.error(`Failed to make API request to ${url}:`, error);
    throw error;
  }
};

// export const getPeople = async () => {
//   try {
//     const peopleData = await fetchDataWithCache("/items/people", PEOPLE_STORAGE_KEY, CACHE_DURATION);
//     return peopleData.data;
//   } catch (error) {
//     console.error('Failed to fetch people:', error);
//   }
// };

export const getPeople = async () => {
  const filterConditions = JSON.stringify({
    "firstname": {
      "_nnull": true,  // This ensures the property is not null
      "_nempty": true  // This ensures the property is not an empty string
    },
    "lastname": {
      "_nnull": true,  // This ensures the property is not null
      "_nempty": true  // This ensures the property is not an empty string
    }
  });

  try {
    const peopleData = await fetchDataWithCache(
      `/items/people?filter=${encodeURIComponent(filterConditions)}`,
      PEOPLE_STORAGE_KEY,
      CACHE_DURATION
    );
    console.log(peopleData);
    return peopleData.data;
  } catch (error) {
    console.error('Failed to fetch people:', error);
  }
};

export const getPeopleById = async (id) => {
  try {
    const peopleData = await fetchDataWithCache("/items/people", PEOPLE_STORAGE_KEY, CACHE_DURATION);
    return peopleData.data.find(p => p.id === id);
  } catch (error) {
    console.error(`Failed to fetch person with ID ${id}:`, error);
    throw error;
  }
};

export const getPhysicalActivitiesByPeopleId = async (id) => {
  const person = await getPeopleById(id);
  if (!person) return null;
  return await makeApiRequest(`/items/physicalActivities`, { filter: JSON.stringify({ id: { "_in": person.physicalActivities } }) });
};

export const getPhysiologicalDataByPeopleId = async (id) => {
  const person = await getPeopleById(id);
  if (!person) return null;
  return await makeApiRequest(`/items/physiologicalData`, { filter: JSON.stringify({ id: { "_in": person.physiologicalData } }) });
};

export const getPsychologicalDataByPeopleId = async (id) => {
  const token = Cookies.get('token');
  if (!token) {
    console.error('Authorization token is not available.');
    return null;
  }
  apiService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return await makeApiRequest(`/items/psychicData`, { people_id: { "_eq": id } });
};

function feedDataWithIcons(dataToFill) {
  const imgPath = "http://localhost:5173/images/";
  dataToFill.data.forEach(person => {
    person.icon = `${imgPath}${person.sex === 1 ? 'man' : 'woman'}_${Math.floor(Math.random() * 5) + 1}.png`;
  });
  setCacheData(PEOPLE_STORAGE_KEY, dataToFill, CACHE_DURATION);
}
