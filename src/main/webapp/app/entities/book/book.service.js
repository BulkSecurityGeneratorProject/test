(function() {
    'use strict';
    angular
        .module('postgresqlApp')
        .factory('Book', Book)
        .factory('Bookprice', Bookprice)
        .factory('totalBooks', totalBooks)
        .factory('booksPriceIs', booksPriceIs)
        .factory('totalPrice', totalPrice)
        .factory('currentUser', currentUser)

        


    

    Book.$inject = ['$resource'];
    Bookprice.$inject = ['$resource'];
    totalBooks.$inject = ['$resource'];
    booksPriceIs.$inject = ['$resource'];
    totalPrice.$inject = ['$resource'];
    currentUser.$inject = ['$resource'];
 



    function Book ($resource) {
        var resourceUrl =  'api/books/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
    
  function Bookprice($resource){
      var resourceUrl =  'api/books/booksWithPrice/:priice';

	  return $resource(resourceUrl,{},{
          'query': { method: 'GET', isArray: false}

	  });
  }
  
  function totalBooks($resource){
      var resourceUrl =  'api/books/totalbooks';

	  return $resource(resourceUrl,{},{
          'query': { method: 'GET',  isArray: true}

	  });
  }
  
  function booksPriceIs($resource){
      var resourceUrl =  'api/books/booksPriceIs';

	  return $resource(resourceUrl,{},{
          'query': { method: 'GET', isArray: false}

	  });
  }
  function totalPrice($resource){
      var resourceUrl =  'api/books/totalPrice';

	  return $resource(resourceUrl,{},{
          'query': { method: 'GET',  isArray: true}

	  });
  }
  
  function currentUser($resource){
      var resourceUrl =  'api/users/currentUser';

	  return $resource(resourceUrl,{},{
          'query': { method: 'GET',  isArray: false}

	  });
  }
  
  


    
})();
