angular.module('starter.services', [])

//
.service('StudentService', function($http) {
  this.url = 'https://newsapi.org/v1/articles?source=bbc-news&apiKey=4815e73c3c034bacb6567af4aa951937';
  this.news = null;

  this.handleError = function(error) {
      console.log('ocurrio un error', error);
  }

  this.fetch = function() {
    return $http.get(this.url).catch(this.handleError);
  };

  this.setCurrentNews = function(news){
    this.news = news;
  }

  this.getCurrentNews = function(){
    return this.news;
  }
});
