import React, { useState } from 'react';
import { View, Text, Button, FlatList, TextInput, ActivityIndicator, StyleSheet, Image } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { addShortlist } from '../redux/movieSlice';
import { fetchMovies } from '../api/movieApi';
import CustomToast from '../components/CustomToast';

export default function MovieListScreen() {
  const [searchQuery, setSearchQuery] = useState('Batman');
  const dispatch = useDispatch();
  const [snackbarMessage, setSnackbarMessage] = useState(''); 

  const { data: movies, isLoading, isError, refetch } = useQuery({
    queryKey: ['movies', searchQuery],
    queryFn: () => fetchMovies(searchQuery),
    enabled: !!searchQuery,
  });

  const handleShortlist = (movie) => {
    dispatch(addShortlist(movie));
    setSnackbarMessage(`${movie.Title} added to shortlist`)
  };

  return (
    <View style={styles.container}>
   
      <TextInput
        style={styles.input}
        placeholder="Search for movies..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={() => refetch()}
      />

      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

      {isError && (
        <Text style={styles.errorText}>
          Oops! Something went wrong. Please try again.
        </Text>
      )}

      <FlatList
        data={movies}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <Image source={{ uri: item.Poster }} style={styles.poster} />
            <View style={styles.movieDetails}>
              <Text style={styles.title}>
                {item.Title} ({item.Year})
              </Text>
              <Button
                title="Shortlist"
                onPress={() => handleShortlist(item)}
                color="#FF6347" 
              />
            </View>
            <CustomToast message={snackbarMessage} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f9f9f9' },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

