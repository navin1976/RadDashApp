module.exports =
{
  applyFilters: function($, ex, datasource, filters, callback) {
    // make a map of the datasource filters
    if (!filters) {
      return callback(false, ex);
    }


    var datasourceFilters = datasource.filters.reduce(function(map, obj) {
      map[obj.id] = { name: obj.name, type: obj.filterType };
      return map;
    }, {});

    // add the filters for the rest
    var failed = false;
    filters.forEach(function(e) {
      // make sure the the filter is in the filter of the datasource and that it is of type categorical
      if (!(e.filterId in datasourceFilters) || datasourceFilters[e.filterId].type != 'categorical') {
        failed = true;
      } else {
        ex = ex.filter($(datasourceFilters[e.filterId].name).in(e.filterValues));
      }
    });
    callback(failed, ex);
  }
}