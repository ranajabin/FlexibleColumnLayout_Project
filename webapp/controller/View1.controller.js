sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/f/library"
], function (Controller, MessageBox, fioriLibrary) {
    "use strict";

    return Controller.extend("flexiblelayout.flexiblelayoutableproject.controller.View1", {
        // onInit: function () {
        // 	this.oView = this.getView();
        // 	// this._bDescendingSort = false;
        // 	// this.oProductsTable = this.oView.byId("productsTable");
        // },		

        onInit: function () {
            this.onReadAll();
        },
        onReadAll: function () {
            var that = this;
            debugger;
            var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZCUSTOMAPP_SRV/");
            // var oModel = this.getOwnerComponent().getModel("RegistraionData");
            oModel.read("/CustomdetailsSet", {
                success: function (odata) {
                    // debugger;
                    var oModel1 = new sap.ui.model.json.JSONModel();
                    oModel1.setData(odata);
                    that.getView().setModel(oModel1, "Data1");
                    MessageBox.success("Success");
                },

                error: function () {
                    MessageBox.error("error");
                }
            });
        },

        onPlaySound: function () {
            debugger;
            var audio = new Audio("../Audio/song.mp3.aac");
            audio.play();

        },

        onListItemPress: function (oEvent) {
            debugger;
            var t = this;
            var name = oEvent.mParameters.listItem.mAggregations.cells[0].mProperties.title;
            var oFCL = t.oView.getParent().getParent();

            oFCL.setLayout(fioriLibrary.LayoutType.ThreeColumnsMidExpanded);

            var router = new sap.ui.core.UIComponent.getRouterFor(t);
            router.navTo("detail", { Id: name });
        }
    });
});
