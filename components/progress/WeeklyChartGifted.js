import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { hp, moderateScale, wp } from '../../src/utilis/responsive';

const { width } = Dimensions.get('window');

export default function WeeklyChartGifted() {
  const data = [4, 10, 9, 10, 6, 9, 8]; // Sun → Sat
  const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const [selectedIndex, setSelectedIndex] = useState(5);

  const chartData = data.map((value, index) => ({
    value,
    label: labels[index],
    dataPointText: `${value} hr`,
    hideDataPoint: false,
  }));

  return (
    <View style={styles.container}>
      <LineChart
        data={chartData}
        width={width - 40}
        height={250}
        curved
        isAnimated={true}
        color="orange"
        thickness={3}
        hideRules={false}
        rulesType="solid"
        rulesColor="#e0e5e758"
        hideYAxisText={false}
        yAxisTextStyle={{ color: 'gray', fontSize: 12 }}
        yAxisLabelSuffix="hr"
        stepValue={2}
        noOfSections={5}
        xAxisLabelTextStyle={{ color: 'gray', fontSize: 12 }}
        areaChart
        startFillColor="orange"
        endFillColor="orange"
        startOpacity={0.4}
        endOpacity={0.05}
        hideDataPoints={true}
        showTooltip
        yAxisOffset={2}
        initialSpacing={5}
        xAxisColor="transparent"
        yAxisColor="transparent"
        onPress={(item, index) => {
          setSelectedIndex(index);
        }}
        pointerConfig={{
          showPointerStrip: false,
          pointerStripWidth: 10,
          pointerStripColor: 'orange',
          pointerColor: 'orange',
          radius: 6,

          showPointerLabel: true,
          pointerLabelComponent: item => (
            <View style={styles.messageBoxWrapper}>
              <View style={styles.bubble}>
                <Text style={styles.bubbleText}>9 hr</Text>
              </View>
              <View style={styles.pointer} />
            </View>
          ),
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  messageBoxWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    backgroundColor: '#F76400',
    borderRadius: 20,
    width: wp('15%'),
    paddingLeft: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  bubbleText: {
    color: 'white',
    fontSize: 16,
    width: wp('10%'),
    fontWeight: 'bold',
  },
  pointer: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#F76400',
    marginTop: -2.5,
  },
});
