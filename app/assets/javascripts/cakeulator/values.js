window.cakeulator = window.cakeulator || {};
cakeulator.Values = {
  getInch: function() {
    ratio = cakeulator.$scope.find('input[name="first"]:checked').val();
    return cakeulator.$tiers.height() / ratio;
  },
  getStripeUnitHeight: function() {
    return cakeulator.$lis.height();
  },
  getStripeHeightInInches: function() {
    return this.getStripeUnitHeight()/this.getInch();
  },
  getSpacingUnitHeight: function() {
    return cakeulator.$scope.find('input#spacing').val();
  },
  getSpacingHeightInInches: function() {
    return this.getSpacingUnitHeight()/this.getInch();
  }
};
