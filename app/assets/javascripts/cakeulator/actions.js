window.cakeulator = window.cakeulator || {};
cakeulator.Actions = {
  initialize: function (options) {
    options = options ||  {};
    this.render = options.render;
  },

  scaleTiers: function (value) {
    proportion = value / cakeulator.Values.getInch();
    cakeulator.Transitions.multiplyEach(cakeulator.$tiers, proportion, function (origHeight, $tier) {
      cakeulator.Transitions.moveTop($tier.find('.cakebottom'), $tier.height() - origHeight);
    });
    this.render();
  },

  //essentially a toggle even if height is 4 or 5
  toggleTierHeight: function ($tier, value) {
    //TODO: move to Values and resolve with getInch
    var ratio = value === "4" ? 4 / 5 : 5 / 4;
    cakeulator.Transitions.multiplyOne($tier, ratio, function (origHeight) {
      cakeulator.Transitions.moveTop($tier.find('.cakebottom'), $tier.height() - origHeight);
    });
    this.render();
  },

  toggleFibSpacing: function (isChecked) {
    this.isFibSpacing = isChecked;
    this.scaleStripeMargin(cakeulator.Values.getSpacingUnitHeight());
    this.render();
  },

  toggleReflowStripes: function (isChecked) {
    this.reflowStripes = isChecked;
    this.render();
  },

  scaleStripes: function (value) {
    var proportion = value / cakeulator.Values.getStripeUnitHeight();
    cakeulator.Transitions.multiplyEach(cakeulator.$lis, proportion);
    this.render();
  },

  scaleStripeMargin: function (value) {
    if (this.isFibSpacing) {
      var proportion = value / cakeulator.Values.getStripeUnitHeight();
      cakeulator.$lis.each(function (iterator, li) {
        var height = $(li).height();
        $(li).css('margin-bottom', (height * proportion) + 'px');
      });
    } else {
      cakeulator.$lis.css('margin-bottom', value + 'px');
    }
    this.render();
  }
};
