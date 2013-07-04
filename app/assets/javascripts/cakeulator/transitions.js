window.cakeulator = window.cakeulator || {};
cakeulator.Transitions = {
  multiplyOne: function ($item, proportion, callback) {
    var origHeight = $item.height();
    $item.height(origHeight * proportion);
    if (callback) { callback(origHeight, $item); }
  },

  multiplyEach: function ($collection, proportion, callback) {
    var self = this;
    $collection.each(function (index, item) {
      self.multiplyOne($(item), proportion, callback);
    });
  },

  moveTop: function ($item, distance) {
    var origTop =  parseInt($item.css('top'));
    $item.css('top', (origTop + distance) + 'px');
  }
};
