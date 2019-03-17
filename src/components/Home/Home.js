import React, { Component } from 'react';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../elements/Spinner/Spinner';
import { API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE} from '../../config';
import './Home.css';

export default class Home extends Component {

  state={
    movies:[],
    heroImage:null,
    loading:false,
    currentPage:0,
    totalPages:0,
    searchTerm:""
  }

  searchItems=(searchTerm)=>{ 
    console.log(searchTerm);
    
    let endpoint='';
    this.setState({
      movies:[],
      loading:true,
      searchTerm:searchTerm
    })

    if(searchTerm===""){
      endpoint=`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    }else{
      endpoint=`${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    }
    this.fetchItems(endpoint);
  }

  componentDidMount(){
    if(localStorage.getItem("HomeState")){
      let state=JSON.parse(localStorage.getItem("HomeState"));
      this.setState({...state});
    }else{
       this.setState({
      loading:true
    })
    const endpoint=`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    this.fetchItems(endpoint)
    }
   
  }

   loadMoreItems=()=>{
     let endpoint='';
     this.setState({
       loading:true
     })
     if(this.state.searchTerm===""){
       endpoint=`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage+1}`;
     }else{
       endpoint=`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}&page=${this.state.currentPage+1}`;
     }
     this.fetchItems(endpoint);
  }

  fetchItems=(endpoint)=>{
    fetch(endpoint)
    .then(result=>result.json())
      .then(result=>{
        console.log(result);
        this.setState({
          movies:[...this.state.movies,...result.results],
          heroImage:this.state.heroImage || result.results[0],
          loading:false,
          currentPage:result.page,
          totalPages:result.total_pages
        },()=>{
          localStorage.setItem("HomeState",JSON.stringify(this.state));

        })
      })
    }

  render() {
  
    return (
      <div className="rmdb-home">
      {this.state.heroImage ? 
       <div>
        <HeroImage image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.heroImage.backdrop_path}`}
        title={this.state.heroImage.original_title}
        text={this.state.heroImage.overview} 
        />
        <SearchBar callback={this.searchItems} />
       </div>
        : null }
        <div className="rmdb-home-grid">
          <FourColGrid 
           loading={this.state.loading}
           header={this.state.searchTerm ? "Search Result" : "Popular Movies"}
           >
            {this.state.movies.map((movie,i)=>{            
              return <MovieThumb key={i}
                 clickable={true}
                 image={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : ''}
                 movieId={movie.id}
                 movieName={movie.original_title}
                 />
            })}
           </FourColGrid>
           {this.state.loading ? <Spinner/> : null }
           {(this.state.currentPage<=this.state.totalPages && !this.state.loading) ? 
           <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} /> 
           : null}
          </div>
      </div>
    )
  }
}
