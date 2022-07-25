import idx from "idx";
import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { addWeekDaysIfNot, GRAPH_TIME_PERIODS } from "../../utils/commonUtils";
import {
  deviceWidth,
  responsiveHeight,
  responsiveWidth,
} from "../../utils/scalingUtils";

import * as Colors from "./../../themes/colors";

export function YLabelFormat(value) {
  const yLabel = value >= 0 ? value : "";
  return yLabel;
}
const TimePeriodGraph = (props) => {
  const { categoryData, dataType, dataKey, showBarChart } = props;
  const isYear = dataType === GRAPH_TIME_PERIODS[2].key;
  const isMonth = dataType === GRAPH_TIME_PERIODS[1].key;
  const isWeek = dataType === GRAPH_TIME_PERIODS[0].key;
  const arrangedData = addWeekDaysIfNot(
    categoryData,
    dataKey,
    dataType,
    showBarChart
  );
  const chartConfig = {
    formatYLabel: (label) => YLabelFormat(label),
    barPercentage: 0.3,
    backgroundColor: "transparent",
    backgroundGradientFrom: Colors.WHITE,
    backgroundGradientTo: Colors.WHITE,
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(52, 52, 52, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(52, 52, 52, ${opacity})`,
    fillShadowGradientOpacity: 1,
    barRadius: 5,
    fillShadowGradientTo: "#bd2efc",
    fillShadowGradientFrom: "#245dfa",
    styles: {
      borderRadius: 20,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "0",
      stroke: "#fbfbfb",
    },
  };

  const generateGraphData = () => {
    const data = arrangedData.map((elm) => {
      return elm.totalQuestions;
    });

    if (dataType === "week") {
      return {
        labels: arrangedData.map((el) => {
          const day = el.day;
          return isNaN(day)
            ? day?.charAt(0)?.toUpperCase() + day?.slice(1, 3)
            : el.day;
        }),
        datasets: [
          {
            data,
          },
        ],
      };
    } else if (dataType === "month") {
      return {
        labels: arrangedData.map((el) => {
          const day = el.day;
          return day;
        }),
        datasets: [
          {
            data,
          },
        ],
      };
    } else if (dataType === "year") {
      return {
        labels: arrangedData.map((el) => {
          const day = el.day;
          return isNaN(day)
            ? day?.charAt(0)?.toUpperCase() + day?.slice(1, 3)
            : el.day;
        }),
        datasets: [
          {
            data,
          },
        ],
      };
    }
  };

  const getLineGraphWidth = isWeek
    ? deviceWidth - responsiveWidth(20)
    : isMonth
    ? deviceWidth * 2.5
    : deviceWidth * 1.5;
  return (
    <View>
      <ScrollView
        keyboardShouldPersistTaps={"always"}
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        <BarChart
          data={generateGraphData()}
          width={getLineGraphWidth}
          height={180}
          style={styles.chartStyle}
          showBarTops={false}
          chartConfig={chartConfig}
        />
      </ScrollView>
    </View>
  );
};

export default TimePeriodGraph;
const styles = StyleSheet.create({
  chartStyle: {
    marginTop: responsiveHeight(2),
    marginLeft: -responsiveWidth(5),
  },
});
