import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
// import { Asset, useAssets } from "expo-asset";
const { width } = Dimensions.get("window");
const height = (width * 100) / 60;
// const images = [
//   "https://picsum.photos/id/10/200/300",
//   "https://picsum.photos/id/11/200/300",
//   "https://picsum.photos/id/12/200/300",
// ];

export default function App() {
  // const [assets, error] = useAssets([
  //   require("./assets/one.png"),
  //   require("./assets/two.png"),
  //   require("./assets/three.png"),
  // ]);
  // console.log(assets);
  const one = require("./assets/one.png");
  const oneImage = Image.resolveAssetSource(one);
  const two = require("./assets/two.png");
  const twoImage = Image.resolveAssetSource(two);
  const three = require("./assets/three.png");
  const threeImage = Image.resolveAssetSource(three);
  const images = [oneImage.uri, twoImage.uri, threeImage.uri];

  const [active, setActive] = useState(0);
  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== active) {
      setActive(slide);
    }
  };
  return (
    <>
      <View style={styles.container}>
        <ScrollView
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scroll}
          onScroll={change}
        >
          {images.map((item, index) => (
            <Image key={index} source={{ uri: item }} style={styles.image} />
          ))}
        </ScrollView>
        <View style={styles.pagination}>
          {images.map(
            (item, index) => (
              console.log(index),
              (
                <Text
                  key={index}
                  style={
                    index == active
                      ? styles.pagingActiveText
                      : styles.pagingText
                  }
                >
                  ●
                </Text>
              )
            )
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    width,
    height,
  },
  scroll: { width, height },
  image: { width, height, resizeMode: "cover" },
  pagination: {
    flexDirection: "row",
    // position: "absolute",
    // transform: [{ translateX: -50 }],
    // bottom: 50,
    // left: 50,
    alineSerf: "center",
  },
  pagingText: {
    color: "#888",
    margin: 3,
    fontSize: width / 30,
  },
  pagingActiveText: {
    color: "#fff",
    margin: 3,
    fontSize: width / 30,
  },
});
