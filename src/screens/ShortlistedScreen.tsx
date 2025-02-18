import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { useSelector, useDispatch } from 'react-redux';
import { removeShortlist } from '../redux/movieSlice';
import CustomToast from '../components/CustomToast';
import { RootState } from '@reduxjs/toolkit/query';

export default function ShortlistedScreen() {
  const shortlisted = useSelector((state: RootState) => state.movies.shortlisted);
  const dispatch = useDispatch();
  const [snackbarMessage, setSnackbarMessage] = useState(''); 

  const handleRemove = (imdbID: string) => {
    dispatch(removeShortlist(imdbID));
    setSnackbarMessage("Movie removed successfully")
};

  if (!shortlisted || shortlisted.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>No movies shortlisted yet!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={shortlisted}
      keyExtractor={(item) => item.imdbID}  
      renderItem={({ item }) => (
        <View style={styles.movieItem}>
          <Image source={{ uri: item.Poster }} style={styles.poster} />
          <View style={styles.movieDetails}>
            <Text style={styles.movieTitle}>{item.Title}</Text>
            <Button
              title="Remove"
              onPress={() => handleRemove(item.imdbID)}
              color="#FF6347"
            />
          </View>
          <CustomToast message={snackbarMessage} backgroundColor='#FF0000' />

        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  movieItem: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, 
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 5,
    marginRight: 15,
  },
  movieDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});