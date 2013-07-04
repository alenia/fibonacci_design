window.cakeulator = window.cakeulator || {};

(function ($) {
  var $scope, render, formUtils, tierUtils;

  $scope = cakeulator.$scope = $('body.cakeulator');
  cakeulator.$tiers = $scope.find('.tiers > div');
  cakeulator.$lis = $scope.find('ol li');

  cakeulator.setup = function () {
    cakeulator.Actions.initialize({render: render});
    formUtils.bindEvents();
    _(['spacing', 'stripes', 'tiers', 'fib_spacing', 'reflow_stripes']).each(function (inputName) {
      $scope.find('input#' + inputName).change();
    });

    _(['first', 'second', 'third']).each(function (tierName) {
      //TODO: make less hacky. (resolve with getInch in cakeulator.Values)
      var $trigger = $scope.find('input[name="' + tierName + '"]:checked');
      if ($trigger.val() === '5') {
        $trigger.change();
      }
    });
    cakeulator.Actions.render();
  };

  tierUtils = {
    markTierStraddlers: function () {
      cakeulator.$lis.css('background-color', 'rgba(0,0,255,.3)');
      cakeulator.Collections.getTierStraddlers().css('background-color', 'rgba(255,0,0,.5)');
    },

    moveTierStraddlers: function () {
      for (var i=0; i < 2; i++) {
        var $li = cakeulator.Collections.getTierStraddlers().first();
        var offset = $li.data('straddlerOffset');
        var prevMargin = parseInt($li.prev('li').css('margin-bottom'));
        $li.css('margin-top', (offset + prevMargin) + 'px');
      }
    }
  };

  render = function () {
    cakeulator.$lis.css('margin-top', '0px');
    if (this.reflowStripes) {
      tierUtils.moveTierStraddlers();
    }
    tierUtils.markTierStraddlers();
    $scope.find('#spacing_value').text(cakeulator.Values.getSpacingHeightInInches().toFixed(2) + ' in');
    $scope.find('#stripe_height_value').text(cakeulator.Values.getStripeHeightInInches().toFixed(2) + ' in');
  };

  formUtils = {
    createUrl: function (root) {
      var url, params;
      params = {};
      _(['spacing', 'stripes', 'tiers']).each(function (inputName) {
        params[inputName] = $scope.find('input#' + inputName).val();
      });

      _(['fib_spacing', 'reflow_stripes']).each(function (inputName) {
        params[inputName] = $scope.find('input#' + inputName).prop('checked');
      });

      _(['first', 'second', 'third']).each(function (tierName) {
        params[tierName + '_tier'] = $scope.find('input[name="' + tierName + '"]:checked').val();
      });

      url = root + '?';
      _(params).each(function (value, key) {
        url += key + '=' + value + '&';
      });
      return url;
    },

    bindEvents: function () {
      $scope.find('a#generate_url').click(function (e) {
        $('pre.url').text(formUtils.createUrl($(e.currentTarget).data('rooturl')));
      });

      $scope.find('input#fib_spacing').change(function (e) {
        cakeulator.Actions.toggleFibSpacing(e.currentTarget.checked);
      });

      $scope.find('input#reflow_stripes').change(function (e) {
        cakeulator.Actions.toggleReflowStripes(e.currentTarget.checked);
      });

      $scope.find('input#spacing').change(function (e) {
        cakeulator.Actions.scaleStripeMargin(e.currentTarget.value);
      });

      $scope.find('input#stripes').change(function (e) {
        cakeulator.Actions.scaleStripes(e.currentTarget.valueAsNumber);
      });

      $scope.find('input#tiers').change(function (e) {
        cakeulator.Actions.scaleTiers(e.target.valueAsNumber);
      });

      _(['first', 'second', 'third']).each(function (tierName) {
        var $trigger = $scope.find('input[name="' + tierName + '"]');
        $trigger.change(function (e) {
          cakeulator.Actions.toggleTierHeight($scope.find('.tiers .' + tierName), e.currentTarget.value);
        });
      });
    }
  };
}($));

