import { View, Text, StyleSheet, Image, Animated,TouchableOpacity } from 'react-native'
import React from 'react'
import Swipeable from 'react-native-gesture-handler/Swipeable';
const Render_movie = ({ item,navigation,delete_movie }) => {
  const renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <Animated.Text
        style={[
          styles.actionText,
          {
            transform: [{ translateX: trans }],
          },
        ]}
        onPress={()=>{
          delete_movie(item.id)
        }}
        >
        Delete
      </Animated.Text>

    );
  };
  return (
    <Swipeable renderLeftActions={renderLeftActions}
  
    >
      <TouchableOpacity
        style={styles.movie_view}
        // opacity={0.9}
        onPress={()=>{
          navigation.navigate('Details',{
            id:item.id,
            title:item.title,
            poster_path:item.poster_path,
            overview:item.overview,
            release_date:item.release_date,
            vote_average:item.vote_average,
            backdrop_path:item.backdrop_path
          })
        }}
      >
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w342${item.poster_path}` }}
          style={styles.poster_image}
        />
        <View
          style={{
            width: "70%",
          }}
        >
          <Text
            style={styles.movie_title}
          >{item.original_title} </Text>
          <Text
            style={styles.movie_description}
          >{item.overview} </Text>


        </View>



      </TouchableOpacity>
    </Swipeable>
  )
}

export default Render_movie

const styles = StyleSheet.create({

  actionText: {
    backgroundColor: "red",
    color: "white",
    height: 35,
    width: 60,
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "bold",
    borderRadius: 5,
    paddingVertical: 5

  },
  movie_description: {
    fontSize: 14,
    color: "black",
  },
  movie_title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  movie_view: {
    flexDirection: 'row',
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 5
  },
  poster_image: {
    width: 150,
    resizeMode: "contain",
    height: 150,
    alignSelf: "center"
  }
}
)