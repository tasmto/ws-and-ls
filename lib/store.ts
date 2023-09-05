import AsyncStorage from '@react-native-async-storage/async-storage';
import { scoreStoreDataKey } from '../constants/constants';

const setScoreData = async (value: number[]) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(scoreStoreDataKey, jsonValue);
    return await getScoreData();
  } catch (e) {
    console.error(e);
    return await getScoreData();
  }
};

const getScoreData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(scoreStoreDataKey);
    const parsedJsonValue = jsonValue != null ? (JSON.parse(jsonValue) as number[]) : [];
    return parsedJsonValue;
  } catch (e) {
    // error reading value
    console.error(e);
    return [];
  }
};

const getCurrentTotalScore = async () => {
  const scores = await getScoreData();
  return scores?.reduce((acum, score) => (acum += score), 0) || 0;
};

const undoLastScore = async () => {
  const scoreData = await getScoreData();
  scoreData?.pop();
  await setScoreData(scoreData);
  return await getScoreData();
};

const addScore = async (score: -1 | 1) => {
  const scoreData = await getScoreData();
  scoreData.push(score);
  await setScoreData(scoreData);
  return scoreData;
};

const getScoreTypeRatio = async () => {
  const scoreData = await getScoreData();
  const ratios = scoreData.reduce(
    (acum, cur) => {
      acum[cur >= 1 ? 0 : 1] = acum[cur >= 1 ? 0 : 1] + 1;
      return acum;
    },
    [0, 0],
  );
  return ratios;
};

export { getCurrentTotalScore, undoLastScore, getScoreData, addScore, getScoreTypeRatio };
