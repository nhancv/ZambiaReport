angular.module('app.controllers', [])

  .controller('cBidReportAppCtrl', function ($scope, mInitdata, sInitDataService) {
    if (!mInitdata.initial) {
      sInitDataService.initCommonDB();
      mInitdata.initial = true;
      sInitDataService.mockupDB();

    }
  })

  .controller('cScheduleVaccineTodayCtrl', function ($scope, sRuleHelper, mDataCommon) {
    var rulesEffect = sRuleHelper.excuteRules();
    console.log("rulesEffect");
    console.log(rulesEffect);
    var programStageDataElementsMap = sRuleHelper.programStageDataElementsMap();

    //populate completed data values.
    var dataValues = [];
    angular.forEach(mDataCommon.eventsTEI, function (event) {
      angular.forEach(event.dataValues, function (dataValue) {
        dataValues[dataValue.dataElement] = dataValue;
      })
    });

    // processRuleEffects
    for (var key in rulesEffect) {
      var effect = rulesEffect[key];
      if (effect.dataElement) {
        if (effect.action == "HIDEFIELD" && effect.ineffect) {
          programStageDataElementsMap[rulesEffect[key].dataElement.id] = "hidden";
        } else if (effect.data) {
          programStageDataElementsMap[rulesEffect[key].dataElement.id].dataElement.value = effect.data;
        }
      }
    }

    for (var key in programStageDataElementsMap) {
      var programStageDataElement = programStageDataElementsMap[key];
      if (programStageDataElement != "hidden") {
        console.log("key = " + key + " - name: " + programStageDataElement.dataElement.name + " - value: " + (programStageDataElement.dataElement.value ?
            programStageDataElement.dataElement.value : (dataValues[key] ? dataValues[key].value : undefined)));
      }
    }

  })

  .controller('cStockInHandCtrl', function ($scope) {

  })

  .controller('cStockInHandVsDemandCtrl', function ($scope) {

  })

  .controller('cVaccineHistoryReportCtrl', function ($scope) {

  })

  .controller('cLoginCtrl', function ($scope) {

  })
