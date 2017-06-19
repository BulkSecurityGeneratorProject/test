(function() {
    'use strict';

    angular
        .module('postgresqlApp')
        .controller('BookController', BookController);

    BookController.$inject = ['$state', 'Book', 'ParseLinks', 'AlertService', 'paginationConstants', 'pagingParams','Bookprice','totalBooks','booksPriceIs','totalPrice','currentUser'];

    function BookController($state, Book, ParseLinks, AlertService, paginationConstants, pagingParams,Bookprice,totalBooks,booksPriceIs,totalPrice,currentUser) {

        var vm = this;

        vm.loadPage = loadPage;
        vm.predicate = pagingParams.predicate;
        vm.reverse = pagingParams.ascending;
        vm.transition = transition;
        vm.itemsPerPage = paginationConstants.itemsPerPage;

        loadAll();

        function loadAll () {
            Book.query({
                page: pagingParams.page - 1,
                size: vm.itemsPerPage,
                sort: sort()
            }, onSuccess, onError);
            function sort() {
                var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
                if (vm.predicate !== 'id') {
                    result.push('id');
                }
                return result;
            }
            function onSuccess(data, headers) {
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                vm.queryCount = vm.totalItems;
                vm.books = data;
                vm.page = pagingParams.page;
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        }

        function loadPage(page) {
            vm.page = page;
            vm.transition();
        }

        function transition() {
            $state.transitionTo($state.$current, {
                page: vm.page,
                sort: vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc'),
                search: vm.currentSearch
            });
        }
        
        Bookprice.query({priice:8},function(result){
    	  console.log(result);
    	  vm.book=result;
      })
      
      booksPriceIs.query({},function(result){
    	  console.log(result);
    	  vm.book2=result;
      })
      
         totalBooks.query({},function(result){
    	  console.log(result);
    	  vm.total=result;
      })
     
      totalPrice.query({},function(result){
    	  console.log(result);
    	  vm.totalPrice=result;
      })
     
      currentUser.query({},function(result){
    	  console.log(result);
    	  vm.user=result;
      })
    }
})();
