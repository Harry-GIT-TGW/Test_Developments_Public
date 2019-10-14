sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/viz/ui5/format/ChartFormatter",
	"sap/viz/ui5/api/env/Format"
], function (Controller, ChartFormatter, Format) {
	"use strict";

	return Controller.extend("com.tgw.controller.Main", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.tgw.view.Main
		 */
		onInit: function () {
			Format.numericFormatter(ChartFormatter.getInstance());
			var formatPattern = ChartFormatter.DefaultPattern;
			var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame1");
			oVizFrame.setVizProperties({
				plotArea: {
					dataLabel: {
						formatString: formatPattern.SHORTFLOAT_MFD2,
						visible: true
					}
				}
			});

		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.tgw.view.Main
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.tgw.view.Main
		 */
		onAfterRendering: function () {

			// create new filter  
			var aFilters = [];
			var oFilterLgnum = new sap.ui.model.Filter("Lgnum", sap.ui.model.FilterOperator.EQ, "TW06");
			aFilters.push(oFilterLgnum);
			var oFilterIDateFrom = new sap.ui.model.Filter("IDateFrom", sap.ui.model.FilterOperator.EQ, "20190901");
			aFilters.push(oFilterIDateFrom);
			var oFilterIDateTo = new sap.ui.model.Filter("IDateTo", sap.ui.model.FilterOperator.EQ, "20190930");
			aFilters.push(oFilterIDateTo);

			// apply filter
			var vizFrame = this.getView().byId("idVizFrame1");
			vizFrame.getDataset().getBinding("data").filter(aFilters);
		},

		onBtnRefreshPressed: function () {
			this.readViewValuesAndRefresh();
		},

		readViewValuesAndRefresh: function () {
			var oform = this.getView().byId("Lgnum");
			// var oValue = this.getView().byId("Lgnum").getVaLue();
			var vLgnum = oform.getValue();

			var vDatePicker = this.byId("IDateFrom");
			var dateVal = vDatePicker.getDateValue();
			var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "yyyyMMdd"
			});
			var dateFrom = dateFormat.format(dateVal);

			vDatePicker = this.byId("IDateTo");
			dateVal = vDatePicker.getDateValue();
			var dateTo = dateFormat.format(dateVal);

			var aFilters = [];
			var oFilterLgnum = new sap.ui.model.Filter("Lgnum", sap.ui.model.FilterOperator.EQ, vLgnum);
			aFilters.push(oFilterLgnum);
			var oFilterIDateFrom = new sap.ui.model.Filter("IDateFrom", sap.ui.model.FilterOperator.EQ, dateFrom);
			aFilters.push(oFilterIDateFrom);
			var oFilterIDateTo = new sap.ui.model.Filter("IDateTo", sap.ui.model.FilterOperator.EQ, dateTo);
			aFilters.push(oFilterIDateTo);

			// apply filter
			var vizFrame = this.getView().byId("idVizFrame1");
			vizFrame.getDataset().getBinding("data").filter(aFilters);
		}

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.tgw.view.Main
		 */
		//	onExit: function() {
		//
		//	}

	});

});