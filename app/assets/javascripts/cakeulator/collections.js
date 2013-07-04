window.cakeulator = window.cakeulator || {};

(function() {
  var boundaries = function ($item) {
    var self = {};
    self.top = $item.offset().top;
    self.bottom = self.top + $item.height();
    return self;
  };

  cakeulator.Collections = {
    getTierBoundaries: function () {
      var tierBoundaries = [];
      cakeulator.$tiers.each(function (index, tier) {
        var b = boundaries($(tier));
        tierBoundaries.push(b.top);
        tierBoundaries.push(b.bottom);
      });

      return _(tierBoundaries).uniq();
    },

    getTierStraddlers: function () {
      var $tierStraddlers = $('');
      cakeulator.$lis.each(function (index, li) {
        var b = boundaries($(li));
        _(cakeulator.Collections.getTierBoundaries()).each(function (boundaryLoc) {
          if ((b.bottom > boundaryLoc) && (boundaryLoc > b.top)) {
            var $li = $(li);
            $li.data('straddlerOffset', boundaryLoc - b.top);
            $tierStraddlers = $tierStraddlers.add($li);
          }
        });
      });
      return $tierStraddlers;
    }
  };
})()
