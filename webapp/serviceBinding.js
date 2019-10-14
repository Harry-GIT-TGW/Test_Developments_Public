function initModel() {
	var sUrl = "/sap/opu/odata/tgw/ZFIORI_ORDIM_C_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}