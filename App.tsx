/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
  SafeAreaView,
  Button,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import colors, { returnRGBNumber } from './lib/colors';

const xdata = Array(20)
  .fill(0)
  .map((_, i) => ({
    id: 1,
    type: i % 3 ? 'nagative' : 'positive',
    datetime: new Date('2023-08-01T12:00:00'),
  }));

function App() {
  const [activeMode, setActiveMode] = React.useState<'today' | 'all-time'>('today');
  const [score, setScore] = React.useState(0);
  const [percentages, setPercentages] = React.useState({ positive: 0, negative: 0 });
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

  const handleUndoLastAction = () => {
    console.log('Undo');
  };

  const handleAddAction = (type: 'positive' | 'negative') => {
    console.log(type);
  };

  return (
    <SafeAreaView className="bg-dark h-screen">
      <View className="h-screen flex flex-col relative">
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
        <View className="h-2/5 py-10 px-6 flex flex-col justify-center ">
          <StatusBar
            backgroundColor={`rgba(${returnRGBNumber(
              score >= 0 ? colors.positive : colors.negative,
            )},0.8)`}
          />

          <Text className="text-7xl text-white ">Hey{'\n'}there</Text>
        </View>
        <ScrollView className="py-6 px-6 rounded-t-[70px] w-[106.2%] mx-[6rem]  bg-dark h-3/5 flex flex-col gap-6">
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
                className={`text-2xl ${activeMode === 'all-time' ? 'text-white' : 'text-nuetral'}`}
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
              locations={[0, (percentages.positive || 1) / 100, (percentages.positive || 1) / 100]}
              className="absolute w-full h-full top-0 left-0"
            />
            <LinearGradient
              colors={[
                `rgba(${returnRGBNumber(colors.negative)},0)`,
                `rgba(${returnRGBNumber(colors.negative)},0.7)`,
                `rgba(${colors.negative},1)`,
              ]}
              start={[0, 0]}
              end={[1, 0]}
              locations={[
                (percentages.negative || 1) / 100 + 0.02,
                (percentages.negative || 1) / 100 + 0.02,
                1,
              ]}
              className="absolute w-full h-full top-0 left-0"
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
            <Text className="text-white text-2xl">-1</Text>
            <Text className="text-nuetral text-2xl">pts</Text>
          </View>
          <View className="flex flex-row justify-between items-center">
            <View className="flex flex-row gap-2">
              <Text className="text-8xl text-white leading-none">{score}</Text>
              <Text className="text-nuetral text-xl leading-6">
                testing{'\n'}well then{'\n'}this
              </Text>
            </View>
            <View className="justify-self-center">
              <Image source={require('./assets/icons/arrow.png')} className="h-14 w-14" />
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
