import { useState, useCallback, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import colors, { returnRGBNumber } from './lib/colors';
import * as SplashScreen from 'expo-splash-screen';
import { addScore, getCurrentTotalScore, getScoreTypeRatio, undoLastScore } from './lib/store';
import { calculatePercentage } from './lib/numbers.utils';

const xdata = Array(20)
  .fill(0)
  .map((_, i) => ({
    id: 1,
    type: i % 3 ? 'nagative' : 'positive',
    datetime: new Date('2023-08-01T12:00:00'),
  }));
SplashScreen.preventAutoHideAsync();

function App() {
  const [activeMode, setActiveMode] = useState<'today' | 'all-time'>('today');
  const [score, setScore] = useState(0);
  const [scoreData, setScoreData] = useState<number[]>([50, 50]);
  const [percentages, setPercentages] = useState({ positive: 0, negative: 0 });
  // const data = xdata;
  // useEffect(() => {
  //   if (!data.length) return;
  //   const score = data.reduce((acc, curr) => {
  //     if (curr.type === 'positive') {
  //       return acc + 1;
  //     } else {
  //       return acc - 1;
  //     }
  //   }, 0);
  //   setScore(score);

  //   const positivePercentage = Math.round(
  //     (data.filter((item) => item.type === 'positive').length / data.length) * 100,
  //   );
  //   const negativePercentage = Math.round(
  //     (data.filter((item) => item.type === 'negative').length / data.length) * 100,
  //   );
  //   setPercentages({ positive: positivePercentage, negative: negativePercentage });
  // }, [data.length]);

  const handleUndoLastAction = async () => {
    const newScore = await undoLastScore();
    setScoreData(newScore);
  };

  const handleAddAction = async (type: 'positive' | 'negative') => {
    const newScoreData = await addScore(type === 'positive' ? 1 : -1);
    setScoreData(newScoreData);
  };

  const [fontsLoaded] = useFonts({
    Manrope: require('./assets/fonts/manrope.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async function funct() {
      const total = await getCurrentTotalScore();
      setScore(total);

      const [positive = 0, nagative = 0] = await getScoreTypeRatio();

      let positivePercentage = Math.round(calculatePercentage(positive, positive + nagative));
      let negativePercentage = Math.round(calculatePercentage(nagative, positive + nagative));

      if (!positivePercentage && !negativePercentage) {
        positivePercentage = negativePercentage = 50;
      }
      setPercentages({
        positive: positivePercentage,
        negative: negativePercentage,
      });
    })();
  }, [scoreData]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView className="bg-dark h-screen">
      <View className="h-screen flex flex-col relative" onLayout={onLayoutRootView}>
        <LinearGradient
          colors={[
            `rgba(${score >= 0 ? colors.positive : colors.negative},0.8)`,
            `rgba(${returnRGBNumber(score > 0 ? colors.positive : colors.negative)},0.2)`,
          ]}
          start={[0, 0]}
          end={[0.3, 1]}
          locations={[0, 0.6]}
          className="absolute w-full h-full top-0 left-0"
        />
        <View className="h-[30%] py-3 px-6 flex flex-col justify-center ">
          <StatusBar
            backgroundColor={`rgba(${returnRGBNumber(
              score >= 0 ? colors.positive : colors.negative,
            )},0.8)`}
          />

          <Text
            className="text-7xl text-white font-main"
            style={{
              fontFamily: 'Manrope',
              fontWeight: 'bold',
            }}
          >
            Hey{'\n'}there
          </Text>
        </View>
        <ScrollView className="py-3 px-6 rounded-t-[70px] w-[106.2%] mx-[6rem]  bg-dark h-3/5 flex flex-col gap-6">
          <View className="flex flex-row gap-2">
            <TouchableOpacity
              onPress={() => {
                setActiveMode('today');
              }}
              activeOpacity={0.5}
              className={`bg-transparent px-8 py-3 border-2 ${
                activeMode === 'today' ? 'border-white' : 'border-nuetral'
              } rounded-full`}
            >
              <Text
                className={`text-2xl ${activeMode === 'today' ? 'text-white' : 'text-nuetral'}`}
              >
                Today
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setActiveMode('all-time');
              }}
              activeOpacity={0.5}
              className={`bg-transparent px-8 py-3 border-2 ${
                activeMode === 'all-time' ? 'border-white' : 'border-nuetral'
              } rounded-full`}
            >
              <Text
                className={`text-2xl font-main ${
                  activeMode === 'all-time' ? 'text-white' : 'text-nuetral'
                }`}
              >
                All time
              </Text>
            </TouchableOpacity>
          </View>
          <View className="h-10 rounded-3xl flex flex-row overflow-hidden relative">
            <LinearGradient
              colors={[
                `rgba(${colors.positive},1)`,
                `rgba(${returnRGBNumber(colors.positive)},0.7)`,
                `rgba(${returnRGBNumber(colors.positive)},0)`,
              ]}
              start={[0, 0]}
              end={[1, 0]}
              locations={[0, 0.98, 1]}
              className=" w-full h-full self-start"
              style={{ width: `${percentages.positive}%` }}
            />
            <LinearGradient
              colors={[
                `rgba(${returnRGBNumber(colors.negative)},0)`,
                `rgba(${returnRGBNumber(colors.negative)},0.7)`,
                `rgba(${colors.negative},1)`,
              ]}
              start={[0, 0]}
              end={[1, 0]}
              locations={[0, 0.02, 1]}
              style={{ width: `${percentages.negative}%` }}
              className=" w-full h-full self-end"
            />
          </View>
          <View className="flex flex-row gap-1 items-center ">
            <TouchableOpacity
              activeOpacity={0.5}
              className="text-nuetral text-xl mr-2"
              onPress={handleUndoLastAction}
            >
              <Image source={require('./assets/icons/undo-icon.png')} className="h-8 w-8" />
            </TouchableOpacity>
            <Text className="text-white text-2xl">{scoreData[scoreData.length - 1] || '--'}</Text>
            <Text className="text-nuetral text-2xl">pts</Text>
          </View>
          <View className="flex flex-row justify-between items-center">
            <View className="flex flex-row gap-2">
              <Text className="text-8xl text-white leading-none">{score}</Text>
              <Text className="text-nuetral text-xl leading-6 font-main">
                testing{'\n'}well then{'\n'}this
              </Text>
            </View>
            <View className="justify-self-center">
              <Image
                source={require('./assets/icons/arrow.png')}
                className="h-14 w-14"
                style={{
                  transform: [
                    {
                      rotate:
                        percentages.negative > percentages.positive
                          ? '-135deg'
                          : percentages.negative < percentages.positive
                          ? '45deg'
                          : '-45deg',
                    },
                  ],
                }}
              />
            </View>
          </View>
          <View className="mt-[30px] self-center flex flex-row justify-center items-stretch">
            <TouchableOpacity
              onPress={() => {
                handleAddAction('positive');
              }}
              activeOpacity={0.9}
              className="bg-positive px-3 py-2 rounded-full border-4 border-dark flex justify-center items-center mr-[-30px] z-10"
            >
              <Image source={require('./assets/icons/thumbs-up.png')} className="h-8 w-8" />
            </TouchableOpacity>
            <LinearGradient
              colors={[
                `rgba(${colors.positive},1)`,
                `rgba(${returnRGBNumber(colors.positive)},0.2)`,
              ]}
              start={[0, 0]}
              end={[1, 0]}
              className=" py-4 px-6 min-w-[200px]"
            >
              <Text className="text-2xl text-white text-center">Whatsup</Text>
            </LinearGradient>
            <TouchableOpacity
              onPress={() => {
                handleAddAction('negative');
              }}
              activeOpacity={0.9}
              className="bg-rose-400 px-3 py-2 rounded-full border-4 border-dark flex justify-center items-center  ml-[-30px] z-10"
            >
              <Image source={require('./assets/icons/thumbs-down.png')} className="h-8 w-8" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default App;
