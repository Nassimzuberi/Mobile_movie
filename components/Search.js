import React from 'react';
import {StyleSheet,View,Text,TextInput,Button,FlatList,ActivityIndicator} from 'react-native';
import FilmItem from './FilmItem';
import { getFilmsFromApiWithSearchedText } from '../api/TMDBapi' // import { } from ... car c'est un export nommé dans TMDBApi.js
class Search extends React.Component {
  constructor(props) {
    super(props)
    this.searchedText = ""// Initialisation de notre donnée searchedText dans le state
    this.page = 0 // Compteur pour connaître la page courante
    this.totalPages = 0 // Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API TMDB
    this.state = {
      films : [],
      isLoading : false,
    }
  }
  _searchTextInputChanged(text) {
    this.searchedText = text
}
  _loadFilms() {
    if (this.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
      this.setState({ isLoading: true }) ;
      getFilmsFromApiWithSearchedText(this.searchedText,this.page = 1).then(data => {
        this.page = data.page
        this.totalPages = data.total_pages
          this.setState({
            films: [...this.state.films,...data.results],
            isLoading:false,
          })
      })
    }
   }
   _displayLoading() {
     if (this.state.isLoading) {
       return (
         <View style={styles.loading_container}>
           <ActivityIndicator size='large' />
           {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
         </View>
       )
     }
   }
   _searchFilms() {
     this.page = 0
    this.totalPages = 0
    this.setState({
      films: []
    }, () => {
      this._loadFilms()
    })
    // Ici on va remettre à zéro les films de notre state
}
  render() {
    console.log('Coucou')
      return (
        <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder='Titre du film'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFilms()}
          />
          <Button title='Rechercher' onPress={() => {this._searchFilms()}}/>
          <FlatList
            data={this.state.films}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <FilmItem film={item}/>}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (this.page < this.totalPages) { // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
                this._loadFilms()
            }}}
          />
          {this._displayLoading()}
        </View>
      )
   }
 }

   const styles = StyleSheet.create({
    main_container: {
      flex: 1,
      marginTop: 40,

    },
    textinput: {
      marginLeft: 5,
      marginRight: 5,
      height: 50,
      borderColor: '#000000',
      borderWidth: 1,
      paddingLeft: 5
    },
    loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
}
  })


export default Search;
