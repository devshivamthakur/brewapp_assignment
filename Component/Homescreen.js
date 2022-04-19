import { StyleSheet, ToastAndroid, View, FlatList, Image, Text, RefreshControl } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import SearchBar from './Searchbar'
import axios from 'axios'
import Render_movie from './Render_movie'
import LoadingScreen from './LoadingScreen'

const Homescreen = (props) => {
  const [clicked, setClicked] = React.useState(false)
  const [searchPhrase, setSearchPhrase] = React.useState("")
  const [movie_data, setMovie_data] = React.useState([])
  const [refreshing, setrefreshing] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  const fetch_movie_data = () => {
    axios({
      method: 'get',
      url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed',
    }).then(res => {
      setLoading(false)
      setMovie_data(res.data.results)
    }).catch((err) => {
      ToastAndroid.show('Failed to Fetch movie', ToastAndroid.SHORT)
    })

  }
  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout)
    })
  }
  const refreshing_ = () => {
    setLoading(true)
    setrefreshing(true)
    fetch_movie_data()
    wait(2000).then(() => { setrefreshing(false) })


  }
  const delete_movie = (id) => {
    const data = movie_data
    const new_data = data.filter((item, index) => item.id !== id)
    setMovie_data(new_data)
  }

  const movie_datas = useMemo(() => {
    return movie_data.filter(movie => {
      return movie.original_title.toLowerCase().includes(searchPhrase.toLowerCase())
    })
  }, [movie_data, searchPhrase])
 
  useEffect(() => {
    fetch_movie_data()
  }, [])
  return (
    <View
      style={styles.main}
    >

      <FlatList
        ListHeaderComponent={<SearchBar
          clicked={clicked}
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          setClicked={setClicked}
        />}
        data={movie_datas}
        renderItem={({ item }) => <Render_movie item={item} navigation={props.navigation} delete_movie={delete_movie}
        />}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshing_}
            enabled={true}
            colors={['#ed8127', '#ed8127']}


          />
        }
      />
      <LoadingScreen
        loading={loading}
      />

    </View>
  )
}

export default Homescreen

const styles = StyleSheet.create({

  main: {
    backgroundColor: "#edac43",
    flex: 1
  },

})